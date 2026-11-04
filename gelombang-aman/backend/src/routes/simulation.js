const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');
const { authenticateAdmin } = require('../middleware/auth');

// GET all scenarios
router.get('/skenario', simulationController.getScenarios);

// GET single scenario
router.get('/skenario/:id', simulationController.getScenarioById);

// POST submit simulation result
router.post('/hasil', simulationController.submitResult);

// Admin: manage scenarios
router.post('/skenario', authenticateAdmin, simulationController.createScenario);
router.put('/skenario/:id', authenticateAdmin, simulationController.updateScenario);
router.delete('/skenario/:id', authenticateAdmin, simulationController.deleteScenario);

module.exports = router;
