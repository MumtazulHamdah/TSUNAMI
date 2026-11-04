const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// GET overview statistics
router.get('/overview', statsController.getOverview);

// GET tsunami events per year
router.get('/per-tahun', statsController.getPerYear);

// GET tsunami events per province
router.get('/per-provinsi', statsController.getPerProvince);

// GET victims statistics
router.get('/korban', statsController.getVictimsStats);

module.exports = router;
