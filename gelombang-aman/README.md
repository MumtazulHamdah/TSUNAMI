# 🌊 GELOMBANG AMAN
### Platform Informasi Tsunami Indonesia
**"Kenali Risiko, Siaga Hadapi Tsunami"**

---

## ✅ Tidak Perlu Database!

Website ini menggunakan **file JSON** sebagai penyimpanan data — tidak memerlukan PostgreSQL, MySQL, atau database apapun. Cukup Node.js saja.

---

## 🚀 Cara Menjalankan (3 langkah)

### Prasyarat
- **Node.js** v18+ → download di [nodejs.org](https://nodejs.org)

### Langkah 1: Install dependencies

```bash
cd gelombang-aman/backend
npm install
```

### Langkah 2: Jalankan backend

```bash
npm start
```

Server berjalan di: **http://localhost:3000**

Cek dengan membuka: http://localhost:3000/api/health

### Langkah 3: Buka frontend

Buka file `frontend/index.html` dengan salah satu cara:

**Cara A — VS Code Live Server (disarankan):**
1. Install ekstensi [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) di VS Code
2. Klik kanan `frontend/index.html` → **Open with Live Server**
3. Frontend berjalan di `http://localhost:5500`

**Cara B — npx serve:**
```bash
npx serve frontend
```

**Cara C — Buka langsung:**
Klik dua kali `frontend/index.html` di File Explorer (fitur monitoring BMKG mungkin tidak berfungsi karena CORS browser)

---

## 📁 Struktur Folder

```
gelombang-aman/
├── backend/
│   ├── data/
│   │   ├── tsunami.json        ← 14 data kejadian historis
│   │   ├── education.json      ← 7 artikel edukasi
│   │   ├── simulation.json     ← 4 skenario simulasi
│   │   └── missing.json        ← laporan orang hilang (dibuat otomatis)
│   ├── src/
│   │   └── server.js           ← semua API dalam 1 file
│   ├── uploads/                ← foto laporan orang hilang
│   └── package.json
└── frontend/
    ├── index.html              ← Beranda
    ├── pages/
    │   ├── dashboard.html      ← Dashboard Statistik
    │   ├── peta.html           ← Peta Interaktif
    │   ├── database.html       ← Database Historis
    │   ├── monitoring.html     ← Monitoring BMKG
    │   ├── korban.html         ← Korban & Orang Hilang
    │   ├── edukasi.html        ← Pusat Edukasi
    │   └── simulasi.html       ← Simulasi Mitigasi
    └── assets/
        ├── css/main.css
        └── js/api.js
```

---

## 📊 Data yang Tersedia

| File | Isi |
|------|-----|
| `data/tsunami.json` | 14 kejadian tsunami Indonesia (BMKG/NGDC/NOAA) |
| `data/education.json` | 7 artikel edukasi (pengertian, proses, penyebab, tanda, dampak, mitigasi, checklist) |
| `data/simulation.json` | 4 skenario simulasi + 11 pertanyaan interaktif |

**Untuk menambah data:** edit langsung file JSON di folder `backend/data/`, server akan membaca otomatis.

---

## 🌐 Fitur

| Halaman | Fitur |
|---------|-------|
| Beranda | Statistik ringkasan, monitoring BMKG live, panduan edukasi |
| Dashboard | 4 grafik interaktif (Chart.js), filter tahun/provinsi |
| Peta | Leaflet.js, titik kejadian historis, klik untuk detail |
| Database | Tabel 14 kejadian, search & filter, modal detail |
| Monitoring | Proxy API BMKG real-time, status potensi tsunami |
| Korban | Statistik, pencarian orang hilang, formulir laporan |
| Edukasi | 7 artikel per kategori, filter, baca konten lengkap |
| Simulasi | Mini-game 4 skenario, evaluasi, skor, rekomendasi |

---

## 📡 API Endpoints

Semua endpoint bersifat publik (tanpa autentikasi):

```
GET  /api/health
GET  /api/tsunami
GET  /api/tsunami/:id
GET  /api/stats/overview
GET  /api/stats/per-tahun
GET  /api/stats/per-provinsi
GET  /api/stats/korban
GET  /api/map/kejadian-historis
GET  /api/monitoring/gempa-terkini   (proxy BMKG)
GET  /api/monitoring/gempa-list      (proxy BMKG)
GET  /api/monitoring/peringatan      (proxy BMKG)
GET  /api/education/artikel
GET  /api/education/artikel/:id
GET  /api/simulation/skenario
GET  /api/simulation/skenario/:id
POST /api/simulation/hasil
GET  /api/victims/stats
GET  /api/victims/orang-hilang
GET  /api/victims/orang-hilang/:id
POST /api/victims/orang-hilang       (lapor orang hilang)
```

---

## ⚠️ Disclaimer

Platform ini **bukan** sistem peringatan dini resmi. Untuk peringatan tsunami resmi selalu pantau:
- **BMKG**: [bmkg.go.id](https://www.bmkg.go.id)
- **Aplikasi Info BMKG** di smartphone
- Sirine peringatan di wilayah setempat

---

© 2024 GELOMBANG AMAN
