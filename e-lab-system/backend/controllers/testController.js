const Test = require('../models/Test');

// Yeni test kaydı oluştur
exports.createTest = async (req, res) => {
  try {
    const testData = req.body;
    const test = new Test(testData);
    await test.save();
    res.status(201).json({ success: true, data: test });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// TC numarasına göre test sonuçlarını getir
exports.getTestsByTcNo = async (req, res) => {
  try {
    const { tcNo } = req.params;
    const tests = await Test.find({ tcNo }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Tüm test sonuçlarını getir
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tests });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
