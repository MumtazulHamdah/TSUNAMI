const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const educationController = require('../controllers/educationController');
const { authenticateAdmin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

// GET all articles
router.get('/artikel', educationController.getArticles);

// GET single article
router.get('/artikel/:id', [
  param('id').isUUID(),
  handleValidationErrors
], educationController.getArticleById);

// GET article by slug
router.get('/artikel/slug/:slug', educationController.getArticleBySlug);

// POST create article (admin)
router.post('/artikel', authenticateAdmin, [
  body('judul').notEmpty().isString().trim(),
  body('slug').notEmpty().isSlug(),
  body('kategori').isIn(['pengertian', 'proses', 'penyebab', 'tanda', 'dampak', 'mitigasi', 'checklist']),
  body('konten').notEmpty().isString(),
  body('ringkasan').optional().isString().trim(),
  handleValidationErrors
], educationController.createArticle);

// PUT update article (admin)
router.put('/artikel/:id', authenticateAdmin, [
  param('id').isUUID(),
  handleValidationErrors
], educationController.updateArticle);

// DELETE article (admin)
router.delete('/artikel/:id', authenticateAdmin, [
  param('id').isUUID(),
  handleValidationErrors
], educationController.deleteArticle);

module.exports = router;
