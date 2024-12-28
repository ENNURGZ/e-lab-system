const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  createTest,
  getTestsByTcNo,
  getAllTests
} = require('../controllers/testController');

// Test rotaları
router.post('/', protect, createTest);
router.get('/tc/:tcNo', protect, getTestsByTcNo);
router.get('/', protect, getAllTests);

module.exports = router;
