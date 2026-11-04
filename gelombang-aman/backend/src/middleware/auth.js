const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token autentikasi diperlukan.' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    // Verify admin still exists and is active
    const result = await pool.query('SELECT id, email, role, aktif FROM admins WHERE id = $1', [decoded.id]);
    if (!result.rows.length || !result.rows[0].aktif) {
      return res.status(401).json({ success: false, message: 'Akun tidak ditemukan atau sudah dinonaktifkan.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token sudah kedaluwarsa. Silakan login kembali.' });
    }
    return res.status(401).json({ success: false, message: 'Token tidak valid.' });
  }
};

module.exports = { authenticateAdmin };
