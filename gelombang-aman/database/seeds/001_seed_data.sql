-- ============================================================
-- GELOMBANG AMAN - Seed Data
-- Sumber: BMKG, NGDC/NOAA, Katalog Tsunami Indonesia
-- Data historis untuk keperluan demo dan referensi
-- ============================================================

-- Admin default (password: GelombangAman2024!)
INSERT INTO admins (id, nama, email, password_hash, role) VALUES 
('a0000000-0000-0000-0000-000000000001', 'Administrator', 'admin@gelombangaman.id',
 '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TIdp7MGzF/lqXO.2Y8HXUkUyN2bm', 'superadmin')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- DATA HISTORIS TSUNAMI INDONESIA
-- Sumber: BMKG, NGDC/NOAA Global Historical Tsunami Database
-- ============================================================

INSERT INTO tsunami_events (nama_kejadian, tanggal, tahun, lokasi, provinsi, kabupaten_kota,
  magnitudo, tinggi_gelombang, latitude, longitude, korban_meninggal, korban_hilang,
  korban_luka, pengungsi, penyebab, deskripsi, sumber_data, tipe_data) VALUES

('Tsunami Aceh 2004', '2004-12-26', 2004,
 'Samudera Hindia, barat Sumatra', 'Aceh', 'Aceh Besar',
 9.1, 30.0, 5.0, 95.3,
 167540, 37063, 504518, 500000,
 'Gempa bumi tektonik',
 'Gempa bumi besar berkekuatan Mw 9.1 di dasar Samudera Hindia memicu tsunami dahsyat yang menghantam pesisir Aceh dan wilayah lainnya di Asia. Merupakan salah satu bencana alam paling mematikan dalam sejarah.',
 'BMKG, NGDC/NOAA', 'historis'),

('Tsunami Pangandaran 2006', '2006-07-17', 2006,
 'Pantai Pangandaran', 'Jawa Barat', 'Pangandaran',
 7.7, 10.0, -9.25, 107.41,
 668, 65, 9299, 85000,
 'Gempa bumi tektonik',
 'Tsunami yang dipicu gempa bumi Mw 7.7 menghantam pesisir selatan Jawa Barat dan Jawa Tengah.',
 'BMKG, NGDC/NOAA', 'historis'),

('Tsunami Bengkulu 2007', '2007-09-12', 2007,
 'Pesisir Bengkulu', 'Bengkulu', 'Kota Bengkulu',
 8.4, 3.0, -4.44, 101.37,
 25, 0, 132, 58000,
 'Gempa bumi tektonik',
 'Rangkaian gempa besar di barat Bengkulu memicu tsunami kecil di pesisir Bengkulu.',
 'BMKG', 'historis'),

('Tsunami Mentawai 2010', '2010-10-25', 2010,
 'Kepulauan Mentawai', 'Sumatera Barat', 'Kepulauan Mentawai',
 7.7, 9.0, -3.49, 99.95,
 435, 84, 270, 15000,
 'Gempa bumi tektonik',
 'Tsunami menghantam Kepulauan Mentawai akibat gempa bumi Mw 7.7. Wilayah terpencil menyulitkan evakuasi dan bantuan.',
 'BMKG, BNPB', 'historis'),

('Tsunami Selat Sunda 2018', '2018-12-22', 2018,
 'Selat Sunda, Banten dan Lampung', 'Banten', 'Pandeglang',
 NULL, 5.0, -6.82, 105.63,
 437, 14, 14059, 33721,
 'Erupsi gunung berapi dan longsoran bawah laut',
 'Tsunami dipicu erupsi dan runtuhnya sebagian kawah Gunung Anak Krakatau. Tanpa peringatan resmi sebelumnya karena penyebabnya bukan gempa bumi.',
 'BMKG, BNPB', 'historis'),

('Tsunami Palu-Donggala 2018', '2018-09-28', 2018,
 'Teluk Palu, Sulawesi Tengah', 'Sulawesi Tengah', 'Kota Palu',
 7.5, 6.0, -0.26, 119.84,
 4340, 680, 10679, 191000,
 'Gempa bumi tektonik',
 'Gempa bumi Mw 7.5 diikuti tsunami di Teluk Palu. Fenomena likuefaksi juga terjadi di beberapa titik. Merupakan bencana ganda terbesar Indonesia pada 2018.',
 'BMKG, BNPB', 'historis'),

('Tsunami Flores 1992', '1992-12-12', 1992,
 'Flores, Nusa Tenggara Timur', 'Nusa Tenggara Timur', 'Flores Timur',
 7.8, 25.0, -8.48, 121.93,
 2500, 0, 500, 90000,
 'Gempa bumi tektonik',
 'Tsunami dahsyat menerjang Flores dan Pulau Babi akibat gempa bumi besar. Pulau Babi hampir seluruhnya terendam gelombang.',
 'NGDC/NOAA', 'historis'),

('Tsunami Aru 1979', '1979-07-19', 1979,
 'Kepulauan Aru', 'Maluku', 'Kepulauan Aru',
 NULL, 8.0, -6.5, 134.9,
 539, 0, 0, 0,
 'Longsor bawah laut',
 'Tsunami dipicu longsoran bawah laut menghantam Kepulauan Aru.',
 'NGDC/NOAA', 'historis'),

('Tsunami Biak 1996', '1996-02-17', 1996,
 'Biak, Papua', 'Papua', 'Biak Numfor',
 8.1, 7.7, -0.89, 136.95,
 166, 0, 423, 4700,
 'Gempa bumi tektonik',
 'Tsunami yang dipicu gempa bumi besar menghantam pesisir utara Pulau Biak dan sekitarnya.',
 'NGDC/NOAA', 'historis'),

('Tsunami Lombok 2018', '2018-08-19', 2018,
 'Lombok Utara', 'Nusa Tenggara Barat', 'Lombok Utara',
 6.9, 0.5, -8.25, 116.48,
 2, 0, 12, 1200,
 'Gempa bumi tektonik',
 'Gempa susulan setelah rangkaian gempa besar di Lombok memicu tsunami kecil di pesisir Lombok Utara.',
 'BMKG, BNPB', 'historis'),

('Tsunami Maluku 2019', '2019-09-26', 2019,
 'Maluku Tengah', 'Maluku', 'Maluku Tengah',
 6.5, 0.3, -3.43, 130.24,
 38, 0, 100, 2800,
 'Gempa bumi tektonik',
 'Gempa bumi Mw 6.5 memicu tsunami kecil di pesisir Maluku Tengah.',
 'BMKG, BNPB', 'historis'),

('Tsunami Sulawesi Utara 1996', '1996-01-01', 1996,
 'Sangihe, Sulawesi Utara', 'Sulawesi Utara', 'Kepulauan Sangihe',
 7.9, 3.0, 4.0, 126.5,
 9, 0, 45, 5000,
 'Gempa bumi tektonik',
 'Gempa bumi di laut Maluku memicu tsunami kecil di Kepulauan Sangihe.',
 'NGDC/NOAA', 'historis'),

('Tsunami Sumba 1977', '1977-08-19', 1977,
 'Pulau Sumba', 'Nusa Tenggara Timur', 'Sumba Barat',
 8.3, 5.0, -11.1, 118.4,
 316, 0, 200, 0,
 'Gempa bumi tektonik',
 'Tsunami besar menghantam Pulau Sumba akibat gempa bumi besar di Laut Banda.',
 'NGDC/NOAA', 'historis'),

('Tsunami Sulawesi 1968', '1968-08-11', 1968,
 'Sulawesi Tengah', 'Sulawesi Tengah', 'Donggala',
 7.9, 10.0, -0.2, 119.8,
 200, 0, 100, 0,
 'Gempa bumi tektonik',
 'Tsunami yang dipicu gempa bumi menghantam pesisir Teluk Palu dan sekitarnya.',
 'NGDC/NOAA', 'historis');

-- ============================================================
-- ARTIKEL EDUKASI TSUNAMI
-- ============================================================

INSERT INTO education_articles (judul, slug, kategori, konten, ringkasan, urutan) VALUES

('Apa Itu Tsunami?', 'apa-itu-tsunami', 'pengertian',
'<h2>Pengertian Tsunami</h2>
<p>Tsunami adalah serangkaian gelombang laut yang sangat besar dan bertenaga yang dihasilkan oleh gangguan tiba-tiba pada dasar laut. Kata "tsunami" berasal dari bahasa Jepang: <em>tsu</em> (pelabuhan) dan <em>nami</em> (gelombang), secara harfiah berarti "gelombang pelabuhan".</p>
<p>Berbeda dengan gelombang laut biasa yang dipengaruhi angin, tsunami bergerak dengan kecepatan luar biasa — mencapai 800 km/jam di laut dalam — dan dapat menempuh jarak ribuan kilometer sambil mempertahankan energinya.</p>
<h3>Karakteristik Tsunami</h3>
<ul>
<li>Panjang gelombang sangat besar (ratusan kilometer)</li>
<li>Periode gelombang panjang (10 menit hingga 2 jam)</li>
<li>Kecepatan tinggi di laut dalam (setara kecepatan pesawat terbang)</li>
<li>Ketinggian gelombang meningkat drastis saat mendekati pantai</li>
<li>Biasanya terdiri dari serangkaian gelombang, bukan hanya satu</li>
</ul>
<blockquote>Tsunami adalah bencana alam yang dapat dideteksi dan dimonitor. Sistem peringatan dini yang baik dapat menyelamatkan ribuan nyawa.</blockquote>',
'Tsunami adalah serangkaian gelombang laut besar akibat gangguan tiba-tiba pada dasar laut, bergerak dengan kecepatan hingga 800 km/jam.', 1),

('Proses Terbentuknya Tsunami', 'proses-terbentuknya-tsunami', 'proses',
'<h2>Bagaimana Tsunami Terbentuk?</h2>
<p>Tsunami terbentuk melalui serangkaian proses fisika yang kompleks. Berikut tahapan proses pembentukan tsunami:</p>
<h3>1. Gangguan Dasar Laut</h3>
<p>Gempa bumi tektonik yang kuat (umumnya M ≥ 7.0) di dasar laut menyebabkan pergerakan tiba-tiba pada dasar samudera secara vertikal. Pergerakan ini memindahkan volume air laut yang sangat besar secara serentak.</p>
<h3>2. Pembentukan Gelombang Awal</h3>
<p>Perpindahan air membentuk kubah (uplift) atau cekungan (subsidence) yang kemudian menyebar ke segala arah sebagai gelombang panjang.</p>
<h3>3. Perjalanan di Laut Dalam</h3>
<p>Di laut dalam, gelombang tsunami memiliki ketinggian hanya 0.5–1 meter namun panjang gelombangnya ratusan kilometer. Kecepatan gelombang berbanding lurus dengan kedalaman air.</p>
<h3>4. Shoaling — Gelombang Membesar</h3>
<p>Saat mendekati pantai, kedalaman air berkurang. Energi gelombang "terkompresi" sehingga ketinggian meningkat drastis dan kecepatannya menurun menjadi sekitar 40–60 km/jam.</p>
<h3>5. Run-up ke Daratan</h3>
<p>Gelombang menghantam dan melanda daratan, menghancurkan segala yang ada di jalurnya. Gelombang dapat masuk hingga puluhan kilometer ke daratan pada wilayah dataran rendah.</p>',
'Tahapan proses pembentukan tsunami dari gangguan dasar laut hingga gelombang menerjang pantai.', 2),

('Penyebab Tsunami', 'penyebab-tsunami', 'penyebab',
'<h2>Apa yang Menyebabkan Tsunami?</h2>
<h3>1. Gempa Bumi (Penyebab Utama ~80%)</h3>
<p>Gempa bumi tektonik dengan kekuatan besar (M ≥ 7.0) di dasar laut merupakan penyebab utama tsunami. Gempa harus bersifat dangkal (kedalaman < 70 km) dan memiliki mekanisme sesar naik (thrust fault) atau sesar turun untuk dapat memicu tsunami yang signifikan.</p>
<h3>2. Longsoran Bawah Laut</h3>
<p>Longsoran bawah laut — baik yang dipicu gempa maupun terjadi secara independen — dapat memindahkan volume sedimen dan batuan dalam jumlah masif sehingga memicu tsunami lokal. Contoh: Tsunami Aru 1979.</p>
<h3>3. Erupsi Gunung Berapi</h3>
<p>Letusan gunung berapi yang berada di laut atau di tepi pantai dapat memicu tsunami melalui longsoran sisi gunung berapi, ledakan eksplosif, atau kolaps kaldera. Contoh: Tsunami Selat Sunda 2018 akibat erupsi Gunung Anak Krakatau.</p>
<h3>4. Dampak Meteorit/Asteroid (Sangat Jarang)</h3>
<p>Tumbukan meteorit besar di lautan secara teoritis dapat memicu tsunami mega, namun kejadian ini sangat jarang dalam skala waktu manusia.</p>
<h3>Wilayah Indonesia yang Rawan</h3>
<p>Indonesia berada di "Cincin Api Pasifik" dan pertemuan tiga lempeng tektonik besar (Eurasia, Indo-Australia, Pasifik), menjadikannya salah satu negara dengan risiko tsunami tertinggi di dunia.</p>',
'Penyebab tsunami meliputi gempa bumi (80%), longsoran bawah laut, erupsi gunung berapi, dan tumbukan meteorit.', 3),

('Tanda-tanda Alam Tsunami', 'tanda-tanda-alam-tsunami', 'tanda',
'<h2>Tanda-tanda Alam Sebelum Tsunami</h2>
<div class="alert-box">⚠️ Kenali tanda-tanda ini dan segera evakuasi tanpa menunggu peringatan resmi!</div>
<h3>1. Gempa Bumi Kuat</h3>
<p>Merasakan gempa bumi yang sangat kuat dan lama (lebih dari 20 detik) di wilayah pesisir merupakan peringatan pertama. Jika Anda kesulitan berdiri, gempa tersebut cukup kuat untuk memicu tsunami.</p>
<h3>2. Surutnya Air Laut Secara Tiba-tiba</h3>
<p>Air laut surut secara dramatis dan tidak biasa dalam waktu singkat — biasanya beberapa menit hingga puluhan menit sebelum gelombang datang. Ikan dan biota laut dapat terlihat di permukaan atau bahkan di dasar laut yang terkena.</p>
<p><strong>⚠️ JANGAN mendekat ke pantai untuk melihat. Segera lari ke tempat tinggi!</strong></p>
<h3>3. Suara Gemuruh Keras</h3>
<p>Suara gemuruh keras seperti kereta api atau ledakan dari arah laut menandakan gelombang sedang datang.</p>
<h3>4. Perilaku Hewan yang Tidak Biasa</h3>
<p>Hewan-hewan yang biasanya tinggal di pantai atau laut — seperti burung laut, anjing — berlari menjauh dari pantai ke tempat yang lebih tinggi secara massal.</p>
<h3>INGAT: JIKA RAGU, EVAKUASI!</h3>
<p>Tidak ada salahnya evakuasi jika Anda tidak yakin. Lebih baik evakuasi tanpa ada tsunami daripada diam saat tsunami benar-benar datang.</p>',
'Kenali tanda-tanda tsunami: gempa kuat, surutnya air laut tiba-tiba, suara gemuruh, dan perilaku hewan tidak biasa.', 4),

('Dampak Tsunami', 'dampak-tsunami', 'dampak',
'<h2>Dampak Tsunami</h2>
<h3>Dampak terhadap Manusia</h3>
<ul>
<li>Korban jiwa dalam jumlah besar</li>
<li>Orang hilang akibat terseret gelombang</li>
<li>Luka-luka berat akibat hantaman puing</li>
<li>Kehilangan tempat tinggal dan harta benda</li>
<li>Trauma psikologis jangka panjang</li>
<li>Penyakit akibat kontaminasi air dan sanitasi buruk pasca bencana</li>
</ul>
<h3>Dampak terhadap Lingkungan</h3>
<ul>
<li>Erosi pesisir dan perubahan garis pantai</li>
<li>Pencemaran tanah dan sumber air tawar oleh air asin</li>
<li>Kerusakan ekosistem pesisir (mangrove, terumbu karang)</li>
<li>Sedimentasi dan perubahan morfologi dasar laut</li>
</ul>
<h3>Dampak terhadap Infrastruktur</h3>
<ul>
<li>Kerusakan dan penghancuran bangunan</li>
<li>Putusnya jaringan jalan, jembatan, dan utilitas</li>
<li>Kerusakan pelabuhan dan fasilitas maritim</li>
<li>Gangguan jaringan komunikasi dan listrik</li>
</ul>',
'Tsunami berdampak pada manusia (korban jiwa, pengungsian), lingkungan (erosi pesisir), dan infrastruktur.', 5),

('Panduan Mitigasi Tsunami', 'panduan-mitigasi-tsunami', 'mitigasi',
'<h2>Panduan Mitigasi Tsunami</h2>
<h3>🔵 SEBELUM Tsunami (Kesiapsiagaan)</h3>
<ul>
<li>Pelajari peta zona bahaya tsunami di wilayah Anda</li>
<li>Ketahui rute evakuasi dan titik kumpul terdekat</li>
<li>Ikuti pelatihan dan simulasi evakuasi</li>
<li>Siapkan tas siaga bencana (dokumen penting, air minum, obat-obatan, senter, peluit)</li>
<li>Diskusikan rencana evakuasi dengan seluruh anggota keluarga</li>
<li>Daftarkan diri ke sistem peringatan dini BMKG/BPBD setempat</li>
</ul>
<h3>🔴 SAAT Tsunami (Respons Darurat)</h3>
<ul>
<li>Jika merasakan gempa kuat di pesisir: SEGERA evakuasi ke tempat tinggi TANPA menunggu peringatan</li>
<li>Jika melihat air laut surut tiba-tiba: lari ke tempat tinggi SEKARANG</li>
<li>Gunakan jalur evakuasi resmi jika memungkinkan</li>
<li>Jalan kaki atau lari jika jalan macet, jangan bergantung pada kendaraan</li>
<li>Bawa hanya barang yang PALING penting dan bisa dibawa cepat</li>
<li>Bantu orang lanjut usia, anak-anak, dan penyandang disabilitas</li>
<li>Jangan kembali ke pantai meski gelombang pertama sudah surut — gelombang berikutnya bisa lebih besar</li>
</ul>
<h3>🟢 SETELAH Tsunami (Pemulihan)</h3>
<ul>
<li>Tetap di tempat aman hingga ada pernyataan resmi bahwa situasi sudah aman</li>
<li>Hindari area yang tergenang — mungkin ada arus balik berbahaya</li>
<li>Laporkan orang hilang ke posko bencana atau BPBD</li>
<li>Gunakan air bersih yang aman — jangan gunakan air dari sumur yang tergenang</li>
<li>Hati-hati terhadap bahaya sekunder: gas bocor, listrik, dan bangunan yang tidak stabil</li>
<li>Ikuti instruksi dari petugas bencana dan pemerintah setempat</li>
</ul>',
'Panduan mitigasi tsunami: langkah sebelum, saat, dan setelah tsunami untuk menyelamatkan diri dan keluarga.', 6),

('Checklist Kesiapsiagaan Tsunami', 'checklist-kesiapsiagaan-tsunami', 'checklist',
'<h2>Checklist Kesiapsiagaan Tsunami</h2>
<p>Gunakan checklist ini untuk memastikan Anda dan keluarga siap menghadapi kemungkinan tsunami.</p>
<h3>✅ Pengetahuan dan Rencana</h3>
<ul>
<li>☐ Saya mengetahui apakah wilayah saya berada di zona rawan tsunami</li>
<li>☐ Saya mengetahui rute evakuasi terdekat</li>
<li>☐ Saya mengetahui lokasi titik kumpul (assembly point)</li>
<li>☐ Saya memiliki rencana evakuasi bersama keluarga</li>
<li>☐ Semua anggota keluarga mengetahui tanda-tanda tsunami</li>
</ul>
<h3>✅ Perlengkapan Siaga Bencana (Tas Siaga)</h3>
<ul>
<li>☐ Air minum bersih (minimal 3 liter per orang)</li>
<li>☐ Makanan tahan lama (biskuit, roti kering)</li>
<li>☐ Obat-obatan dan P3K</li>
<li>☐ Senter dan baterai cadangan</li>
<li>☐ Peluit (untuk meminta pertolongan)</li>
<li>☐ Radio portabel bertenaga baterai</li>
<li>☐ Dokumen penting (KTP, KK, akta) dalam plastik kedap air</li>
<li>☐ Uang tunai secukupnya</li>
<li>☐ Pakaian ganti dan jas hujan</li>
<li>☐ Kontak darurat tertulis</li>
</ul>
<h3>✅ Perangkat Peringatan Dini</h3>
<ul>
<li>☐ Mendaftar di layanan peringatan dini BMKG</li>
<li>☐ Mengunduh aplikasi InaWARE atau Info BMKG</li>
<li>☐ Mengetahui bunyi sirine peringatan tsunami di wilayah saya</li>
</ul>',
'Checklist lengkap kesiapsiagaan tsunami: pengetahuan, rencana evakuasi, dan perlengkapan siaga bencana.', 7);

-- ============================================================
-- SKENARIO SIMULASI MITIGASI
-- ============================================================

INSERT INTO simulation_scenarios (id, judul, deskripsi, kategori, tingkat_kesulitan, urutan) VALUES
('s0000001-0000-0000-0000-000000000001', 
 'Gempa Kuat di Wilayah Pesisir', 
 'Anda sedang berada di rumah di kawasan pesisir pantai. Tiba-tiba bumi bergetar keras selama lebih dari 30 detik dan Anda sulit untuk berdiri.',
 'sebelum_tsunami', 'mudah', 1),
('s0000002-0000-0000-0000-000000000002',
 'Air Laut Surut Secara Tiba-tiba',
 'Anda sedang berjalan di tepi pantai. Anda memperhatikan bahwa air laut tiba-tiba surut sangat jauh dan terlihat banyak ikan terdampar di pasir.',
 'tanda_peringatan', 'mudah', 2),
('s0000003-0000-0000-0000-000000000003',
 'Simulasi Rute Evakuasi',
 'Sirine peringatan tsunami berbunyi. Anda berada di rumah bersama keluarga, tidak jauh dari pantai. Jalan utama terlihat mulai macet.',
 'evakuasi', 'sedang', 3),
('s0000004-0000-0000-0000-000000000004',
 'Setelah Gelombang Tsunami Mereda',
 'Gelombang tsunami sudah mereda. Anda berhasil selamat di tempat pengungsian. Anda ingin segera kembali ke rumah untuk mengambil barang.',
 'pasca_tsunami', 'sedang', 4);

-- Pertanyaan Skenario 1: Gempa Kuat
INSERT INTO simulation_questions (id, skenario_id, pertanyaan, pilihan, jawaban_benar, penjelasan, poin, urutan) VALUES
(uuid_generate_v4(), 's0000001-0000-0000-0000-000000000001',
 'Bumi bergetar keras selama lebih dari 30 detik dan Anda sulit berdiri. Apa yang pertama kali Anda lakukan?',
 '["A. Berlindung di bawah meja sampai getaran berhenti, lalu tunggu informasi di rumah", "B. Segera keluar dan berlari ke tempat yang lebih tinggi setelah getaran berhenti", "C. Pergi ke pantai untuk melihat apakah ada gelombang", "D. Menelpon keluarga terlebih dahulu sebelum bergerak"]',
 'B', 'Di wilayah pesisir, gempa kuat adalah tanda peringatan pertama tsunami. Segera evakuasi ke tempat tinggi setelah getaran mereda — JANGAN tunggu informasi atau pergi ke pantai.', 10, 1),

(uuid_generate_v4(), 's0000001-0000-0000-0000-000000000001',
 'Anda tidak merasakan sirine peringatan tsunami berbunyi setelah gempa. Apa yang sebaiknya Anda lakukan?',
 '["A. Kembali ke rumah karena tidak ada sirine", "B. Tetap di tempat tinggi dan tunggu pengumuman resmi", "C. Turun ke pantai untuk memastikan kondisi", "D. Menunggu tetangga bergerak lebih dulu"]',
 'B', 'Ketiadaan sirine BUKAN berarti situasi aman. Sistem sirine bisa tidak berfungsi. Tetap di tempat tinggi dan tunggu pengumuman resmi dari BMKG/BPBD.', 10, 2),

(uuid_generate_v4(), 's0000001-0000-0000-0000-000000000001',
 'Anda berhasil evakuasi ke bukit. Gelombang pertama sudah surut setelah 20 menit. Apa yang Anda lakukan?',
 '["A. Langsung turun karena gelombang sudah surut", "B. Tetap di tempat tinggi — tsunami biasanya datang beberapa kali", "C. Kembali ke rumah untuk mengambil barang berharga", "D. Turun setengah jalan untuk melihat kondisi lebih dekat"]',
 'B', 'Tsunami sering datang dalam beberapa gelombang. Gelombang pertama belum tentu yang terbesar. Tetap di tempat aman hingga ada pernyataan resmi bahwa situasi sudah aman.', 10, 3);

-- Pertanyaan Skenario 2: Air Laut Surut
INSERT INTO simulation_questions (id, skenario_id, pertanyaan, pilihan, jawaban_benar, penjelasan, poin, urutan) VALUES
(uuid_generate_v4(), 's0000002-0000-0000-0000-000000000002',
 'Air laut surut tiba-tiba dan terlihat banyak ikan terdampar. Apa yang Anda lakukan?',
 '["A. Mendekati pantai untuk mengambil ikan yang terdampar", "B. Mengambil foto untuk diunggah ke media sosial", "C. SEGERA berlari ke tempat yang lebih tinggi", "D. Menunggu untuk memastikan apakah ini pertanda tsunami"]',
 'C', 'Surutnya air laut secara tiba-tiba adalah tanda BAHAYA tsunami yang paling jelas. Jangan tergoda mengambil ikan — SEGERA lari ke tempat tinggi!', 15, 1),

(uuid_generate_v4(), 's0000002-0000-0000-0000-000000000002',
 'Anda melihat orang-orang di pantai yang tampak bingung melihat surutnya air. Apa yang Anda lakukan?',
 '["A. Diam saja karena bukan tanggung jawab Anda", "B. Teriak dan beritahu semua orang untuk segera evakuasi ke tempat tinggi", "C. Tunggu sirine berbunyi sebelum memberi tahu orang lain", "D. Hubungi media sosial untuk menyebarkan informasi"]',
 'B', 'Segera beritahu semua orang di sekitar Anda untuk evakuasi. Menyebarkan informasi peringatan adalah tindakan yang bisa menyelamatkan nyawa banyak orang.', 10, 2);

-- Pertanyaan Skenario 3: Evakuasi
INSERT INTO simulation_questions (id, skenario_id, pertanyaan, pilihan, jawaban_benar, penjelasan, poin, urutan) VALUES
(uuid_generate_v4(), 's0000003-0000-0000-0000-000000000003',
 'Sirine berbunyi dan jalan utama macet. Anda punya pilihan rute. Mana yang dipilih?',
 '["A. Tetap di jalan utama meski macet karena lebih aman ramai-ramai", "B. Gunakan jalur evakuasi alternatif atau berjalan kaki ke tempat tinggi", "C. Kembali ke rumah dan berlindung di lantai dua", "D. Menunggu kemacetan terurai"]',
 'B', 'Jika jalan macet, gunakan jalur alternatif atau berjalan kaki ke tempat tinggi. Waktu sangat berharga saat evakuasi tsunami.', 10, 1),

(uuid_generate_v4(), 's0000003-0000-0000-0000-000000000003',
 'Anda perlu membawa barang dari rumah. Apa yang PALING penting untuk dibawa?',
 '["A. Televisi dan barang elektronik berharga", "B. Tas siaga bencana yang sudah disiapkan sebelumnya", "C. Semua pakaian dan furnitur penting", "D. Kendaraan dan semua isi garasi"]',
 'B', 'Bawa tas siaga bencana yang sudah disiapkan — berisi dokumen penting, air, obat, dan kebutuhan darurat. Jangan buang waktu mengumpulkan barang lain.', 10, 2),

(uuid_generate_v4(), 's0000003-0000-0000-0000-000000000003',
 'Nenek Anda yang sudah tua tidak bisa berjalan cepat. Apa yang Anda lakukan?',
 '["A. Tinggalkan nenek dan selamatkan diri sendiri lebih dulu", "B. Bantu nenek evakuasi dengan dipapah atau digendong, minta bantuan tetangga", "C. Minta nenek untuk tinggal di lantai dua rumah", "D. Tunggu ambulans datang menjemput"]',
 'B', 'Bantu orang yang membutuhkan, minta bantuan tetangga. Solidaritas sangat penting dalam bencana. Jangan pernah meninggalkan orang yang tidak bisa evakuasi sendiri jika masih memungkinkan untuk membantu.', 10, 3);

-- Pertanyaan Skenario 4: Pasca Tsunami
INSERT INTO simulation_questions (id, skenario_id, pertanyaan, pilihan, jawaban_benar, penjelasan, poin, urutan) VALUES
(uuid_generate_v4(), 's0000004-0000-0000-0000-000000000004',
 'Gelombang sudah surut. Apakah Anda langsung kembali ke rumah?',
 '["A. Ya, langsung kembali karena sudah aman", "B. Tidak, tunggu pengumuman resmi dari BMKG bahwa situasi benar-benar aman", "C. Kembali setengah jalan untuk melihat kondisi rumah dari kejauhan", "D. Suruh orang lain cek dulu, baru Anda kembali"]',
 'B', 'Jangan kembali sebelum ada pernyataan resmi situasi aman. Gelombang susulan bisa datang dan wilayah yang tergenang masih berbahaya.', 10, 1),

(uuid_generate_v4(), 's0000004-0000-0000-0000-000000000004',
 'Anda kehilangan kontak dengan anggota keluarga setelah tsunami. Apa langkah pertama?',
 '["A. Mencari sendiri ke seluruh wilayah terdampak", "B. Laporkan ke posko pengungsian dan BPBD setempat, berikan ciri-ciri fisik", "C. Tunggu mereka menghubungi Anda", "D. Langsung kembali ke lokasi kejadian untuk mencari"]',
 'B', 'Laporkan segera ke posko pengungsian dan BPBD. Mereka memiliki sistem koordinasi pencarian yang lebih efektif dan aman.', 15, 2),

(uuid_generate_v4(), 's0000004-0000-0000-0000-000000000004',
 'Air sumur di rumah Anda terlihat keruh setelah tsunami. Bolehkah digunakan untuk minum?',
 '["A. Boleh, asalkan direbus terlebih dahulu", "B. Tidak, gunakan air dari sumber resmi atau air kemasan yang didistribusikan posko", "C. Boleh, air asin tidak berbahaya jika hanya sedikit", "D. Boleh untuk memasak tapi tidak untuk diminum langsung"]',
 'B', 'Air sumur yang terkontaminasi air laut dan material tsunami dapat mengandung bakteri berbahaya dan kontaminan kimia. Gunakan hanya air dari sumber yang sudah dipastikan aman oleh petugas.', 10, 3);
