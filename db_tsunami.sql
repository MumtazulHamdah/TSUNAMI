-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2026 at 04:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tsunami`
--

-- --------------------------------------------------------

--
-- Table structure for table `edukasi`
--

CREATE TABLE `edukasi` (
  `id` varchar(10) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `urutan` int(11) DEFAULT NULL,
  `konten` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `edukasi`
--

INSERT INTO `edukasi` (`id`, `judul`, `urutan`, `konten`) VALUES
('e001', 'Apa Itu Tsunami?', 1, '<h2>🌊 Pengertian Tsunami</h2><p>Tsunami adalah serangkaian gelombang laut yang sangat besar dan bertenaga akibat gangguan tiba-tiba pada dasar laut. Kata \"tsunami\" berasal dari bahasa Jepang: <em>tsu</em> (pelabuhan) dan <em>nami</em> (gelombang).</p><ul><li><strong>Kecepatan tinggi:</strong> Mencapai 800 km/jam di laut dalam (setara pesawat jet).</li><li><strong>Panjang gelombang besar:</strong> Mencapai ratusan kilometer dengan periode 10 menit hingga 2 jam.</li><li><strong>Gelombang beruntun:</strong> Gelombang pertama belum tentu yang terbesar.</li></ul>'),
('e002', 'Penyebab Tsunami', 2, '<h2>🌋 Penyebab Terjadinya Tsunami</h2><ul><li><strong>Gempa Bumi Tektonik (~80%):</strong> Gempa dangkal (kedalaman kurang dari 70 km) dengan magnitudo M &ge; 7.0 dan mekanisme sesar naik di dasar laut.</li><li><strong>Longsoran Bawah Laut:</strong> Runtuhan sedimen atau tebing dasar samudera dalam volume besar (contoh: Tsunami Aru 1979).</li><li><strong>Erupsi Gunung Berapi:</strong> Letusan gunung api laut atau runtuhnya sebagian badan gunung ke laut (contoh: Tsunami Selat Sunda 2018 akibat Anak Krakatau).</li></ul>'),
('e003', 'Dampak Negatif & Positif Tsunami', 3, '<h2>⚖️ Dampak Negatif & Positif Tsunami</h2><h3>❌ Dampak Negatif</h3><ul><li><strong>Kemanusiaan:</strong> Korban jiwa, orang hilang, luka berat, pengungsian massal, dan trauma psikologis.</li><li><strong>Infrastruktur & Ekonomi:</strong> Hancurnya permukiman, pelabuhan, jalan, jembatan, serta lumpuhnya ekonomi pesisir.</li><li><strong>Lingkungan:</strong> Erosi garis pantai, kerusakan terumbu karang & mangrove, serta intrusi air asin ke sumur warga.</li></ul><h3>✅ Dampak Positif (Pembelajaran & Kemajuan)</h3><ul><li><strong>Modernisasi Peringatan Dini:</strong> Mendorong pengembangan sistem deteksi dini tsunami (InaTEWS BMKG) yang jauh lebih cepat dan akurat.</li><li><strong>Tata Ruang Pesisir Tahan Bencana:</strong> Mendorong pembangunan sabuk hijau (hutan mangrove), jalur evakuasi resmi, dan bangunan tahan gempa/tsunami.</li><li><strong>Kesadaran & Solidaritas Masyarakat:</strong> Meningkatkan budaya siaga bencana di masyarakat, sekolah, dan kemajuan riset kelautan.</li></ul>'),
('e004', 'Panduan Edukasi & Mitigasi Tsunami', 4, '<h2>🛡️ Edukasi Mitigasi Tsunami</h2><h3>🔵 Sebelum Tsunami (Kesiapsiagaan)</h3><ul><li>Pelajari peta zona bahaya tsunami, rute evakuasi, dan lokasi titik kumpul (dataran tinggi).</li><li>Siapkan <strong>Tas Siaga Bencana</strong> (dokumen penting, air minum, obat P3K, senter, peluit, uang tunai).</li></ul><h3>🔴 Saat Tsunami (Tanggap Darurat)</h3><ul><li>Jika merasakan gempa kuat lebih dari 20 detik di pesisir atau melihat air laut surut mendadak, <strong>segera lari ke tempat tinggi</strong> tanpa menunggu sirine.</li><li>Hindari memakai kendaraan bermotor jika jalan macet; berlari lebih cepat dan aman.</li><li>Tetap di tempat tinggi hingga ada pengumuman resmi aman dari BMKG/BPBD.</li></ul><h3>🟢 Setelah Tsunami (Pemulihan)</h3><ul><li>Hindari genangan air dan kabel listrik yang menjuntai.</li><li>Gunakan air bersih dari posko resmi dan laporkan anggota keluarga yang hilang ke posko/BPBD.</li></ul>');

-- --------------------------------------------------------

--
-- Table structure for table `kuis`
--

CREATE TABLE `kuis` (
  `id` int(11) NOT NULL,
  `pertanyaan` text NOT NULL,
  `opsi_a` varchar(255) NOT NULL,
  `opsi_b` varchar(255) NOT NULL,
  `opsi_c` varchar(255) NOT NULL,
  `opsi_d` varchar(255) NOT NULL,
  `jawaban_benar` char(1) NOT NULL,
  `pembahasan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kuis`
--

INSERT INTO `kuis` (`id`, `pertanyaan`, `opsi_a`, `opsi_b`, `opsi_c`, `opsi_d`, `jawaban_benar`, `pembahasan`) VALUES
(1, 'Merasakan gempa kuat di pantai selama >20 detik. Apa langkah pertama?', 'Berlindung di dalam rumah', 'Segera lari ke tempat tinggi', 'Cek air laut ke bibir pantai', 'Tunggu bunyi sirine', 'B', 'Gempa kuat di pesisir adalah tanda bahaya utama. Segera evakuasi ke tempat tinggi setelah getaran mereda.'),
(2, 'Air laut tiba-tiba surut jauh dan ikan terdampar. Apa yang harus dilakukan?', 'Ambil ikan yang terdampar', 'Rekam video untuk sosmed', 'Lari ke dataran tinggi & peringatkan warga', 'Diam menunggu air pasang', 'C', 'Air laut surut mendadak menandakan gelombang tsunami akan segera menghantam pantai.'),
(3, 'Gelombang pertama sudah surut. Bolehkah langsung kembali ke rumah?', 'Boleh, karena sudah aman', 'Boleh sebentar ambil barang', 'Tidak boleh, tunggu info resmi BMKG', 'Boleh jika tetangga sudah turun', 'C', 'Tsunami datang dalam beberapa gelombang susulan yang bisa lebih besar dari gelombang pertama.');

-- --------------------------------------------------------

--
-- Table structure for table `orang_hilang`
--

CREATE TABLE `orang_hilang` (
  `id` int(11) NOT NULL,
  `nama_lengkap` varchar(150) NOT NULL,
  `usia` int(11) NOT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') NOT NULL,
  `lokasi_terakhir` varchar(150) NOT NULL,
  `ciri_fisik` text NOT NULL,
  `status` enum('Hilang','Ditemukan') DEFAULT 'Hilang',
  `kontak_pelapor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orang_hilang`
--

INSERT INTO `orang_hilang` (`id`, `nama_lengkap`, `usia`, `jenis_kelamin`, `lokasi_terakhir`, `ciri_fisik`, `status`, `kontak_pelapor`) VALUES
(1, 'Ahmad Fauzi', 34, 'Laki-laki', 'Pantai Barat Pangandaran', 'Tinggi 170 cm, kaos biru dongker, celana pendek hitam.', 'Hilang', '0812-3456-7890 (Ibu Siti)'),
(2, 'Rina Marlina', 22, 'Perempuan', 'Pesisir Teluk Palu', 'Tinggi 158 cm, kerudung coklat, membawa ransel abu-abu.', 'Ditemukan', '0857-9876-5432 (Bapak Hendra)');

-- --------------------------------------------------------

--
-- Table structure for table `tsunami_historis`
--

CREATE TABLE `tsunami_historis` (
  `id` varchar(10) NOT NULL,
  `nama_kejadian` varchar(150) NOT NULL,
  `tanggal` date NOT NULL,
  `tahun` int(11) NOT NULL,
  `lokasi` varchar(150) DEFAULT NULL,
  `provinsi` varchar(100) DEFAULT NULL,
  `magnitudo` decimal(3,1) DEFAULT NULL,
  `tinggi_gelombang` decimal(4,1) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `korban_meninggal` int(11) DEFAULT NULL,
  `penyebab` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tsunami_historis`
--

INSERT INTO `tsunami_historis` (`id`, `nama_kejadian`, `tanggal`, `tahun`, `lokasi`, `provinsi`, `magnitudo`, `tinggi_gelombang`, `latitude`, `longitude`, `korban_meninggal`, `penyebab`) VALUES
('t001', 'Tsunami Aceh 2004', '2004-12-26', 2004, 'Samudera Hindia, barat Sumatra', 'Aceh', 9.1, 30.0, 5.000000, 95.300000, 167540, 'Gempa bumi tektonik'),
('t002', 'Tsunami Pangandaran 2006', '2006-07-17', 2006, 'Pantai Pangandaran', 'Jawa Barat', 7.7, 10.0, -9.250000, 107.410000, 668, 'Gempa bumi tektonik'),
('t003', 'Tsunami Bengkulu 2007', '2007-09-12', 2007, 'Pesisir Bengkulu', 'Bengkulu', 8.4, 3.0, -4.440000, 101.370000, 25, 'Gempa bumi tektonik'),
('t004', 'Tsunami Mentawai 2010', '2010-10-25', 2010, 'Kepulauan Mentawai', 'Sumatera Barat', 7.7, 9.0, -3.490000, 99.950000, 435, 'Gempa bumi tektonik'),
('t005', 'Tsunami Selat Sunda 2018', '2018-12-22', 2018, 'Selat Sunda', 'Banten & Lampung', NULL, 5.0, -6.820000, 105.630000, 437, 'Erupsi Gunung Anak Krakatau'),
('t006', 'Tsunami Palu-Donggala 2018', '2018-09-28', 2018, 'Teluk Palu', 'Sulawesi Tengah', 7.5, 6.0, -0.260000, 119.840000, 4340, 'Gempa bumi tektonik'),
('t011', 'Tsunami Lombok 2018', '2018-08-19', 2018, 'Lombok Utara', 'Nusa Tenggara Barat', 6.9, 0.5, -8.250000, 116.480000, 2, 'Gempa bumi tektonik'),
('t012', 'Tsunami Maluku 2019', '2019-09-26', 2019, 'Maluku Tengah', 'Maluku', 6.5, 0.3, -3.430000, 130.240000, 38, 'Gempa bumi tektonik');

-- --------------------------------------------------------

--
-- Table structure for table `zona_rawan_bmkg`
--

CREATE TABLE `zona_rawan_bmkg` (
  `id` int(11) NOT NULL,
  `wilayah` varchar(150) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `sumber_ancaman` varchar(150) NOT NULL,
  `parameter_gempa` varchar(100) NOT NULL,
  `estimasi_tiba` varchar(50) NOT NULL,
  `tingkat_kerawanan` enum('Sangat Tinggi','Tinggi','Sedang') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zona_rawan_bmkg`
--

INSERT INTO `zona_rawan_bmkg` (`id`, `wilayah`, `provinsi`, `sumber_ancaman`, `parameter_gempa`, `estimasi_tiba`, `tingkat_kerawanan`) VALUES
(1, 'Pesisir Selatan Cilacap & Pangandaran', 'Jawa Tengah & Jawa Barat', 'Zona Megathrust Selat Sunda - Jawa', 'Magnitudo >= 7.0, Kedalaman < 70 km', '20 - 30 Menit', 'Sangat Tinggi'),
(2, 'Pesisir Barat Sumatra & Kepulauan Mentawai', 'Sumatera Barat & Aceh', 'Zona Subduksi Lempeng Indo-Australia', 'Magnitudo >= 7.5, Kedalaman < 50 km', '15 - 25 Menit', 'Sangat Tinggi'),
(3, 'Selat Sunda (Banten & Lampung Selatan)', 'Banten & Lampung', 'Aktivitas Vulkanik Gunung Anak Krakatau', 'Erupsi / Longsoran Tubuh Gunung Api', '10 - 20 Menit', 'Sangat Tinggi'),
(4, 'Teluk Palu & Pesisir Donggala', 'Sulawesi Tengah', 'Sesar Aktif Palu-Koro & Longsor Bawah Laut', 'Magnitudo >= 6.8, Sesar Geser/Turun', '5 - 15 Menit', 'Sangat Tinggi'),
(5, 'Pesisir Selatan Bali & Lombok', 'Bali & NTB', 'Zona Megathrust Sumba - Bali', 'Magnitudo >= 7.2, Kedalaman < 70 km', '20 - 35 Menit', 'Tinggi'),
(6, 'Kepulauan Maluku & Laut Banda', 'Maluku', 'Zona Subduksi Laut Banda', 'Magnitudo >= 7.0, Kedalaman < 60 km', '15 - 30 Menit', 'Tinggi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `edukasi`
--
ALTER TABLE `edukasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kuis`
--
ALTER TABLE `kuis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orang_hilang`
--
ALTER TABLE `orang_hilang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tsunami_historis`
--
ALTER TABLE `tsunami_historis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zona_rawan_bmkg`
--
ALTER TABLE `zona_rawan_bmkg`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kuis`
--
ALTER TABLE `kuis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orang_hilang`
--
ALTER TABLE `orang_hilang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zona_rawan_bmkg`
--
ALTER TABLE `zona_rawan_bmkg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
