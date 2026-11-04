const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { tahun, provinsi, search, sort = 'tanggal', order = 'DESC' } = req.query;

    let conditions = ['1=1'];
    let params = [];
    let idx = 1;

    if (tahun) { conditions.push(`tahun = $${idx++}`); params.push(parseInt(tahun)); }
    if (provinsi) { conditions.push(`LOWER(provinsi) = LOWER($${idx++})`); params.push(provinsi); }
    if (search) {
      conditions.push(`(LOWER(nama_kejadian) LIKE LOWER($${idx}) OR LOWER(lokasi) LIKE LOWER($${idx}) OR LOWER(provinsi) LIKE LOWER($${idx}))`);
      params.push(`%${search}%`); idx++;
    }

    const whereClause = conditions.join(' AND ');
    const validSorts = ['tanggal', 'magnitudo', 'tinggi_gelombang', 'korban_meninggal', 'tahun'];
    const sortCol = validSorts.includes(sort) ? sort : 'tanggal';
    const sortOrder = order === 'ASC' ? 'ASC' : 'DESC';

    const countResult = await pool.query(`SELECT COUNT(*) FROM tsunami_events WHERE ${whereClause}`, params);
    const total = parseInt(countResult.rows[0].count);

    params.push(limit, offset);
    const dataResult = await pool.query(
      `SELECT id, nama_kejadian, tanggal, tahun, lokasi, provinsi, kabupaten_kota,
              magnitudo, tinggi_gelombang, korban_meninggal, korban_hilang, korban_luka,
              pengungsi, sumber_data, latitude, longitude, deskripsi
       FROM tsunami_events 
       WHERE ${whereClause}
       ORDER BY ${sortCol} ${sortOrder} NULLS LAST
       LIMIT $${idx} OFFSET $${idx + 1}`,
      params
    );

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error('Error getAll tsunami:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data tsunami.' });
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tsunami_events WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data.' });
  }
};

const create = async (req, res) => {
  try {
    const id = uuidv4();
    const {
      nama_kejadian, tanggal, tahun, lokasi, provinsi, kabupaten_kota,
      magnitudo, tinggi_gelombang, latitude, longitude,
      korban_meninggal, korban_hilang, korban_luka, pengungsi,
      sumber_data, deskripsi, penyebab, jenis_tsunami
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tsunami_events (id, nama_kejadian, tanggal, tahun, lokasi, provinsi, kabupaten_kota,
        magnitudo, tinggi_gelombang, latitude, longitude, korban_meninggal, korban_hilang, korban_luka,
        pengungsi, sumber_data, deskripsi, penyebab, jenis_tsunami, dibuat_pada, diperbarui_pada)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,NOW(),NOW())
       RETURNING *`,
      [id, nama_kejadian, tanggal, tahun, lokasi, provinsi, kabupaten_kota,
       magnitudo, tinggi_gelombang, latitude, longitude, korban_meninggal, korban_hilang, korban_luka,
       pengungsi, sumber_data, deskripsi, penyebab, jenis_tsunami]
    );

    await logActivity(req.user.id, 'CREATE', 'tsunami_events', id, `Menambah kejadian: ${nama_kejadian}`);
    res.status(201).json({ success: true, data: result.rows[0], message: 'Data berhasil ditambahkan.' });
  } catch (err) {
    console.error('Error create tsunami:', err);
    res.status(500).json({ success: false, message: 'Gagal menyimpan data.' });
  }
};

const update = async (req, res) => {
  try {
    const existing = await pool.query('SELECT id FROM tsunami_events WHERE id = $1', [req.params.id]);
    if (!existing.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });

    const fields = Object.keys(req.body).filter(k => 
      ['nama_kejadian','tanggal','tahun','lokasi','provinsi','kabupaten_kota','magnitudo',
       'tinggi_gelombang','latitude','longitude','korban_meninggal','korban_hilang','korban_luka',
       'pengungsi','sumber_data','deskripsi','penyebab','jenis_tsunami'].includes(k)
    );
    if (!fields.length) return res.status(400).json({ success: false, message: 'Tidak ada field yang diperbarui.' });

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
    const values = fields.map(f => req.body[f]);
    values.push(req.params.id);

    const result = await pool.query(
      `UPDATE tsunami_events SET ${setClause}, diperbarui_pada = NOW() WHERE id = $${values.length} RETURNING *`,
      values
    );
    await logActivity(req.user.id, 'UPDATE', 'tsunami_events', req.params.id, `Memperbarui kejadian`);
    res.json({ success: true, data: result.rows[0], message: 'Data berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui data.' });
  }
};

const remove = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tsunami_events WHERE id = $1 RETURNING nama_kejadian', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
    await logActivity(req.user.id, 'DELETE', 'tsunami_events', req.params.id, `Menghapus kejadian: ${result.rows[0].nama_kejadian}`);
    res.json({ success: true, message: 'Data berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal menghapus data.' });
  }
};

const importCSV = async (req, res) => {
  res.json({ success: false, message: 'Fitur impor CSV tersedia melalui endpoint ini. Kirim file CSV dengan format yang sesuai.' });
};

async function logActivity(adminId, action, table, recordId, description) {
  try {
    await pool.query(
      'INSERT INTO admin_activity_log (id, admin_id, aksi, tabel, record_id, deskripsi, dibuat_pada) VALUES ($1,$2,$3,$4,$5,$6,NOW())',
      [uuidv4(), adminId, action, table, recordId, description]
    );
  } catch (e) { /* non-critical */ }
}

module.exports = { getAll, getById, create, update, remove, importCSV };
