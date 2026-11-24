<?php $halaman = basename($_SERVER['PHP_SELF']); ?>
<nav class="navbar">
    <a href="index.php" class="brand">SIAGA <span class="pink">TSUNAMI</span></a>
    <ul class="nav-links">
        <li><a href="index.php" class="<?= $halaman == 'index.php' ? 'active' : '' ?>">Beranda</a></li>
        <li><a href="edukasi.php" class="<?= $halaman == 'edukasi.php' ? 'active' : '' ?>">Edukasi</a></li>
        <li><a href="historis_peta.php" class="<?= $halaman == 'historis_peta.php' ? 'active' : '' ?>">Data & Peta</a></li>
        <li><a href="bmkg.php" class="<?= $halaman == 'bmkg.php' ? 'active' : '' ?>">Zona Rawan</a></li>
        <li><a href="orang_hilang.php" class="btn-nav-pink <?= $halaman == 'orang_hilang.php' ? 'active' : '' ?>">Cari Orang Hilang</a></li>
    </ul>
</nav>