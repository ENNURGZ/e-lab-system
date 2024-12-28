const express = require('express');
const router = express.Router();
const { 
    createGuide, 
    getAllGuides, 
    getGuideById, 
    updateGuide, 
    deleteGuide,
    getAllTestNames 
} = require('../controllers/guideController');
const auth = require('../middleware/auth');

// Tüm rotaları auth middleware'i ile koru
router.use(auth);

// Test isimlerini getir
router.get('/test-names', getAllTestNames);

// Kılavuz oluşturma
router.post('/', createGuide);

// Tüm kılavuzları getirme
router.get('/', getAllGuides);

// Belirli bir kılavuzu getirme
router.get('/:id', getGuideById);

// Kılavuz güncelleme
router.put('/:id', updateGuide);

// Kılavuz silme
router.delete('/:id', deleteGuide);

module.exports = router;
