const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getScenarios = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, judul, deskripsi, kategori, tingkat_kesulitan, urutan FROM simulation_scenarios WHERE aktif = true ORDER BY urutan ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil skenario.' });
  }
};

const getScenarioById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM simulation_scenarios WHERE id = $1 AND aktif = true', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Skenario tidak ditemukan.' });
    const scenario = result.rows[0];
    // Get questions
    const questions = await pool.query(
      'SELECT * FROM simulation_questions WHERE skenario_id = $1 ORDER BY urutan ASC',
      [scenario.id]
    );
    scenario.pertanyaan = questions.rows;
    res.json({ success: true, data: scenario });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil skenario.' });
  }
};

const submitResult = async (req, res) => {
  try {
    const { skenario_id, jawaban } = req.body;
    if (!skenario_id || !Array.isArray(jawaban)) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
    }

    const questions = await pool.query(
      'SELECT * FROM simulation_questions WHERE skenario_id = $1 ORDER BY urutan ASC',
      [skenario_id]
    );

    let skor = 0;
    const evaluasi = questions.rows.map((q, i) => {
      const userAnswer = jawaban[i];
      const benar = userAnswer === q.jawaban_benar;
      if (benar) skor += q.poin || 10;
      return {
        pertanyaan: q.pertanyaan,
        jawaban_user: userAnswer,
        jawaban_benar: q.jawaban_benar,
        benar,
        penjelasan: q.penjelasan,
        poin: benar ? (q.poin || 10) : 0
      };
    });

    const totalPoin = questions.rows.reduce((sum, q) => sum + (q.poin || 10), 0);
    const persentase = totalPoin > 0 ? Math.round((skor / totalPoin) * 100) : 0;

    let rekomendasi = [];
    if (persentase < 60) rekomendasi = ['pengertian', 'proses', 'penyebab', 'tanda', 'mitigasi'];
    else if (persentase < 80) rekomendasi = ['mitigasi', 'checklist'];
    else rekomendasi = ['checklist'];

    const rekomendasiArtikel = await pool.query(
      'SELECT id, judul, slug, kategori FROM education_articles WHERE kategori = ANY($1) AND aktif = true LIMIT 5',
      [rekomendasi]
    );

    res.json({
      success: true,
      data: {
        skor,
        total_poin: totalPoin,
        persentase,
        tingkat: persentase >= 80 ? 'SANGAT BAIK' : persentase >= 60 ? 'BAIK' : persentase >= 40 ? 'CUKUP' : 'PERLU BELAJAR LEBIH',
        evaluasi,
        rekomendasi_edukasi: rekomendasiArtikel.rows
      }
    });
  } catch (err) {
    console.error('Error submitResult:', err);
    res.status(500).json({ success: false, message: 'Gagal memproses hasil simulasi.' });
  }
};

const createScenario = async (req, res) => {
  try {
    const id = uuidv4();
    const { judul, deskripsi, kategori, tingkat_kesulitan, urutan, pertanyaan } = req.body;
    await pool.query(
      `INSERT INTO simulation_scenarios (id, judul, deskripsi, kategori, tingkat_kesulitan, urutan, aktif, dibuat_pada)
       VALUES ($1,$2,$3,$4,$5,$6,true,NOW())`,
      [id, judul, deskripsi, kategori, tingkat_kesulitan, urutan || 99]
    );
    if (Array.isArray(pertanyaan)) {
      for (const q of pertanyaan) {
        await pool.query(
          `INSERT INTO simulation_questions (id, skenario_id, pertanyaan, pilihan, jawaban_benar, penjelasan, poin, urutan)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
          [uuidv4(), id, q.pertanyaan, JSON.stringify(q.pilihan), q.jawaban_benar, q.penjelasan, q.poin || 10, q.urutan || 1]
        );
      }
    }
    res.status(201).json({ success: true, message: 'Skenario berhasil dibuat.', id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal membuat skenario.' });
  }
};

const updateScenario = async (req, res) => {
  try {
    const { judul, deskripsi, kategori, tingkat_kesulitan, urutan, aktif } = req.body;
    await pool.query(
      'UPDATE simulation_scenarios SET judul=$1, deskripsi=$2, kategori=$3, tingkat_kesulitan=$4, urutan=$5, aktif=$6 WHERE id=$7',
      [judul, deskripsi, kategori, tingkat_kesulitan, urutan, aktif, req.params.id]
    );
    res.json({ success: true, message: 'Skenario berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui skenario.' });
  }
};

const deleteScenario = async (req, res) => {
  try {
    await pool.query('UPDATE simulation_scenarios SET aktif = false WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Skenario berhasil dinonaktifkan.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus skenario.' });
  }
};

module.exports = { getScenarios, getScenarioById, submitResult, createScenario, updateScenario, deleteScenario };
