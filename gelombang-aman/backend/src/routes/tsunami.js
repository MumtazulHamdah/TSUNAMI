const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const tsunamiController = require('../controllers/tsunamiController');
const { authenticateAdmin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

// GET all tsunami events with pagination & filter
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('tahun').optional().isInt({ min: 1800, max: 2100 }),
  query('provinsi').optional().isString().trim(),
  query('search').optional().isString().trim(),
  query('sort').optional().isIn(['tanggal', 'magnitudo', 'tinggi_gelombang', 'korban_meninggal']),
  query('order').optional().isIn(['ASC', 'DESC']),
  handleValidationErrors
], tsunamiController.getAll);

// GET tsunami event by ID
router.get('/:id', [
  param('id').isUUID(),
  handleValidationErrors
], tsunamiController.getById);

// POST create tsunami event (admin only)
router.post('/', authenticateAdmin, [
  body('nama_kejadian').notEmpty().isString().trim(),
  body('tanggal').isDate(),
  body('tahun').isInt({ min: 1800, max: 2100 }),
  body('lokasi').notEmpty().isString().trim(),
  body('provinsi').notEmpty().isString().trim(),
  body('kabupaten_kota').optional().isString().trim(),
  body('magnitudo').optional().isFloat({ min: 0, max: 10 }),
  body('tinggi_gelombang').optional().isFloat({ min: 0 }),
  body('latitude').optional().isFloat({ min: -90, max: 90 }),
  body('longitude').optional().isFloat({ min: -180, max: 180 }),
  body('korban_meninggal').optional().isInt({ min: 0 }),
  body('korban_hilang').optional().isInt({ min: 0 }),
  body('korban_luka').optional().isInt({ min: 0 }),
  body('pengungsi').optional().isInt({ min: 0 }),
  body('sumber_data').notEmpty().isString(),
  handleValidationErrors
], tsunamiController.create);

// PUT update tsunami event (admin only)
router.put('/:id', authenticateAdmin, [
  param('id').isUUID(),
  handleValidationErrors
], tsunamiController.update);

// DELETE tsunami event (admin only)
router.delete('/:id', authenticateAdmin, [
  param('id').isUUID(),
  handleValidationErrors
], tsunamiController.remove);

// POST import CSV (admin only)
router.post('/import/csv', authenticateAdmin, tsunamiController.importCSV);

module.exports = router;
