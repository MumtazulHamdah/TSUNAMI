# 🌊 GELOMBANG AMAN
### Platform Informasi Tsunami Indonesia
**"Kenali Risiko, Siaga Hadapi Tsunami"**

---

## 📋 Deskripsi

**GELOMBANG AMAN** adalah platform digital yang berfokus pada bencana tsunami di Indonesia. Platform ini menyediakan:

- 📊 **Dashboard Statistik** — Data kejadian, korban, dan wilayah terdampak dengan grafik interaktif
- 🗺️ **Peta Rawan Tsunami** — Peta interaktif zona bahaya dan kejadian historis
- 🗂️ **Database Historis** — Kumpulan data kejadian tsunami Indonesia
- 📡 **Monitoring BMKG** — Informasi gempa bumi terkini dari API BMKG
- 🔍 **Pencarian Korban** — Laporan dan pencarian orang hilang akibat tsunami
- 📚 **Pusat Edukasi** — Artikel mitigasi dan kesiapsiagaan tsunami
- 🎮 **Simulasi Mitigasi** — Mini-game edukatif skenario tsunami
- 🔐 **Dashboard Admin** — Pengelolaan data terintegrasi

---

## 🛠️ Teknologi

| Layer | Teknologi |
|-------|-----------|
| Frontend | HTML5, CSS3 (Custom), JavaScript Vanilla |
| Backend | Node.js, Express.js |
| Database | PostgreSQL + PostGIS |
| Peta | Leaflet.js + Leaflet.MarkerCluster |
| Grafik | Chart.js v4 |
| Autentikasi | JWT (jsonwebtoken) |
| Upload | Multer |

---

## 📁 Struktur Folder

```
gelombang-aman/
├── backend/
│   ├── src/
│   │   ├── server.js           # Entry point
│   │   ├── config/
│   │   │   └── database.js     # Koneksi PostgreSQL
│   │   ├── controllers/        # Business logic
│   │   │   ├── tsunamiController.js
│   │   │   ├── monitoringController.js
│   │   │   ├── victimsController.js
│   │   │   ├── educationController.js
│   │   │   ├── simulationController.js
│   │   │   ├── authController.js
│   │   │   ├── statsController.js
│   │   │   ├── mapController.js
│   │   │   └── adminController.js
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Auth, validation, upload
│   │   └── utils/
│   ├── uploads/                # File upload storage
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── index.html              # Beranda / Homepage
│   ├── pages/
│   │   ├── dashboard.html      # Dashboard Statistik
│   │   ├── peta.html           # Peta Rawan Tsunami
│   │   ├── database.html       # Database Historis
│   │   ├── monitoring.html     # Monitoring BMKG
│   │   ├── korban.html         # Korban & Orang Hilang
│   │   ├── edukasi.html        # Pusat Edukasi
│   │   ├── simulasi.html       # Simulasi Mitigasi
│   │   ├── login.html          # Admin Login
│   │   └── admin.html          # Dashboard Admin
│   └── assets/
│       ├── css/main.css        # Stylesheet utama
│       └── js/api.js           # API client & utilities
├── database/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   ├── seeds/
│   │   └── 001_seed_data.sql
│   ├── migrate.js              # Script migrasi
│   └── seed.js                 # Script seed data
└── README.md
```

---

## 🚀 Panduan Instalasi

### Prasyarat

- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **PostgreSQL** v14+ dengan ekstensi **PostGIS** ([postgis.net](https://postgis.net))
- Git

### Langkah 1: Setup Database

```sql
-- Buat database baru di PostgreSQL
CREATE DATABASE gelombang_aman;

-- Sambungkan ke database
\c gelombang_aman

-- Aktifkan ekstensi PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Langkah 2: Konfigurasi Environment

```bash
cd gelombang-aman/backend
cp .env.example .env
```

Edit file `.env` dan isi dengan konfigurasi Anda:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gelombang_aman
DB_USER=postgres
DB_PASSWORD=password_anda

JWT_SECRET=ganti_dengan_string_rahasia_panjang
PORT=3000
CORS_ORIGIN=http://localhost:5500
```

### Langkah 3: Install Dependencies Backend

```bash
cd gelombang-aman/backend
npm install
```

### Langkah 4: Jalankan Migrasi Database

```bash
# Dari folder root gelombang-aman
cd database
node migrate.js
node seed.js
```

### Langkah 5: Jalankan Backend Server

```bash
cd backend
npm run dev    # Development (dengan nodemon)
# atau
npm start      # Production
```

Server berjalan di: `http://localhost:3000`

### Langkah 6: Jalankan Frontend

Buka `frontend/index.html` dengan server lokal. Contoh menggunakan VS Code Live Server:
- Install ekstensi **Live Server** di VS Code
- Klik kanan `frontend/index.html` → Open with Live Server
- Atau gunakan: `npx serve frontend`

Frontend berjalan di: `http://localhost:5500`

---

## 🔐 Login Admin

Setelah seed data berhasil dijalankan:

| Field | Nilai |
|-------|-------|
| **URL** | `http://localhost:5500/pages/login.html` |
| **Email** | `admin@gelombangaman.id` |
| **Password** | `GelombangAman2024!` |

> ⚠️ **Penting:** Segera ubah password setelah login pertama melalui menu profil admin!

---

## 📡 API Endpoints

### Publik
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/stats/overview` | Statistik ringkasan |
| GET | `/api/stats/per-tahun` | Data per tahun |
| GET | `/api/stats/per-provinsi` | Data per provinsi |
| GET | `/api/tsunami` | Daftar kejadian tsunami |
| GET | `/api/tsunami/:id` | Detail kejadian |
| GET | `/api/monitoring/gempa-terkini` | Gempa terkini (proxy BMKG) |
| GET | `/api/monitoring/gempa-list` | Daftar gempa (proxy BMKG) |
| GET | `/api/monitoring/peringatan` | Status peringatan |
| GET | `/api/map/kejadian-historis` | GeoJSON titik kejadian |
| GET | `/api/map/zona-bahaya` | GeoJSON zona bahaya |
| GET | `/api/victims/stats` | Statistik korban |
| GET | `/api/victims/orang-hilang` | Daftar orang hilang |
| POST | `/api/victims/orang-hilang` | Lapor orang hilang |
| GET | `/api/education/artikel` | Daftar artikel |
| GET | `/api/simulation/skenario` | Daftar skenario |
| POST | `/api/simulation/hasil` | Submit hasil simulasi |

### Terproteksi (Butuh JWT Admin)
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login admin |
| GET | `/api/admin/dashboard` | Dashboard admin |
| POST | `/api/tsunami` | Tambah kejadian |
| PUT | `/api/tsunami/:id` | Edit kejadian |
| DELETE | `/api/tsunami/:id` | Hapus kejadian |
| PATCH | `/api/victims/orang-hilang/:id/status` | Update status |
| PATCH | `/api/admin/laporan/:id/verifikasi` | Verifikasi laporan |

---

## 🗺️ Data Peta

Peta menggunakan data demo untuk tampilan awal. Untuk data resmi:

1. **Zona Bahaya Tsunami**: Download GeoJSON dari [InaRISK BNPB](https://inarisk.bnpb.go.id)
2. **Batas Wilayah**: Download dari [BIG Indonesia](https://tanahair.indonesia.go.id)
3. Import melalui panel admin atau langsung ke tabel `tsunami_hazard_zones`

---

## 📊 Sumber Data

| Sumber | Data | URL |
|--------|------|-----|
| **BMKG** | Gempa, Peringatan Dini, Katalog Historis | [bmkg.go.id](https://www.bmkg.go.id) |
| **BNPB/InaRISK** | Peta Bahaya & Risiko Tsunami | [inarisk.bnpb.go.id](https://inarisk.bnpb.go.id) |
| **NGDC/NOAA** | Database Tsunami Global | [ngdc.noaa.gov](https://www.ngdc.noaa.gov) |
| **BIG** | Data Geospasial Indonesia | [tanahair.indonesia.go.id](https://tanahair.indonesia.go.id) |

> **Catatan:** GELOMBANG AMAN tidak menerbitkan peringatan tsunami mandiri. Selalu pantau informasi resmi BMKG.

---

## ⚠️ Disclaimer

Platform ini **tidak** merupakan sistem peringatan dini tsunami resmi. Data yang ditampilkan bersumber dari lembaga resmi pemerintah Indonesia. Untuk peringatan tsunami resmi, selalu pantau:
- 📻 **BMKG**: [bmkg.go.id](https://www.bmkg.go.id) / Telepon: 021-6546315
- 🔔 **Sirine peringatan tsunami** di wilayah setempat
- 📱 **Aplikasi InaWARE** dari BNPB

---

## 📜 Lisensi

© 2024 GELOMBANG AMAN. Dikembangkan untuk kepentingan pendidikan dan kesiapsiagaan bencana masyarakat Indonesia.
