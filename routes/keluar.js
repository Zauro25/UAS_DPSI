// routes/keluar.js
const express = require('express');
const router = express.Router();
const { pengeluaran } = require('../models/index'); // Impor model pengeluaran
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan pengeluaran baru
router.post('/', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const { tanggal, totalPengeluaran, IdPerusahaan } = req.body;
    const newPengeluaran = await pengeluaran.create({ tanggal, totalPengeluaran, IdPerusahaan });
    res.status(201).json(newPengeluaran);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua pengeluaran
router.get('/', authenticate, authorize, async (req, res, next) => {
  try {
    const keluar = await pengeluaran.findAll();
    res.json(keluar);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan pengeluaran berdasarkan ID
router.get('/:id', authenticate, authorize, async (req, res, next) => {
  try {
    const pengeluaran = await pengeluaran.findByPk(req.params.id);
    if (pengeluaran) {
      res.json(pengeluaran);
    } else {
      res.status(404).json({ message: 'Ape niiiii' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui pengeluaran berdasarkan ID
router.put('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const { totalPengeluaran } = req.body;
    const pengeluaranuhuyy = await pengeluaran.findByPk(req.params.id);
    if (pengeluaranuhuyy) {
        pengeluaranuhuyy.totalPengeluaran = totalPengeluaran;
      await pengeluaranuhuyy.save();
      res.json(pengeluaranuhuyy);
    } else {
      res.status(404).json({ message: 'Ape niii?' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus pengeluaran berdasarkan ID
router.delete('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const pengeluaran = await pengeluaran.findByPk(req.params.id);
    if (pengeluaran) {
      await pengeluaran.destroy();
      res.json({ message: 'Terhapus' });
    } else {
      res.status(404).json({ message: 'ape niii' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
