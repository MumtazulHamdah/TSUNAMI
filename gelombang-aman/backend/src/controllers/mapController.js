const pool = require('../config/database');

const getHazardZones = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nama_wilayah, provinsi, tingkat_bahaya, keterangan,
             ST_AsGeoJSON(geom)::json AS geometry
      FROM tsunami_hazard_zones
      WHERE geom IS NOT NULL
    `);
    const geojson = {
      type: 'FeatureCollection',
      sumber: 'InaRISK BNPB / Data Demo',
      waktu_pembaruan: new Date().toISOString(),
      features: result.rows.map(row => ({
        type: 'Feature',
        properties: {
          id: row.id,
          nama_wilayah: row.nama_wilayah,
          provinsi: row.provinsi,
          tingkat_bahaya: row.tingkat_bahaya,
          keterangan: row.keterangan
        },
        geometry: row.geometry
      }))
    };
    res.json({ success: true, data: geojson });
  } catch (err) {
    console.error('Error getHazardZones:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data zona bahaya.' });
  }
};

const getHistoricalPoints = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, nama_kejadian, tanggal, tahun, lokasi, provinsi,
             magnitudo, tinggi_gelombang, korban_meninggal, latitude, longitude
      FROM tsunami_events
      WHERE latitude IS NOT NULL AND longitude IS NOT NULL
    `);
    const geojson = {
      type: 'FeatureCollection',
      features: result.rows.map(row => ({
        type: 'Feature',
        properties: {
          id: row.id,
          nama_kejadian: row.nama_kejadian,
          tanggal: row.tanggal,
          tahun: row.tahun,
          lokasi: row.lokasi,
          provinsi: row.provinsi,
          magnitudo: row.magnitudo,
          tinggi_gelombang: row.tinggi_gelombang,
          korban_meninggal: row.korban_meninggal
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)]
        }
      }))
    };
    res.json({ success: true, data: geojson });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data kejadian historis.' });
  }
};

const getProvinces = async (req, res) => {
  res.json({
    success: true,
    message: 'Untuk peta provinsi lengkap, gunakan data GeoJSON dari BIG (Badan Informasi Geospasial) Indonesia.',
    url: 'https://tanahair.indonesia.go.id'
  });
};

const getAreaInfo = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ success: false, message: 'Koordinat diperlukan.' });
    const result = await pool.query(`
      SELECT nama_wilayah, provinsi, tingkat_bahaya, keterangan
      FROM tsunami_hazard_zones
      WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326))
      LIMIT 1
    `, [parseFloat(lng), parseFloat(lat)]);
    res.json({ success: true, data: result.rows[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengambil informasi area.' });
  }
};

const updateHazardZone = async (req, res) => {
  try {
    const { tingkat_bahaya, keterangan } = req.body;
    await pool.query(
      'UPDATE tsunami_hazard_zones SET tingkat_bahaya = $1, keterangan = $2 WHERE id = $3',
      [tingkat_bahaya, keterangan, req.params.id]
    );
    res.json({ success: true, message: 'Zona bahaya berhasil diperbarui.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui zona bahaya.' });
  }
};

module.exports = { getHazardZones, getHistoricalPoints, getProvinces, getAreaInfo, updateHazardZone };
