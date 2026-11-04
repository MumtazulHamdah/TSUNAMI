const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// All admin routes require authentication
router.use(authenticateAdmin);

// GET admin dashboard summary
router.get('/dashboard', adminController.getDashboard);

// GET activity log
router.get('/aktivitas', adminController.getActivityLog);

// GET pending missing person reports
router.get('/laporan-pending', adminController.getPendingReports);

// POST verify/reject missing person report
router.patch('/laporan/:id/verifikasi', adminController.verifyReport);

module.exports = router;
