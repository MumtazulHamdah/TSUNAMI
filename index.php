<?php
include 'koneksi.php';
$q_total = mysqli_query($conn, "SELECT COUNT(*) AS jml, SUM(korban_meninggal) AS total_korban FROM tsunami_historis WHERE tahun >= 2004");
$stat = mysqli_fetch_assoc($q_total);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>SIAGA TSUNAMI — Beranda Portal Mitigasi Bencana</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .stats-bar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #ffffff;
            border: 2px solid #18181b;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 4px 4px 0px #18181b;
        }
        .stat-card h3 { font-size: 28px; font-weight: 900; color: #f43f5e; margin-bottom: 4px; }
        .stat-card p { font-size: 13.5px; font-weight: 700; color: #18181b; }
        .fitur-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }
        .fitur-card {
            background: #ffffff;
            border: 2px solid #18181b;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 4px 4px 0px #38bdf8;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .fitur-card.pink-shadow { box-shadow: 4px 4px 0px #f43f5e; }
        .fitur-card h3 { font-size: 19px; margin-bottom: 8px; color: #18181b; }
        .fitur-card p { font-size: 14px; color: #3f3f46; margin-bottom: 16px; }
        @media (max-width: 768px) {
            .stats-bar, .fitur-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="container">
        <!-- Hero Beranda dengan Foto -->
        <div class="hero-split">
            <div class="hero-text">
                <span class="tag-pill">Portal Kesiapsiagaan Bencana</span>
                <h1>Pahami Gelombang <span>Tsunami</span>, Selamatkan Nyawa.</h1>
                <p>Pusat informasi terpadu mengenai edukasi mitigasi bencana tsunami, pemetaan riwayat kejadian sejak Tsunami Aceh 2004, zona rawan BMKG, hingga layanan pencarian orang hilang.</p>
                <div class="hero-btns">
                    <a href="edukasi.php" class="btn-hitam">Mulai Belajar & Post-Test</a>
                    <a href="historis_peta.php" class="btn-pink">Lihat Peta Sejak 2004</a>
                </div>
            </div>

            <div class="hero-media">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgT20MR2tpa_60AA4n1WBQ99UXzUtIUruyxT60GsSj3EczTTWjzx0YbQw&s=10" alt="Gelombang Laut Tsunami">
            </div>
        </div>

        <!-- Ringkasan Statistik Cepat -->
        <div class="stats-bar">
            <div class="stat-card">
                <h3><?= $stat['jml']; ?> Kejadian</h3>
                <p>Tercatat Sejak Tsunami Aceh 2004</p>
            </div>
            <div class="stat-card">
                <h3><?= number_format($stat['total_korban']); ?>+</h3>
                <p>Total Korban Meninggal Tercatat</p>
            </div>
            <div class="stat-card">
                <h3>30 Meter</h3>
                <p>Gelombang Tertinggi (Aceh 2004)</p>
            </div>
        </div>

        <!-- Menu Pintasan Utama -->
        <div class="fitur-grid">
            <div class="fitur-card">
                <div>
                    <span class="card-badge">Menu 01</span>
                    <h3>📚 Edukasi Mitigasi & Post-Test</h3>
                    <p>Pelajari definisi, faktor penyebab, dampak positif & negatif, panduan penyelamatan diri, dan uji pemahaman lewat kuis singkat.</p>
                </div>
                <div><a href="edukasi.php" class="btn-hitam" style="display:inline-block;">Buka Edukasi &rarr;</a></div>
            </div>

            <div class="fitur-card pink-shadow">
                <div>
                    <span class="card-badge">Menu 02</span>
                    <h3>🗺️ Peta & Data Historis (Sejak 2004)</h3>
                    <p>Telusuri titik koordinat sebaran tsunami di Indonesia mulai dari Tsunami Aceh 2004 hingga kejadian terbaru melalui peta interaktif.</p>
                </div>
                <div><a href="historis_peta.php" class="btn-pink" style="display:inline-block;">Buka Peta &rarr;</a></div>
            </div>

            <div class="fitur-card pink-shadow">
                <div>
                    <span class="card-badge">Menu 03</span>
                    <h3>📡 Database Zona Rawan BMKG</h3>
                    <p>Kenali wilayah pesisir rawan tsunami, sumber ancaman megathrust/vulkanik, serta estimasi waktu tiba gelombang ke daratan.</p>
                </div>
                <div><a href="bmkg.php" class="btn-pink" style="display:inline-block;">Cek Zona Rawan &rarr;</a></div>
            </div>

            <div class="fitur-card">
                <div>
                    <span class="card-badge">Menu 04</span>
                    <h3>🔍 Pencarian & Lapor Orang Hilang</h3>
                    <p>Cari daftar anggota keluarga yang belum ditemukan pasca bencana atau laporkan informasi orang hilang secara langsung.</p>
                </div>
                <div><a href="orang_hilang.php" class="btn-hitam" style="display:inline-block;">Cari Orang Hilang &rarr;</a></div>
            </div>
        </div>
    </div>

    <footer>&copy; 2026 SIAGA TSUNAMI — Portal Edukasi & Informasi Bencana Tsunami</footer>
</body>
</html>