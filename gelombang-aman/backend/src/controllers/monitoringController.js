const fetch = require('node-fetch');

const BMKG_AUTOGEMPA = 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json';
const BMKG_GEMPATERKINI = 'https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json';

const getLatestEarthquake = async (req, res) => {
  try {
    const response = await fetch(BMKG_AUTOGEMPA, { timeout: 10000 });
    if (!response.ok) throw new Error('BMKG API tidak merespons');
    const data = await response.json();
    const gempa = data.Infogempa?.gempa;
    if (!gempa) throw new Error('Format data tidak dikenali');

    const tsunamiPotential = gempa.Potensi?.toLowerCase().includes('tsunami');
    const warningLevel = determineTsunamiWarning(parseFloat(gempa.Magnitude), parseFloat(gempa.Kedalaman), tsunamiPotential);

    res.json({
      success: true,
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id',
      waktu_pembaruan: new Date().toISOString(),
      data: {
        waktu: gempa.Jam,
        tanggal: gempa.Tanggal,
        lintang: gempa.Lintang,
        bujur: gempa.Bujur,
        magnitudo: parseFloat(gempa.Magnitude),
        kedalaman: gempa.Kedalaman,
        wilayah: gempa.Wilayah,
        potensi: gempa.Potensi,
        dirasakan: gempa.Dirasakan,
        shakemap: gempa.Shakemap,
        tsunami_potensial: tsunamiPotential,
        level_peringatan: warningLevel
      }
    });
  } catch (err) {
    console.error('Error fetch BMKG autogempa:', err.message);
    res.status(503).json({
      success: false,
      message: 'Tidak dapat mengambil data gempa dari BMKG saat ini. Coba lagi beberapa saat.',
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id'
    });
  }
};

const getEarthquakeList = async (req, res) => {
  try {
    const response = await fetch(BMKG_GEMPATERKINI, { timeout: 10000 });
    if (!response.ok) throw new Error('BMKG API tidak merespons');
    const data = await response.json();
    const gempaList = data.Infogempa?.gempa || [];

    const processed = gempaList.map(g => ({
      waktu: g.Jam,
      tanggal: g.Tanggal,
      lintang: g.Lintang,
      bujur: g.Bujur,
      magnitudo: parseFloat(g.Magnitude),
      kedalaman: g.Kedalaman,
      wilayah: g.Wilayah,
      potensi: g.Potensi,
      tsunami_potensial: g.Potensi?.toLowerCase().includes('tsunami')
    }));

    res.json({
      success: true,
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id',
      waktu_pembaruan: new Date().toISOString(),
      data: processed
    });
  } catch (err) {
    console.error('Error fetch BMKG gempa list:', err.message);
    res.status(503).json({
      success: false,
      message: 'Tidak dapat mengambil daftar gempa dari BMKG saat ini.',
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id'
    });
  }
};

const getTsunamiWarning = async (req, res) => {
  try {
    const response = await fetch(BMKG_AUTOGEMPA, { timeout: 10000 });
    if (!response.ok) throw new Error('BMKG API tidak merespons');
    const data = await response.json();
    const gempa = data.Infogempa?.gempa;

    const potensi = gempa?.Potensi || '';
    const adaTsunami = potensi.toLowerCase().includes('tsunami');
    const mag = parseFloat(gempa?.Magnitude || 0);

    res.json({
      success: true,
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id',
      waktu_pembaruan: new Date().toISOString(),
      peringatan: {
        aktif: adaTsunami && mag >= 7.0,
        status: adaTsunami && mag >= 7.0 ? 'WASPADA' : 'NORMAL',
        pesan: adaTsunami && mag >= 7.0
          ? 'Potensi tsunami terdeteksi. Pantau informasi resmi BMKG.'
          : 'Tidak ada peringatan tsunami aktif.',
        keterangan: potensi,
        catatan: 'Status ini berdasarkan data gempa terkini BMKG. Selalu pantau informasi resmi di bmkg.go.id'
      }
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: 'Tidak dapat memeriksa status peringatan tsunami saat ini.',
      sumber: 'BMKG',
      url_sumber: 'https://www.bmkg.go.id'
    });
  }
};

function determineTsunamiWarning(magnitudo, kedalaman, hasPotential) {
  if (hasPotential && magnitudo >= 8.0) return 'SIAGA';
  if (hasPotential && magnitudo >= 7.0) return 'WASPADA';
  if (magnitudo >= 7.0 && kedalaman <= 70) return 'WASPADA_POTENSI';
  return 'NORMAL';
}

module.exports = { getLatestEarthquake, getEarthquakeList, getTsunamiWarning };
