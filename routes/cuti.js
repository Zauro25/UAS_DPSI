const express = require('express');
const router = express.Router();
const { cutikehadiran } = require('../models/index'); // Impor model cuti
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan kategori baru
router.post('/', authenticate, authorize(['pemilik']), async (req, res, next) => {
 try {
 const { idKaryawan, statusCuti, hadir, tidakHadir } = req.body;
 const newcutikehadiran = await cutikehadiran.create({ idKaryawan, statusCuti, hadir, tidakHadir });
 res.status(201).json(newcutikehadiran);
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menampilkan semua kategori
router.get('/', authenticate, authorize, async (req, res, next) => {
 try {
 const liburuhuyy = await cutikehadiran.findAll();
 res.json(liburuhuyy);
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menampilkan kategori berdasarkan ID
router.get('/:id', authenticate, authorize, async (req, res, next) => {
 try {
 const cutikehadiran = await cutikehadiran.findByPk(req.params.id);
 if (cutikehadiran) {
 res.json(cutikehadiran);
 } else {
 res.status(404).json({ message: 'Ape niiiii' });
 }
 } catch (err) {
 next(err);
 }
});
30
// Endpoint untuk memperbarui kategori berdasarkan ID
router.put('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
 try {
 const { idKaryawan, statusCuti, hadir, tidakHadir } = req.body;
 const cutikehadiranuhuyy = await cutikehadiran.findByPk(req.params.id);
 if (cutikehadiranuhuyy) {
 cutikehadiranuhuyy.idKaryawan = idKaryawan;
 cutikehadiranuhuyy.statusCuti = statusCuti;
 cutikehadiranuhuyy.hadir = hadir;
 cutikehadiranuhuyy.tidakHadir = tidakHadir;
 await cutikehadiranuhuyy.save();
 res.json(cutikehadiranuhuyy);
 } else {
 res.status(404).json({ message: 'Ape niii?' });
 }
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menghapus kategori berdasarkan ID
router.delete('/:id', authenticate, authorize(['pemilik']), async (req, res, next) => {
 try {
 const cutikehadiran = await cutikehadiran.findByPk(req.params.id);
 if (cutikehadiran) {
 await cutikehadiran.destroy();
 res.json({ message: 'Terhapus' });
 } else {
 res.status(404).json({ message: 'ape niii' });
 }
 } catch (err) {
 next(err);
 }
});
module.exports = router;
