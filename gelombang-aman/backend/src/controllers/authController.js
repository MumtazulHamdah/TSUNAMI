const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM admins WHERE email = $1 AND aktif = true', [email]);
    if (!result.rows.length) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }
    const admin = result.rows[0];
    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    await pool.query('UPDATE admins SET terakhir_login = NOW() WHERE id = $1', [admin.id]);

    res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: { id: admin.id, nama: admin.nama, email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat login.' });
  }
};

const logout = async (req, res) => {
  res.json({ success: true, message: 'Logout berhasil.' });
};

const getProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nama, email, role, terakhir_login FROM admins WHERE id = $1', [req.user.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Profil tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil profil.' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const result = await pool.query('SELECT password_hash FROM admins WHERE id = $1', [req.user.id]);
    const valid = await bcrypt.compare(old_password, result.rows[0].password_hash);
    if (!valid) return res.status(400).json({ success: false, message: 'Password lama tidak sesuai.' });
    const newHash = await bcrypt.hash(new_password, 12);
    await pool.query('UPDATE admins SET password_hash = $1, diperbarui_pada = NOW() WHERE id = $2', [newHash, req.user.id]);
    res.json({ success: true, message: 'Password berhasil diubah.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengubah password.' });
  }
};

module.exports = { login, logout, getProfile, changePassword };
