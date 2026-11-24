<?php
include 'koneksi.php';
$query_kuis = mysqli_query($conn, "SELECT * FROM kuis ORDER BY id ASC LIMIT 3");

$daftar_kuis = [];
while ($k = mysqli_fetch_assoc($query_kuis)) {
    $daftar_kuis[] = $k;
}

$sudah_submit = isset($_POST['cek_kuis']);
$skor = 0;
$total_soal = count($daftar_kuis);

if ($sudah_submit) {
    foreach ($daftar_kuis as $soal) {
        $id_soal = $soal['id'];
        $jawaban_user = $_POST['jawaban'][$id_soal] ?? '';
        if ($jawaban_user === $soal['jawaban_benar']) {
            $skor++;
        }
    }
    $nilai_akhir = round(($skor / $total_soal) * 100);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edukasi & Post-Test — SIAGA TSUNAMI</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="container">
        <!-- Baris 1 Materi: Definisi & Penyebab -->
        <div class="bento-grid">
            <div class="card">
                <span class="card-badge">01. Definisi</span>
                <h2>🌊 Apa Itu Tsunami?</h2>
                <p><strong>Tsunami</strong> berasal dari bahasa Jepang: <em>tsu</em> (pelabuhan) dan <em>nami</em> (gelombang). Secara ilmiah, tsunami adalah rangkaian gelombang laut raksasa akibat gangguan tiba-tiba pada dasar samudera.</p>
                <ul>
                    <li><strong>Kecepatan Ekstrem:</strong> Melaju hingga 800 km/jam di laut dalam (setara pesawat jet).</li>
                    <li><strong>Gelombang Beruntun:</strong> Terdiri dari beberapa gelombang; gelombang pertama belum tentu yang paling besar.</li>
                    <li><strong>Efek Shoaling:</strong> Melambat saat mendekati pantai dangkal, namun tingginya melonjak drastis.</li>
                </ul>
            </div>

            <div class="card card-pink">
                <span class="card-badge">02. Faktor Pemicu</span>
                <h2>🌋 Penyebab Terjadinya Tsunami</h2>
                <p>Tidak semua gempa di laut memicu tsunami. Berikut tiga penyebab utama terjadinya gelombang tsunami:</p>
                <ul>
                    <li><strong>Gempa Bumi Tektonik (~80%):</strong> Gempa dangkal (&lt; 70 km) berkekuatan M &ge; 7.0 dengan patahan vertikal (sesar naik/turun) di dasar laut.</li>
                    <li><strong>Erupsi Gunung Api Laut:</strong> Letusan atau runtuhnya badan gunung berapi ke laut (contoh: Tsunami Selat Sunda 2018).</li>
                    <li><strong>Longsoran Bawah Laut:</strong> Runtuhan sedimen dasar laut dalam volume besar akibat guncangan atau ketidakstabilan lereng.</li>
                </ul>
            </div>
        </div>

        <!-- Baris 2 Materi: Dampak Positif & Negatif -->
        <div class="card card-hitam">
            <span class="card-badge">03. Analisis Dampak</span>
            <h2>⚖️ Dampak Negatif & Positif Bencana Tsunami</h2>
            <p>Selain menimbulkan kerusakan besar pada saat kejadian, peristiwa tsunami juga membawa perubahan dan pembelajaran jangka panjang bagi manusia.</p>
            
            <div class="dampak-grid">
                <div class="box-negatif">
                    <h3>❌ Dampak Negatif</h3>
                    <ul>
                        <li><strong>Kemanusiaan:</strong> Korban jiwa, orang hilang, luka berat, pengungsian massal, dan trauma psikologis.</li>
                        <li><strong>Infrastruktur & Ekonomi:</strong> Rusaknya permukiman, pelabuhan, jalan, jembatan, serta lumpuhnya ekonomi pesisir.</li>
                        <li><strong>Lingkungan:</strong> Erosi garis pantai, rusaknya terumbu karang, dan pencemaran sumur warga oleh air asin.</li>
                    </ul>
                </div>

                <div class="box-positif">
                    <h3>✅ Dampak Positif (Pembelajaran & Kemajuan)</h3>
                    <ul>
                        <li><strong>Modernisasi Peringatan Dini:</strong> Mendorong lahirnya sistem deteksi dini (InaTEWS BMKG) yang jauh lebih cepat dan akurat.</li>
                        <li><strong>Tata Ruang Pesisir Aman:</strong> Mendorong pembangunan sabuk hijau (hutan mangrove), jalur evakuasi resmi, dan bangunan tahan gempa.</li>
                        <li><strong>Kesadaran & Riset Kebumian:</strong> Meningkatkan budaya siaga bencana di sekolah/masyarakat serta kemajuan penelitian kelautan.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Baris 3 Materi: Edukasi Mitigasi 3 Tahap -->
        <div class="card">
            <span class="card-badge">04. Panduan Keselamatan</span>
            <h2>🛡️ Langkah Edukasi Mitigasi Tsunami</h2>
            <div class="mitigasi-grid">
                <div class="step-box">
                    <h3>🔵 Sebelum Tsunami</h3>
                    <ul>
                        <li>Kenali jalur evakuasi dan titik kumpul dataran tinggi di sekitar pantai.</li>
                        <li>Siapkan <strong>Tas Siaga Bencana</strong> (dokumen penting, air minum, P3K, senter, peluit).</li>
                    </ul>
                </div>
                <div class="step-box">
                    <h3>🔴 Saat Tsunami</h3>
                    <ul>
                        <li>Jika gempa kuat (&gt;20 detik) atau air laut surut mendadak, <strong>segera lari ke tempat tinggi</strong> tanpa menunggu sirine.</li>
                        <li>Jangan turun sebelum ada pengumuman resmi aman dari BMKG/BPBD.</li>
                    </ul>
                </div>
                <div class="step-box">
                    <h3>🟢 Setelah Tsunami</h3>
                    <ul>
                        <li>Hindari genangan air dan kabel listrik yang putus.</li>
                        <li>Gunakan air bersih dari posko resmi dan laporkan keluarga hilang ke posko/BPBD.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Bagian Kuis Post-Test Ringkas (3 Soal) -->
        <div class="card kuis-box" id="post-test">
            <span class="card-badge">05. Evaluasi Pemahaman</span>
            <h2>⚡ Post-Test Singkat (3 Soal)</h2>
            <p style="margin-bottom: 14px; font-size: 14px;">Uji pemahamanmu setelah membaca materi mitigasi di atas.</p>

            <?php if ($sudah_submit) : ?>
                <div class="skor-banner">
                    <strong>🎉 Skor Kamu: <?= $nilai_akhir; ?> / 100</strong> (Benar <?= $skor; ?> dari <?= $total_soal; ?> soal)
                </div>
            <?php endif; ?>

            <form method="POST" action="edukasi.php#post-test">
                <?php foreach ($daftar_kuis as $index => $soal) : 
                    $id_s = $soal['id'];
                    $pilihan_user = $_POST['jawaban'][$id_s] ?? '';
                ?>
                    <div class="soal-item">
                        <p class="tanya"><?= ($index + 1) . ". " . htmlspecialchars($soal['pertanyaan']); ?></p>
                        
                        <div class="opsi-grid">
                            <label class="opsi-label">
                                <input type="radio" name="jawaban[<?= $id_s; ?>]" value="A" <?= $pilihan_user == 'A' ? 'checked' : ''; ?> required> A. <?= htmlspecialchars($soal['opsi_a']); ?>
                            </label>
                            <label class="opsi-label">
                                <input type="radio" name="jawaban[<?= $id_s; ?>]" value="B" <?= $pilihan_user == 'B' ? 'checked' : ''; ?>> B. <?= htmlspecialchars($soal['opsi_b']); ?>
                            </label>
                            <label class="opsi-label">
                                <input type="radio" name="jawaban[<?= $id_s; ?>]" value="C" <?= $pilihan_user == 'C' ? 'checked' : ''; ?>> C. <?= htmlspecialchars($soal['opsi_c']); ?>
                            </label>
                            <label class="opsi-label">
                                <input type="radio" name="jawaban[<?= $id_s; ?>]" value="D" <?= $pilihan_user == 'D' ? 'checked' : ''; ?>> D. <?= htmlspecialchars($soal['opsi_d']); ?>
                            </label>
                        </div>

                        <?php if ($sudah_submit) : 
                            $is_benar = ($pilihan_user === $soal['jawaban_benar']);
                        ?>
                            <div class="pembahasan-box <?= $is_benar ? 'benar' : 'salah'; ?>">
                                <strong><?= $is_benar ? '✅ Benar!' : '❌ Salah (Jawaban: ' . $soal['jawaban_benar'] . ')'; ?></strong> — <?= htmlspecialchars($soal['pembahasan']); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>

                <button type="submit" name="cek_kuis">Cek Nilai</button>
                <?php if ($sudah_submit) : ?>
                    <a href="edukasi.php#post-test" style="margin-left:12px; font-size:14px; color:#f43f5e; font-weight:bold; text-decoration:none;">↻ Ulangi</a>
                <?php endif; ?>
            </form>
        </div>
    </div>

    <footer>&copy; 2026 SIAGA TSUNAMI — Portal Edukasi & Informasi Bencana Tsunami</footer>
</body>
</html>