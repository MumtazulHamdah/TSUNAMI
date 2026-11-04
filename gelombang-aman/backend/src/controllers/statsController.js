const pool = require('../config/database');

const getOverview = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total_kejadian,
        COALESCE(SUM(korban_meninggal), 0) AS total_meninggal,
        COALESCE(SUM(korban_hilang), 0) AS total_hilang,
        COALESCE(SUM(korban_luka), 0) AS total_luka,
        COALESCE(SUM(pengungsi), 0) AS total_pengungsi,
        COUNT(DISTINCT provinsi) AS total_provinsi_terdampak,
        MIN(tahun) AS tahun_pertama,
        MAX(tahun) AS tahun_terakhir
      FROM tsunami_events
    `);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil statistik.' });
  }
};

const getPerYear = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT tahun, 
             COUNT(*) AS jumlah_kejadian,
             COALESCE(SUM(korban_meninggal), 0) AS total_meninggal,
             COALESCE(SUM(korban_hilang), 0) AS total_hilang
      FROM tsunami_events
      GROUP BY tahun
      ORDER BY tahun ASC
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data per tahun.' });
  }
};

const getPerProvince = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT provinsi, 
             COUNT(*) AS jumlah_kejadian,
             COALESCE(SUM(korban_meninggal), 0) AS total_meninggal
      FROM tsunami_events
      GROUP BY provinsi
      ORDER BY jumlah_kejadian DESC
      LIMIT 20
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data per provinsi.' });
  }
};

const getVictimsStats = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COALESCE(SUM(korban_meninggal), 0) AS meninggal,
        COALESCE(SUM(korban_hilang), 0) AS hilang,
        COALESCE(SUM(korban_luka), 0) AS luka,
        COALESCE(SUM(pengungsi), 0) AS pengungsi
      FROM tsunami_events
    `);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil statistik korban.' });
  }
};

module.exports = { getOverview, getPerYear, getPerProvince, getVictimsStats };
