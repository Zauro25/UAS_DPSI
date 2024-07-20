// routes/auth.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/index'); // Import User dari models/index.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, authorize } = require('../middleware/auth');

// Rute pendaftaran
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'Pendaftaran berhasil' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan saat pendaftaran' });
  }
});

// Rute login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Username tidak valid' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password tidak valid' });
    }
    const token = jwt.sign({ username: user.username, role: user.role }, 'tokennya_tuan', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Error saat login:', err);
    res.status(500).json({ message: 'Terjadi kesalahan saat login' });
  }
});

module.exports = router;
