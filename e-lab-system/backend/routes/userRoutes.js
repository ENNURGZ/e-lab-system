const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kayıt olma
router.post('/register', async (req, res) => {
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
        console.log('Email kontrolü yapılıyor:', email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email zaten kayıtlı:', email);
            return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
        }

        // Username kontrolü
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            console.log('Username zaten kayıtlı:', username);
            return res.status(400).json({ message: 'Bu kullanıcı adı zaten kayıtlı' });
        }

        // Şifreyi hashleme
        console.log('Şifre hashleniyor');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcı oluşturma
        console.log('Yeni kullanıcı oluşturuluyor');
        const user = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });

        console.log('Kullanıcı kaydediliyor');
        await user.save();
        console.log('Kullanıcı başarıyla kaydedildi:', user._id);
        
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
});

// Giriş yapma
router.post('/login', async (req, res) => {
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
});

module.exports = router;
