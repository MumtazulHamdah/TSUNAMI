const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

// POST login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().isLength({ min: 8 }),
  handleValidationErrors
], authController.login);

// POST logout
router.post('/logout', authenticateAdmin, authController.logout);

// GET profile
router.get('/profile', authenticateAdmin, authController.getProfile);

// PUT change password
router.put('/change-password', authenticateAdmin, [
  body('old_password').notEmpty(),
  body('new_password').isLength({ min: 8 }),
  handleValidationErrors
], authController.changePassword);

module.exports = router;
