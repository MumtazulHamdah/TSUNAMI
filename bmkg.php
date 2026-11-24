<?php
include 'koneksi.php';
$query = mysqli_query($conn, "SELECT * FROM zona_rawan_bmkg ORDER BY id ASC");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Database Zona Rawan Tsunami - Referensi BMKG</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="container">
        <div class="card">
            <span class="card-badge">Database Referensi BMKG</span>
            <h2>📡 Database Wilayah & Kondisi Rawan Tsunami di Indonesia</h2>
            <p>Data kondisi geofisika dan parameter potensi tsunami berdasarkan pemetaan zona subduksi/megathrust BMKG untuk mengenali wilayah rawan.</p>

            <table>
                <thead>
                    <tr>
                        <th>Wilayah Pesisir</th>
                        <th>Provinsi</th>
                        <th>Sumber Ancaman</th>
                        <th>Parameter Kondisi Rawan</th>
                        <th>Estimasi Waktu Tiba</th>
                        <th>Tingkat Kerawanan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = mysqli_fetch_assoc($query)) : ?>
                    <tr>
                        <td><strong><?= htmlspecialchars($row['wilayah']); ?></strong></td>
                        <td><?= htmlspecialchars($row['provinsi']); ?></td>
                        <td><?= htmlspecialchars($row['sumber_ancaman']); ?></td>
                        <td><?= htmlspecialchars($row['parameter_gempa']); ?></td>
                        <td><?= htmlspecialchars($row['estimasi_tiba']); ?></td>
                        <td>
                            <span class="<?= $row['tingkat_kerawanan'] == 'Sangat Tinggi' ? 'badge-bahaya' : 'badge-aman'; ?>">
                                <?= $row['tingkat_kerawanan']; ?>
                            </span>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <footer>&copy; 2026 SIAGA.TSUNAMI — Portal Edukasi & Informasi Bencana Tsunami</footer>
</body>
</html>