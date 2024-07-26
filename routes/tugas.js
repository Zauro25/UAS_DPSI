// routes/tugas.js
const express = require('express');
const router = express.Router();
const { penugasan } = require('../models/index'); // Impor model penugasan
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan penugasan baru
router.post('/', authenticate, authorize(['pemilik']), async (req, res, next) => {   //hanya user dengan role pemilik yang dapat menambah tugas baru
  try {
    const { daftarTugas, idKaryawan } = req.body;
    const newPenugasan = await penugasan.create({ daftarTugas, idKaryawan });
    res.status(201).json(newPenugasan);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan semua penugasan
router.get('/', authenticate, authorize, async (req, res, next) => {
  try {
    const tugas = await penugasan.findAll();
    res.json(tugas);
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menampilkan penugasan berdasarkan ID
router.get('/:id', authenticate, authorize, async (req, res, next) => {
  try {
    const penugasan = await penugasan.findByPk(req.params.id);
    if (penugasan) {
      res.json(penugasan);
    } else {
      res.status(404).json({ message: 'Ape niiiii' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk memperbarui penugasan berdasarkan ID
router.put('/:id', authenticate, authorize(['karyawan']), async (req, res, next) => { //hanya karyawan yang dapat update kemajuan tugasnya
  try {
    const { laporanKemajuan } = req.body;
    const penugasanuhuyy = await penugasan.findByPk(req.params.id);
    if (penugasanuhuyy) {
      penugasanuhuyy.laporanKemajuan = laporanKemajuan;
      await penugasanuhuyy.save();
      res.json(penugasanuhuyy);
    } else {
      res.status(404).json({ message: 'Ape niii?' });
    }
  } catch (err) {
    next(err);
  }
});

// Endpoint untuk menghapus penugasan berdasarkan ID
router.delete('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
  try {
    const penugasan = await penugasan.findByPk(req.params.id);
    if (penugasan) {
      await penugasan.destroy();
      res.json({ message: 'Terhapus' });
    } else {
      res.status(404).json({ message: 'ape niii' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
