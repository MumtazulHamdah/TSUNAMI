<?php
include 'koneksi.php';

if (isset($_POST['submit'])) {
    $nama   = mysqli_real_escape_string($conn, $_POST['nama_lengkap']);
    $usia   = (int) $_POST['usia'];
    $jk     = mysqli_real_escape_string($conn, $_POST['jenis_kelamin']);
    $lokasi = mysqli_real_escape_string($conn, $_POST['lokasi_terakhir']);
    $ciri   = mysqli_real_escape_string($conn, $_POST['ciri_fisik']);
    $kontak = mysqli_real_escape_string($conn, $_POST['kontak_pelapor']);

    mysqli_query($conn, "INSERT INTO orang_hilang (nama_lengkap, usia, jenis_kelamin, lokasi_terakhir, ciri_fisik, kontak_pelapor) VALUES ('$nama', '$usia', '$jk', '$lokasi', '$ciri', '$kontak')");
    header("Location: orang_hilang.php");
    exit;
}

if (isset($_GET['ditemukan'])) {
    $id = (int) $_GET['ditemukan'];
    mysqli_query($conn, "UPDATE orang_hilang SET status='Ditemukan' WHERE id=$id");
    header("Location: orang_hilang.php");
    exit;
}

$keyword = isset($_GET['cari']) ? mysqli_real_escape_string($conn, $_GET['cari']) : '';
$sql = "SELECT * FROM orang_hilang WHERE nama_lengkap LIKE '%$keyword%' OR lokasi_terakhir LIKE '%$keyword%' ORDER BY id DESC";
$hasil = mysqli_query($conn, $sql);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pencarian & Lapor Orang Hilang — SIAGA TSUNAMI</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .btn-aksi-temukan {
            display: inline-block;
            background: #38bdf8;
            color: #18181b;
            border: 1.5px solid #18181b;
            box-shadow: 2px 2px 0px #18181b;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 800;
            text-decoration: none;
            white-space: nowrap;
            transition: 0.15s;
        }
        .btn-aksi-temukan:hover {
            background: #f43f5e;
            color: #ffffff;
            transform: translate(-1px, -1px);
            box-shadow: 3px 3px 0px #18181b;
        }
        .teks-selesai {
            color: #0284c7;
            font-size: 12.5px;
            font-weight: 700;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <?php include 'navbar.php'; ?>

    <div class="container">
        <div class="card">
            <span class="card-badge">Database Pencarian</span>
            <h2>🔍 Pencarian Data Orang Hilang</h2>
            <form method="GET" style="display:flex; gap:10px;">
                <input type="text" name="cari" placeholder="Cari nama korban atau lokasi terakhir..." value="<?= htmlspecialchars($keyword); ?>" style="margin:0;">
                <button type="submit">Cari</button>
                <?php if ($keyword) : ?><a href="orang_hilang.php" style="padding:10px 15px; background:#64748b; color:#fff; text-decoration:none; border-radius:6px; font-weight:700; font-size:14px;">Reset</a><?php endif; ?>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Nama Lengkap</th>
                        <th>Usia / JK</th>
                        <th>Lokasi Terakhir</th>
                        <th>Ciri-ciri Fisik</th>
                        <th>Kontak Pelapor</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($row = mysqli_fetch_assoc($hasil)) : ?>
                    <tr>
                        <td><strong><?= htmlspecialchars($row['nama_lengkap']); ?></strong></td>
                        <td><?= $row['usia']; ?> thn / <?= $row['jenis_kelamin']; ?></td>
                        <td><?= htmlspecialchars($row['lokasi_terakhir']); ?></td>
                        <td><?= htmlspecialchars($row['ciri_fisik']); ?></td>
                        <td><?= htmlspecialchars($row['kontak_pelapor']); ?></td>
                        <td>
                            <span class="<?= $row['status'] == 'Hilang' ? 'badge-hilang' : 'badge-aman'; ?>">
                                <?= $row['status']; ?>
                            </span>
                        </td>
                        <td>
                            <?php if ($row['status'] == 'Hilang') : ?>
                                <a href="?ditemukan=<?= $row['id']; ?>" class="btn-aksi-temukan" onclick="return confirm('Tandai korban sudah ditemukan?')">
                                    ✔ Tandai Ditemukan
                                </a>
                            <?php else : ?>
                                <span class="teks-selesai">✔ Sudah Ditemukan</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>

        <div class="card card-pink">
            <span class="card-badge">Form Pelaporan</span>
            <h2>📝 Buat Laporan Orang Hilang</h2>
            <form method="POST">
                <label>Nama Lengkap Korban</label>
                <input type="text" name="nama_lengkap" required>

                <label>Usia (Tahun)</label>
                <input type="number" name="usia" required>

                <label>Jenis Kelamin</label>
                <select name="jenis_kelamin" required>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>

                <label>Lokasi Terakhir Terlihat</label>
                <input type="text" name="lokasi_terakhir" required>

                <label>Ciri-ciri Fisik & Pakaian Terakhir</label>
                <textarea name="ciri_fisik" rows="3" required></textarea>

                <label>Nomor HP / Kontak Pelapor</label>
                <input type="text" name="kontak_pelapor" required>

                <button type="submit" name="submit">Kirim Laporan</button>
            </form>
        </div>
    </div>

    <footer>&copy; 2026 SIAGA TSUNAMI — Portal Edukasi & Informasi Bencana Tsunami</footer>
</body>
</html>