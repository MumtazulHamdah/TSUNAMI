require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ===== DATA PATHS =====
const DATA_DIR = path.join(__dirname, '../data');
const TSUNAMI_FILE = path.join(DATA_DIR, 'tsunami.json');
const EDUCATION_FILE = path.join(DATA_DIR, 'education.json');
const SIMULATION_FILE = path.join(DATA_DIR, 'simulation.json');
const MISSING_FILE = path.join(DATA_DIR, 'missing.json');

// ===== DATA HELPERS =====
function readJSON(file) {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) { return []; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// init missing.json if not exists
if (!fs.existsSync(MISSING_FILE)) writeJSON(MISSING_FILE, []);

// ===== UPLOAD =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, uuidv4() + ext);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    cb(null, allowed.includes(path.extname(file.originalname).toLowerCase()));
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ===== HELPERS =====
function paginate(arr, page, limit) {
  const total = arr.length;
  const offset = (page - 1) * limit;
  const data = arr.slice(offset, offset + limit);
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

// ============================================================
// TSUNAMI ENDPOINTS
// ============================================================

app.get('/api/tsunami', (req, res) => {
  let data = readJSON(TSUNAMI_FILE);
  const { search, tahun, provinsi, sort = 'tanggal', order = 'DESC', page = 1, limit = 20 } = req.query;
  if (search) {
    const s = search.toLowerCase();
    data = data.filter(d => d.nama_kejadian?.toLowerCase().includes(s) || d.lokasi?.toLowerCase().includes(s) || d.provinsi?.toLowerCase().includes(s));
  }
  if (tahun) data = data.filter(d => d.tahun == parseInt(tahun));
  if (provinsi) data = data.filter(d => d.provinsi?.toLowerCase() === provinsi.toLowerCase());
  // Sort
  data.sort((a, b) => {
    const va = a[sort] ?? '', vb = b[sort] ?? '';
    if (va < vb) return order === 'ASC' ? -1 : 1;
    if (va > vb) return order === 'ASC' ? 1 : -1;
    return 0;
  });
  res.json({ success: true, ...paginate(data, parseInt(page), parseInt(limit)) });
});

app.get('/api/tsunami/:id', (req, res) => {
  const data = readJSON(TSUNAMI_FILE);
  const item = data.find(d => d.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
  res.json({ success: true, data: item });
});

// ============================================================
// STATS ENDPOINTS
// ============================================================

app.get('/api/stats/overview', (req, res) => {
  const data = readJSON(TSUNAMI_FILE);
  const result = data.reduce((acc, d) => {
    acc.total_kejadian++;
    acc.total_meninggal += d.korban_meninggal || 0;
    acc.total_hilang += d.korban_hilang || 0;
    acc.total_luka += d.korban_luka || 0;
    acc.total_pengungsi += d.pengungsi || 0;
    if (d.provinsi) acc.provinsi.add(d.provinsi);
    return acc;
  }, { total_kejadian: 0, total_meninggal: 0, total_hilang: 0, total_luka: 0, total_pengungsi: 0, provinsi: new Set() });
  res.json({ success: true, data: { ...result, total_provinsi_terdampak: result.provinsi.size } });
});

app.get('/api/stats/per-tahun', (req, res) => {
  const data = readJSON(TSUNAMI_FILE);
  const map = {};
  data.forEach(d => {
    if (!map[d.tahun]) map[d.tahun] = { tahun: d.tahun, jumlah_kejadian: 0, total_meninggal: 0, total_hilang: 0 };
    map[d.tahun].jumlah_kejadian++;
    map[d.tahun].total_meninggal += d.korban_meninggal || 0;
    map[d.tahun].total_hilang += d.korban_hilang || 0;
  });
  const result = Object.values(map).sort((a, b) => a.tahun - b.tahun);
  res.json({ success: true, data: result });
});

app.get('/api/stats/per-provinsi', (req, res) => {
  const data = readJSON(TSUNAMI_FILE);
  const map = {};
  data.forEach(d => {
    if (!d.provinsi) return;
    if (!map[d.provinsi]) map[d.provinsi] = { provinsi: d.provinsi, jumlah_kejadian: 0, total_meninggal: 0 };
    map[d.provinsi].jumlah_kejadian++;
    map[d.provinsi].total_meninggal += d.korban_meninggal || 0;
  });
  const result = Object.values(map).sort((a, b) => b.jumlah_kejadian - a.jumlah_kejadian);
  res.json({ success: true, data: result });
});

app.get('/api/stats/korban', (req, res) => {
  const data = readJSON(TSUNAMI_FILE);
  const result = data.reduce((acc, d) => {
    acc.meninggal += d.korban_meninggal || 0;
    acc.hilang += d.korban_hilang || 0;
    acc.luka += d.korban_luka || 0;
    acc.pengungsi += d.pengungsi || 0;
    return acc;
  }, { meninggal: 0, hilang: 0, luka: 0, pengungsi: 0 });
  res.json({ success: true, data: result });
});

// ============================================================
// MAP ENDPOINTS
// ============================================================

app.get('/api/map/kejadian-historis', (req, res) => {
  const data = readJSON(TSUNAMI_FILE).filter(d => d.latitude && d.longitude);
  const geojson = {
    type: 'FeatureCollection',
    features: data.map(d => ({
      type: 'Feature',
      properties: {
        id: d.id, nama_kejadian: d.nama_kejadian, tanggal: d.tanggal,
        tahun: d.tahun, lokasi: d.lokasi, provinsi: d.provinsi,
        magnitudo: d.magnitudo, tinggi_gelombang: d.tinggi_gelombang, korban_meninggal: d.korban_meninggal
      },
      geometry: { type: 'Point', coordinates: [d.longitude, d.latitude] }
    }))
  };
  res.json({ success: true, data: geojson });
});

app.get('/api/map/zona-bahaya', (req, res) => {
  res.json({ success: true, data: { type: 'FeatureCollection', features: [] }, message: 'Import GeoJSON zona bahaya resmi dari InaRISK BNPB melalui file data/hazard_zones.geojson' });
});

// ============================================================
// MONITORING ENDPOINTS (proxy BMKG)
// ============================================================

const BMKG_AUTOGEMPA = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';
const BMKG_TERKINI = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json';

app.get('/api/monitoring/gempa-terkini', async (req, res) => {
  try {
    const r = await fetch(BMKG_AUTOGEMPA, { timeout: 8000 });
    const json = await r.json();
    const g = json.Infogempa?.gempa;
    if (!g) throw new Error('Format tidak dikenali');
    const mag = parseFloat(g.Magnitude);
    const tsunamiPotensial = g.Potensi?.toLowerCase().includes('tsunami');
    res.json({
      success: true, sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id',
      waktu_pembaruan: new Date().toISOString(),
      data: {
        waktu: g.Jam, tanggal: g.Tanggal, lintang: g.Lintang, bujur: g.Bujur,
        magnitudo: mag, kedalaman: g.Kedalaman, wilayah: g.Wilayah,
        potensi: g.Potensi, dirasakan: g.Dirasakan, shakemap: g.Shakemap,
        tsunami_potensial: tsunamiPotensial,
        level_peringatan: tsunamiPotensial && mag >= 8 ? 'SIAGA' : tsunamiPotensial && mag >= 7 ? 'WASPADA' : 'NORMAL'
      }
    });
  } catch (e) {
    res.status(503).json({ success: false, message: 'Tidak dapat mengambil data BMKG saat ini.', sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id' });
  }
});

app.get('/api/monitoring/gempa-list', async (req, res) => {
  try {
    const r = await fetch(BMKG_TERKINI, { timeout: 8000 });
    const json = await r.json();
    const list = (json.Infogempa?.gempa || []).map(g => ({
      waktu: g.Jam, tanggal: g.Tanggal, lintang: g.Lintang, bujur: g.Bujur,
      magnitudo: parseFloat(g.Magnitude), kedalaman: g.Kedalaman,
      wilayah: g.Wilayah, potensi: g.Potensi,
      tsunami_potensial: g.Potensi?.toLowerCase().includes('tsunami')
    }));
    res.json({ success: true, sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id', waktu_pembaruan: new Date().toISOString(), data: list });
  } catch (e) {
    res.status(503).json({ success: false, message: 'Tidak dapat mengambil data BMKG saat ini.', sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id' });
  }
});

app.get('/api/monitoring/peringatan', async (req, res) => {
  try {
    const r = await fetch(BMKG_AUTOGEMPA, { timeout: 8000 });
    const json = await r.json();
    const g = json.Infogempa?.gempa;
    const potensi = g?.Potensi || '';
    const mag = parseFloat(g?.Magnitude || 0);
    const aktif = potensi.toLowerCase().includes('tsunami') && mag >= 7.0;
    res.json({
      success: true, sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id',
      waktu_pembaruan: new Date().toISOString(),
      peringatan: {
        aktif, status: aktif ? 'WASPADA' : 'NORMAL',
        pesan: aktif ? 'Potensi tsunami terdeteksi. Pantau informasi resmi BMKG.' : 'Tidak ada peringatan tsunami aktif saat ini.',
        keterangan: potensi,
        catatan: 'Status berdasarkan data gempa terkini BMKG. Selalu pantau bmkg.go.id'
      }
    });
  } catch (e) {
    res.status(503).json({ success: false, message: 'Tidak dapat memeriksa status peringatan.', sumber: 'BMKG', url_sumber: 'https://www.bmkg.go.id' });
  }
});

// ============================================================
// EDUCATION ENDPOINTS
// ============================================================

app.get('/api/education/artikel', (req, res) => {
  let data = readJSON(EDUCATION_FILE);
  const { kategori } = req.query;
  if (kategori) data = data.filter(d => d.kategori === kategori);
  data.sort((a, b) => (a.urutan || 99) - (b.urutan || 99));
  res.json({ success: true, data: data.map(({ konten, ...rest }) => rest) });
});

app.get('/api/education/artikel/:id', (req, res) => {
  const data = readJSON(EDUCATION_FILE);
  const item = data.find(d => d.id === req.params.id || d.slug === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Artikel tidak ditemukan.' });
  res.json({ success: true, data: item });
});

// ============================================================
// SIMULATION ENDPOINTS
// ============================================================

app.get('/api/simulation/skenario', (req, res) => {
  const data = readJSON(SIMULATION_FILE);
  const list = data.map(({ pertanyaan, ...rest }) => rest).sort((a, b) => a.urutan - b.urutan);
  res.json({ success: true, data: list });
});

app.get('/api/simulation/skenario/:id', (req, res) => {
  const data = readJSON(SIMULATION_FILE);
  const item = data.find(d => d.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Skenario tidak ditemukan.' });
  res.json({ success: true, data: item });
});

app.post('/api/simulation/hasil', (req, res) => {
  const { skenario_id, jawaban } = req.body;
  if (!skenario_id || !Array.isArray(jawaban)) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
  }
  const scenarios = readJSON(SIMULATION_FILE);
  const scenario = scenarios.find(s => s.id === skenario_id);
  if (!scenario) return res.status(404).json({ success: false, message: 'Skenario tidak ditemukan.' });

  let skor = 0;
  const evaluasi = scenario.pertanyaan.map((q, i) => {
    const userAnswer = jawaban[i];
    const benar = userAnswer === q.jawaban_benar;
    if (benar) skor += q.poin || 10;
    return { pertanyaan: q.pertanyaan, jawaban_user: userAnswer, jawaban_benar: q.jawaban_benar, benar, penjelasan: q.penjelasan, poin: benar ? (q.poin || 10) : 0 };
  });

  const totalPoin = scenario.pertanyaan.reduce((s, q) => s + (q.poin || 10), 0);
  const persentase = totalPoin > 0 ? Math.round((skor / totalPoin) * 100) : 0;
  const tingkat = persentase >= 80 ? 'SANGAT BAIK' : persentase >= 60 ? 'BAIK' : persentase >= 40 ? 'CUKUP' : 'PERLU BELAJAR LEBIH';

  const rekoKategori = persentase < 60 ? ['mitigasi', 'tanda', 'checklist'] : persentase < 80 ? ['mitigasi', 'checklist'] : ['checklist'];
  const allArticles = readJSON(EDUCATION_FILE);
  const rekoArtikel = allArticles.filter(a => rekoKategori.includes(a.kategori)).map(({ konten, ...r }) => r).slice(0, 4);

  res.json({ success: true, data: { skor, total_poin: totalPoin, persentase, tingkat, evaluasi, rekomendasi_edukasi: rekoArtikel } });
});

// ============================================================
// VICTIMS / MISSING PERSONS ENDPOINTS
// ============================================================

app.get('/api/victims/stats', (req, res) => {
  const tsunami = readJSON(TSUNAMI_FILE);
  const missing = readJSON(MISSING_FILE);
  const totals = tsunami.reduce((acc, d) => {
    acc.total_meninggal += d.korban_meninggal || 0;
    acc.total_hilang += d.korban_hilang || 0;
    acc.total_luka += d.korban_luka || 0;
    acc.total_pengungsi += d.pengungsi || 0;
    return acc;
  }, { total_meninggal: 0, total_hilang: 0, total_luka: 0, total_pengungsi: 0 });
  totals.sedang_dicari = missing.filter(m => m.diverifikasi && m.status === 'dalam_pencarian').length;
  totals.sudah_ditemukan = missing.filter(m => m.diverifikasi && ['ditemukan', 'teridentifikasi', 'dipertemukan'].includes(m.status)).length;
  res.json({ success: true, data: totals });
});

app.get('/api/victims/orang-hilang', (req, res) => {
  let data = readJSON(MISSING_FILE).filter(m => m.diverifikasi);
  const { nama, lokasi, status, page = 1, limit = 12 } = req.query;
  if (nama) data = data.filter(m => m.nama_korban?.toLowerCase().includes(nama.toLowerCase()));
  if (lokasi) data = data.filter(m => m.lokasi_terakhir?.toLowerCase().includes(lokasi.toLowerCase()));
  if (status) data = data.filter(m => m.status === status);
  data.sort((a, b) => new Date(b.dibuat_pada) - new Date(a.dibuat_pada));
  // Hide personal contact info from public
  const safe = data.map(({ kontak_pelapor, nama_pelapor, hubungan_pelapor, ...rest }) => rest);
  res.json({ success: true, ...paginate(safe, parseInt(page), parseInt(limit)) });
});

app.get('/api/victims/orang-hilang/:id', (req, res) => {
  const data = readJSON(MISSING_FILE);
  const item = data.find(d => d.id === req.params.id && d.diverifikasi);
  if (!item) return res.status(404).json({ success: false, message: 'Data tidak ditemukan.' });
  const { kontak_pelapor, nama_pelapor, hubungan_pelapor, ...safe } = item;
  res.json({ success: true, data: safe });
});

app.post('/api/victims/orang-hilang', upload.single('foto'), (req, res) => {
  const { nama_korban, usia, jenis_kelamin, ciri_fisik, lokasi_terakhir, nama_pelapor, kontak_pelapor, hubungan_pelapor } = req.body;
  if (!nama_korban || !jenis_kelamin || !lokasi_terakhir || !nama_pelapor || !kontak_pelapor) {
    return res.status(400).json({ success: false, message: 'Data tidak lengkap. Isi semua field wajib.' });
  }
  const data = readJSON(MISSING_FILE);
  const id = uuidv4();
  data.push({
    id, nama_korban, usia: usia ? parseInt(usia) : null, jenis_kelamin, ciri_fisik, lokasi_terakhir,
    nama_pelapor, kontak_pelapor, hubungan_pelapor,
    foto_url: req.file ? `/uploads/${req.file.filename}` : null,
    status: 'dalam_pencarian', diverifikasi: false, dibuat_pada: new Date().toISOString()
  });
  writeJSON(MISSING_FILE, data);
  res.status(201).json({ success: true, message: 'Laporan berhasil dikirim. Akan diverifikasi sebelum dipublikasikan.', id });
});

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GELOMBANG AMAN API is running (JSON mode — no database required)', version: '2.0.0', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Terjadi kesalahan pada server.' });
});

app.listen(PORT, () => {
  console.log(`🌊 GELOMBANG AMAN API berjalan di http://localhost:${PORT}`);
  console.log(`📂 Mode: JSON file (tidak memerlukan database)`);
  console.log(`✅ API siap diakses`);
});

module.exports = app;
