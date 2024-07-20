// routes/jual.js
const express = require('express');
const router = express.Router();
const { penjualan } = require('../models/index'); // Impor model penjualan
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan penjualan baru
router.post('/', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const { totalPenjualan, IdPerusahaan } = req.body;
    const newPenjualan = await penjualan.create({ totalPenjualan, IdPerusahaan });
    res.status(201).json(newPenjualan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua penjualan
router.get('/', authenticate, authorize, async (req, res, next) => {
  try {
    const jual = await penjualan.findAll();
    res.json(jual);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan penjualan berdasarkan ID
router.get('/:id', authenticate, authorize, async (req, res, next) => {
  try {
    const penjualan = await penjualan.findByPk(req.params.id);
    if (penjualan) {
      res.json(penjualan);
    } else {
      res.status(404).json({ message: 'Ape niiiii' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui penjualan berdasarkan ID
router.put('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const { totalPenjualan } = req.body;
    const penjualanuhuyy = await penjualan.findByPk(req.params.id);
    if (penjualanuhuyy) {
      penjualanuhuyy.totalPenjualan = totalPenjualan;
      await penjualanuhuyy.save();
      res.json(penjualanuhuyy);
    } else {
      res.status(404).json({ message: 'Ape niii?' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus penjualan berdasarkan ID
router.delete('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const penjualan = await penjualan.findByPk(req.params.id);
    if (penjualan) {
      await penjualan.destroy();
      res.json({ message: 'Terhapus' });
    } else {
      res.status(404).json({ message: 'ape niii' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
