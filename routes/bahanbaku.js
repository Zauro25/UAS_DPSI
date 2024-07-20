const express = require('express');
const router = express.Router();
const { infor } = require('../models/index');;
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { nama, jumlah, IdPerusahaan } = req.body;
    const newinfor = await infor.create({ nama, jumlah, IdPerusahaan });
    res.status(201).json(newinfor);
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticate, async (req, res, next) => {
  try {
    const bahanbaku = await infor.findAll();
    res.json(bahanbaku);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const infor = await infor.findByPk(req.params.id);
    if (infor) {
      res.json(infor);
    } else {
      res.status(404).json({ message: 'Tidak ditemukan' });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { nama, jumlah, IdPerusahaan } = req.body;
    const infor = await infor.findByPk(req.params.id);
    if (infor) {
      infor.nama = nama;
      infor.jumlah = jumlah;
      infor.IdPerusahaan = IdPerusahaan;
      await infor.save();
      res.json(infor);
    } else {
      res.status(404).json({ message: 'Tidak ditemukan' });
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, authorize(['karyawan']), async (req, res, next) => {
  try {
    const infor = await infor.findByPk(req.params.id);
    if (infor) {
      await infor.destroy();
      res.json({ message: 'Terhapus' });
    } else {
      res.status(404).json({ message: 'Tidak ditemukan' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
