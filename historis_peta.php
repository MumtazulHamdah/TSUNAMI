<?php
include 'koneksi.php';
$query = mysqli_query($conn, "SELECT * FROM tsunami_historis WHERE tahun >= 2004 ORDER BY tanggal ASC");
$data_peta = [];
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data & Peta Tsunami Sejak Aceh 2004</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <style>
        #map {
            height: 440px;
            width: 100%;
            border-radius: 10px;
            margin-top: 12px;
            border: 2px solid #18181b;
            z-index: 1;
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="container">
        <div class="card">
            <span class="card-badge">Peta Interaktif Leaflet</span>
            <h2>🗺️ Peta Sebaran Tsunami di Indonesia (Sejak Aceh 2004)</h2>
            <p>Klik penanda lokasi pada peta untuk melihat detail tanggal kejadian, magnitudo gempa, tinggi gelombang, dan jumlah korban.</p>
            <div id="map"></div>
        </div>

        <div class="card card-pink">
            <span class="card-badge">Arsip Kejadian Bencana</span>
            <h2>📊 Data Historis Tsunami (Mulai Tsunami Aceh 2004)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nama Kejadian</th>
                        <th>Provinsi</th>
                        <th>Magnitudo</th>
                        <th>Tinggi Gelombang</th>
                        <th>Korban Meninggal</th>
                        <th>Penyebab</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = mysqli_fetch_assoc($query)) : 
                        $data_peta[] = $row;
                    ?>
                    <tr>
                        <td><?= $row['tanggal']; ?></td>
                        <td><strong><?= $row['nama_kejadian']; ?></strong></td>
                        <td><?= $row['provinsi']; ?></td>
                        <td><?= $row['magnitudo'] ? $row['magnitudo'] . ' Mw' : 'Non-Tektonik'; ?></td>
                        <td><?= $row['tinggi_gelombang']; ?> meter</td>
                        <td><?= number_format($row['korban_meninggal']); ?> jiwa</td>
                        <td><?= $row['penyebab']; ?></td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script>
        var map = L.map('map').setView([-2.5, 115.0], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var kejadian = <?= json_encode($data_peta); ?>;

        kejadian.forEach(function(item) {
            if (item.latitude && item.longitude) {
                var mag = item.magnitudo ? item.magnitudo + ' Mw' : 'Non-Tektonik';
                L.marker([parseFloat(item.latitude), parseFloat(item.longitude)])
                 .addTo(map)
                 .bindPopup(
                     "<div style='font-size:13px; line-height:1.5;'>" +
                     "<strong style='color:#f43f5e; font-size:14px;'>" + item.nama_kejadian + "</strong><br>" +
                     "<b>Tanggal:</b> " + item.tanggal + "<br>" +
                     "<b>Magnitudo:</b> " + mag + "<br>" +
                     "<b>Tinggi Gelombang:</b> " + item.tinggi_gelombang + " meter<br>" +
                     "<b>Korban Meninggal:</b> " + parseInt(item.korban_meninggal).toLocaleString('id-ID') + " jiwa" +
                     "</div>"
                 );
            }
        });
    </script>

    <footer>&copy; 2026 SIAGA TSUNAMI — Portal Edukasi & Informasi Bencana Tsunami</footer>
</body>
</html>