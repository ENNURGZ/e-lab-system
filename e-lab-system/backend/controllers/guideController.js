const Guide = require('../models/Guide');

// Yeni kılavuz oluşturma
const createGuide = async (req, res) => {
    try {
        const { guideName, tests } = req.body;
        const createdBy = req.user.id; // JWT'den gelen kullanıcı ID'si

        console.log('Gelen veriler:', { guideName, tests, createdBy });

        // Kılavuz adının benzersiz olup olmadığını kontrol et
        const existingGuide = await Guide.findOne({ guideName });
        if (existingGuide) {
            return res.status(400).json({ message: 'Bu isimde bir kılavuz zaten mevcut' });
        }

        // Yeni kılavuzu oluştur
        const guide = new Guide({
            guideName,
            tests,
            createdBy
        });

        await guide.save();
        console.log('Kılavuz kaydedildi:', guide);
        res.status(201).json(guide);
    } catch (error) {
        console.error('Kılavuz oluşturma hatası:', error);
        res.status(500).json({ message: 'Kılavuz oluşturulurken bir hata oluştu' });
    }
};

// Tüm kılavuzları getirme
const getAllGuides = async (req, res) => {
    try {
        const guides = await Guide.find()
            .populate('createdBy', 'firstName lastName')
            .select('-tests.ageRanges'); // Performans için yaş aralıklarını hariç tut
        res.json(guides);
    } catch (error) {
        console.error('Kılavuz listesi getirme hatası:', error);
        res.status(500).json({ message: 'Kılavuzlar getirilirken bir hata oluştu' });
    }
};

// Belirli bir kılavuzu getirme
const getGuideById = async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id)
            .populate('createdBy', 'firstName lastName');
        
        if (!guide) {
            return res.status(404).json({ message: 'Kılavuz bulunamadı' });
        }

        res.json(guide);
    } catch (error) {
        console.error('Kılavuz getirme hatası:', error);
        res.status(500).json({ message: 'Kılavuz getirilirken bir hata oluştu' });
    }
};

// Kılavuz güncelleme
const updateGuide = async (req, res) => {
    try {
        const { guideName, tests } = req.body;
        const guideId = req.params.id;

        // Kılavuzun var olup olmadığını kontrol et
        const guide = await Guide.findById(guideId);
        if (!guide) {
            return res.status(404).json({ message: 'Kılavuz bulunamadı' });
        }

        // Kullanıcının kılavuzun sahibi olup olmadığını kontrol et
        if (guide.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Bu kılavuzu güncelleme yetkiniz yok' });
        }

        // Yeni isim verilmişse ve başka bir kılavuz bu ismi kullanıyorsa hata ver
        if (guideName && guideName !== guide.guideName) {
            const existingGuide = await Guide.findOne({ guideName });
            if (existingGuide) {
                return res.status(400).json({ message: 'Bu isimde bir kılavuz zaten mevcut' });
            }
        }

        // Kılavuzu güncelle
        guide.guideName = guideName || guide.guideName;
        guide.tests = tests || guide.tests;
        
        await guide.save();
        res.json(guide);
    } catch (error) {
        console.error('Kılavuz güncelleme hatası:', error);
        res.status(500).json({ message: 'Kılavuz güncellenirken bir hata oluştu' });
    }
};

// Kılavuz silme
const deleteGuide = async (req, res) => {
    try {
        const guide = await Guide.findById(req.params.id);
        
        if (!guide) {
            return res.status(404).json({ message: 'Kılavuz bulunamadı' });
        }

        // Kullanıcının kılavuzun sahibi olup olmadığını kontrol et
        if (guide.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Bu kılavuzu silme yetkiniz yok' });
        }

        await guide.remove();
        res.json({ message: 'Kılavuz başarıyla silindi' });
    } catch (error) {
        console.error('Kılavuz silme hatası:', error);
        res.status(500).json({ message: 'Kılavuz silinirken bir hata oluştu' });
    }
};

// Tüm test isimlerini getir
const getAllTestNames = async (req, res) => {
    try {
        const guides = await Guide.find({}, 'tests.testName');
        
        // Tüm test isimlerini düz bir diziye çevir ve tekrar edenleri kaldır
        const testNames = [...new Set(
            guides.flatMap(guide => 
                guide.tests.map(test => test.testName)
            )
        )].sort();

        res.json(testNames);
    } catch (error) {
        console.error('Test isimleri getirme hatası:', error);
        res.status(500).json({ message: 'Test isimleri alınırken bir hata oluştu' });
    }
};

module.exports = {
    createGuide,
    getAllGuides,
    getGuideById,
    updateGuide,
    deleteGuide,
    getAllTestNames
};
