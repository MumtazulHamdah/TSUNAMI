const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const { authenticateAdmin } = require('../middleware/auth');

// GET GeoJSON for all tsunami hazard zones
router.get('/zona-bahaya', mapController.getHazardZones);

// GET GeoJSON for historical tsunami points
router.get('/kejadian-historis', mapController.getHistoricalPoints);

// GET provinces GeoJSON
router.get('/provinsi', mapController.getProvinces);

// GET area info by coordinates
router.get('/info', mapController.getAreaInfo);

// Admin: update hazard zone
router.put('/zona-bahaya/:id', authenticateAdmin, mapController.updateHazardZone);

module.exports = router;
