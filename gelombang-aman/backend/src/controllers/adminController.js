const pool = require('../config/database');

const getDashboard = async (req, res) => {
  try {
    const [tsunamiCount, missingCount, pendingReports, recentActivity] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM tsunami_events'),
      pool.query("SELECT COUNT(*) FROM missing_persons WHERE status = 'dalam_pencarian'"),
      pool.query('SELECT COUNT(*) FROM missing_persons WHERE diverifikasi = false'),
      pool.query('SELECT * FROM admin_activity_log ORDER BY dibuat_pada DESC LIMIT 10')
    ]);

    res.json({
      success: true,
      data: {
        total_kejadian: parseInt(tsunamiCount.rows[0].count),
        orang_hilang_aktif: parseInt(missingCount.rows[0].count),
        laporan_pending: parseInt(pendingReports.rows[0].count),
        aktivitas_terbaru: recentActivity.rows
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data dashboard admin.' });
  }
};

const getActivityLog = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT al.*, a.nama AS nama_admin 
      FROM admin_activity_log al
      LEFT JOIN admins a ON al.admin_id = a.id
      ORDER BY al.dibuat_pada DESC 
      LIMIT 100
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil log aktivitas.' });
  }
};

const getPendingReports = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama_korban, usia, jenis_kelamin, lokasi_terakhir, nama_pelapor, kontak_pelapor, dibuat_pada
       FROM missing_persons WHERE diverifikasi = false ORDER BY dibuat_pada DESC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil laporan pending.' });
  }
};

const verifyReport = async (req, res) => {
  try {
    const { diverifikasi, catatan } = req.body;
    if (diverifikasi === false) {
      await pool.query('DELETE FROM missing_persons WHERE id = $1', [req.params.id]);
      return res.json({ success: true, message: 'Laporan ditolak dan dihapus.' });
    }
    await pool.query(
      'UPDATE missing_persons SET diverifikasi = true, catatan_status = $1, diperbarui_pada = NOW() WHERE id = $2',
      [catatan, req.params.id]
    );
    res.json({ success: true, message: 'Laporan berhasil diverifikasi dan dipublikasikan.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memverifikasi laporan.' });
  }
};

module.exports = { getDashboard, getActivityLog, getPendingReports, verifyReport };
