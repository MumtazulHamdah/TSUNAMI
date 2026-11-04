const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getArticles = async (req, res) => {
  try {
    const { kategori } = req.query;
    let query = 'SELECT id, judul, slug, kategori, ringkasan, dibuat_pada FROM education_articles WHERE aktif = true';
    const params = [];
    if (kategori) { query += ' AND kategori = $1'; params.push(kategori); }
    query += ' ORDER BY urutan ASC, dibuat_pada DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel.' });
  }
};

const getArticleById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM education_articles WHERE id = $1 AND aktif = true', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel.' });
  }
};

const getArticleBySlug = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM education_articles WHERE slug = $1 AND aktif = true', [req.params.slug]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil artikel.' });
  }
};

const createArticle = async (req, res) => {
  try {
    const id = uuidv4();
    const { judul, slug, kategori, konten, ringkasan, urutan, aktif } = req.body;
    const result = await pool.query(
      `INSERT INTO education_articles (id, judul, slug, kategori, konten, ringkasan, urutan, aktif, dibuat_oleh, dibuat_pada, diperbarui_pada)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NOW()) RETURNING *`,
      [id, judul, slug, kategori, konten, ringkasan, urutan || 99, aktif !== false, req.user.id]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ success: false, message: 'Slug sudah digunakan.' });
    res.status(500).json({ success: false, message: 'Gagal menyimpan artikel.' });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { judul, slug, kategori, konten, ringkasan, urutan, aktif } = req.body;
    const result = await pool.query(
      `UPDATE education_articles SET judul=$1, slug=$2, kategori=$3, konten=$4, ringkasan=$5, urutan=$6, aktif=$7, diperbarui_pada=NOW()
       WHERE id=$8 RETURNING *`,
      [judul, slug, kategori, konten, ringkasan, urutan, aktif, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui artikel.' });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await pool.query('UPDATE education_articles SET aktif = false WHERE id = $1', [req.params.id]);
    res.json({ success: true, message: 'Artikel berhasil dinonaktifkan.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus artikel.' });
  }
};

module.exports = { getArticles, getArticleById, getArticleBySlug, createArticle, updateArticle, deleteArticle };
