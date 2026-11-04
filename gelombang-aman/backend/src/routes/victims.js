const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const victimsController = require('../controllers/victimsController');
const { authenticateAdmin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const upload = require('../middleware/upload');

// GET statistics summary
router.get('/stats', victimsController.getStats);

// GET missing persons list
router.get('/orang-hilang', [
  query('nama').optional().isString().trim(),
  query('lokasi').optional().isString().trim(),
  query('status').optional().isIn(['dalam_pencarian', 'ditemukan', 'teridentifikasi', 'dipertemukan', 'ditutup']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  handleValidationErrors
], victimsController.getMissingPersons);

// GET single missing person
router.get('/orang-hilang/:id', [
  param('id').isUUID(),
  handleValidationErrors
], victimsController.getMissingPersonById);

// POST report missing person (public)
router.post('/orang-hilang', upload.single('foto'), [
  body('nama_korban').notEmpty().isString().trim().isLength({ max: 200 }),
  body('usia').optional().isInt({ min: 0, max: 150 }),
  body('jenis_kelamin').isIn(['laki-laki', 'perempuan', 'tidak_diketahui']),
  body('ciri_fisik').optional().isString().trim().isLength({ max: 1000 }),
  body('lokasi_terakhir').notEmpty().isString().trim().isLength({ max: 500 }),
  body('kejadian_id').optional().isUUID(),
  body('nama_pelapor').notEmpty().isString().trim().isLength({ max: 200 }),
  body('kontak_pelapor').notEmpty().isString().trim().isLength({ max: 200 }),
  body('hubungan_pelapor').optional().isString().trim(),
  handleValidationErrors
], victimsController.reportMissingPerson);

// PATCH update status (admin only)
router.patch('/orang-hilang/:id/status', authenticateAdmin, [
  param('id').isUUID(),
  body('status').isIn(['dalam_pencarian', 'ditemukan', 'teridentifikasi', 'dipertemukan', 'ditutup']),
  body('catatan').optional().isString().trim(),
  handleValidationErrors
], victimsController.updateStatus);

// DELETE report (admin only)
router.delete('/orang-hilang/:id', authenticateAdmin, [
  param('id').isUUID(),
  handleValidationErrors
], victimsController.deleteReport);

module.exports = router;
