const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const getStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        SUM(korban_meninggal) AS total_meninggal,
        SUM(korban_hilang) AS total_hilang,
        SUM(korban_luka) AS total_luka,
        SUM(pengungsi) AS total_pengungsi,
        (SELECT COUNT(*) FROM missing_persons WHERE status = 'dalam_pencarian') AS sedang_dicari,
        (SELECT COUNT(*) FROM missing_persons WHERE status = 'ditemukan' OR status = 'teridentifikasi' OR status = 'dipertemukan') AS sudah_ditemukan
      FROM tsunami_events
    `);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil statistik korban.' });
  }
};

const getMissingPersons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { nama, lokasi, status } = req.query;

    let conditions = ['diverifikasi = true'];
    let params = [];
    let idx = 1;

    if (nama) { conditions.push(`LOWER(nama_korban) LIKE LOWER($${idx++})`); params.push(`%${nama}%`); }
    if (lokasi) { conditions.push(`LOWER(lokasi_terakhir) LIKE LOWER($${idx++})`); params.push(`%${lokasi}%`); }
    if (status) { conditions.push(`status = $${idx++}`); params.push(status); }

    const whereClause = conditions.join(' AND ');
    const countResult = await pool.query(`SELECT COUNT(*) FROM missing_persons WHERE ${whereClause}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit, offset);
    const result = await pool.query(
      `SELECT id, nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir,
              status, foto_url, dibuat_pada, kejadian_id
       FROM missing_persons 
       WHERE ${whereClause}
       ORDER BY dibuat_pada DESC
       LIMIT $${idx} OFFSET $${idx + 1}`,
      params
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data orang hilang.' });
  }
};

const getMissingPersonById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir,
              status, foto_url, dibuat_pada, kejadian_id, catatan_status
       FROM missing_persons WHERE id = $1 AND diverifikasi = true`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data.' });
  }
};

const reportMissingPerson = async (req, res) => {
  try {
    const id = uuidv4();
    const {
      nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir,
      kejadian_id, nama_pelapor, kontak_pelapor, hubungan_pelapor
    } = req.body;
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    await pool.query(
      `INSERT INTO missing_persons (id, nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir,
        kejadian_id, nama_pelapor, kontak_pelapor, hubungan_pelapor, foto_url, status, diverifikasi, dibuat_pada)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'dalam_pencarian',false,NOW())`,
      [id, nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir,
       kejadian_id, nama_pelapor, kontak_pelapor, hubungan_pelapor, foto_url]
    );

    res.status(201).json({
      success: true,
      message: 'Laporan berhasil dikirim. Laporan Anda akan diverifikasi oleh admin sebelum dipublikasikan.',
      id
    });
  } catch (err) {
    console.error('Error report missing person:', err);
    res.status(500).json({ success: false, message: 'Gagal mengirim laporan.' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status, catatan } = req.body;
    const result = await pool.query(
      `UPDATE missing_persons SET status = $1, catatan_status = $2, diperbarui_pada = NOW() WHERE id = $3 RETURNING *`,
      [status, catatan, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0], message: 'Status berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui status.' });
  }
};

const deleteReport = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM missing_persons WHERE id = $1 RETURNING nama_korban, foto_url', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
    // Delete photo file if exists
    if (result.rows[0].foto_url) {
      const filePath = path.join(__dirname, '../../', result.rows[0].foto_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ success: true, message: 'Laporan berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus laporan.' });
  }
};

module.exports = { getStats, getMissingPersons, getMissingPersonById, reportMissingPerson, updateStatus, deleteReport };
