const express = require('express');
const router = express.Router();
const monitoringController = require('../controllers/monitoringController');

// GET latest earthquake from BMKG (proxy)
router.get('/gempa-terkini', monitoringController.getLatestEarthquake);

// GET list of recent earthquakes from BMKG
router.get('/gempa-list', monitoringController.getEarthquakeList);

// GET tsunami warning status
router.get('/peringatan', monitoringController.getTsunamiWarning);

module.exports = router;
