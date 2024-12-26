const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
const registerUser = async (req, res) => {
    try {
        console.log('Register isteği alındı:', req.body);
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            console.log('Eksik bilgi:', { firstName, lastName, email, password: password ? 'var' : 'yok' });
            return res.status(400).json({ message: 'Tüm alanları doldurun' });
        }

        // Username oluştur
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
        console.log('Oluşturulan username:', username);

        // Email kontrolü
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        // Username kontrolü
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Bu kullanıcı adı zaten kayıtlı' });
        }

        // Şifreyi hashleme
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluşturma
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        
        res.status(201).json({ 
            message: 'Kullanıcı başarıyla oluşturuldu',
            userId: user._id 
        });
    } catch (error) {
        console.error('Kayıt hatası:', error);
        res.status(500).json({ 
            message: 'Sunucu hatası',
            error: error.message 
        });
    }
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bulma
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifre kontrolü
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Geçersiz şifre' });
        }

        // JWT token oluşturma
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Giriş hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

// Kullanıcı bilgilerini getir
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    } catch (error) {
        console.error('Profil getirme hatası:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
