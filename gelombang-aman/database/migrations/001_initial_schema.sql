-- ============================================================
-- GELOMBANG AMAN - Database Migration
-- PostgreSQL + PostGIS
-- ============================================================

-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: admins
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    aktif BOOLEAN DEFAULT true,
    terakhir_login TIMESTAMPTZ,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW(),
    diperbarui_pada TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: tsunami_events
-- ============================================================
CREATE TABLE IF NOT EXISTS tsunami_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_kejadian VARCHAR(500) NOT NULL,
    tanggal DATE,
    tahun INTEGER NOT NULL,
    lokasi VARCHAR(500) NOT NULL,
    provinsi VARCHAR(200) NOT NULL,
    kabupaten_kota VARCHAR(200),
    magnitudo NUMERIC(4,1),
    kedalaman_km NUMERIC(6,1),
    tinggi_gelombang NUMERIC(8,2),
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    korban_meninggal INTEGER DEFAULT 0,
    korban_hilang INTEGER DEFAULT 0,
    korban_luka INTEGER DEFAULT 0,
    pengungsi INTEGER DEFAULT 0,
    rumah_rusak INTEGER DEFAULT 0,
    penyebab VARCHAR(200),
    jenis_tsunami VARCHAR(200),
    deskripsi TEXT,
    sumber_data VARCHAR(500) NOT NULL,
    tipe_data VARCHAR(50) DEFAULT 'historis',
    dibuat_pada TIMESTAMPTZ DEFAULT NOW(),
    diperbarui_pada TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tsunami_tahun ON tsunami_events(tahun);
CREATE INDEX IF NOT EXISTS idx_tsunami_provinsi ON tsunami_events(provinsi);
CREATE INDEX IF NOT EXISTS idx_tsunami_tanggal ON tsunami_events(tanggal);

-- ============================================================
-- TABLE: tsunami_hazard_zones (PostGIS spatial)
-- ============================================================
CREATE TABLE IF NOT EXISTS tsunami_hazard_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_wilayah VARCHAR(500) NOT NULL,
    provinsi VARCHAR(200) NOT NULL,
    kabupaten_kota VARCHAR(200),
    tingkat_bahaya VARCHAR(50) CHECK (tingkat_bahaya IN ('tinggi', 'sedang', 'rendah')),
    keterangan TEXT,
    sumber_data VARCHAR(500) DEFAULT 'InaRISK BNPB',
    geom GEOMETRY(MULTIPOLYGON, 4326),
    dibuat_pada TIMESTAMPTZ DEFAULT NOW(),
    diperbarui_pada TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hazard_zones_geom ON tsunami_hazard_zones USING GIST(geom);
CREATE INDEX IF NOT EXISTS idx_hazard_zones_provinsi ON tsunami_hazard_zones(provinsi);

-- ============================================================
-- TABLE: missing_persons
-- ============================================================
CREATE TABLE IF NOT EXISTS missing_persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nama_korban VARCHAR(200) NOT NULL,
    usia INTEGER,
    jenis_kelamin VARCHAR(20),
    ciri_fisik TEXT,
    lokasi_terakhir VARCHAR(500) NOT NULL,
    kejadian_id UUID REFERENCES tsunami_events(id) ON DELETE SET NULL,
    foto_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'dalam_pencarian' 
        CHECK (status IN ('dalam_pencarian', 'ditemukan', 'teridentifikasi', 'dipertemukan', 'ditutup')),
    catatan_status TEXT,
    nama_pelapor VARCHAR(200) NOT NULL,
    kontak_pelapor VARCHAR(200) NOT NULL,
    hubungan_pelapor VARCHAR(100),
    diverifikasi BOOLEAN DEFAULT false,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW(),
    diperbarui_pada TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_missing_status ON missing_persons(status);
CREATE INDEX IF NOT EXISTS idx_missing_diverifikasi ON missing_persons(diverifikasi);

-- ============================================================
-- TABLE: education_articles
-- ============================================================
CREATE TABLE IF NOT EXISTS education_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    kategori VARCHAR(100) NOT NULL 
        CHECK (kategori IN ('pengertian', 'proses', 'penyebab', 'tanda', 'dampak', 'mitigasi', 'checklist')),
    konten TEXT NOT NULL,
    ringkasan VARCHAR(1000),
    urutan INTEGER DEFAULT 99,
    aktif BOOLEAN DEFAULT true,
    dibuat_oleh UUID REFERENCES admins(id),
    dibuat_pada TIMESTAMPTZ DEFAULT NOW(),
    diperbarui_pada TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: simulation_scenarios
-- ============================================================
CREATE TABLE IF NOT EXISTS simulation_scenarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    judul VARCHAR(500) NOT NULL,
    deskripsi TEXT,
    kategori VARCHAR(100),
    tingkat_kesulitan VARCHAR(50) DEFAULT 'sedang',
    urutan INTEGER DEFAULT 99,
    aktif BOOLEAN DEFAULT true,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: simulation_questions
-- ============================================================
CREATE TABLE IF NOT EXISTS simulation_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skenario_id UUID NOT NULL REFERENCES simulation_scenarios(id) ON DELETE CASCADE,
    pertanyaan TEXT NOT NULL,
    pilihan JSONB NOT NULL,
    jawaban_benar VARCHAR(10) NOT NULL,
    penjelasan TEXT,
    poin INTEGER DEFAULT 10,
    urutan INTEGER DEFAULT 1
);

-- ============================================================
-- TABLE: admin_activity_log
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admins(id),
    aksi VARCHAR(50),
    tabel VARCHAR(100),
    record_id UUID,
    deskripsi TEXT,
    dibuat_pada TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_dibuat ON admin_activity_log(dibuat_pada);
