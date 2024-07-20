const express = require('express');
const router = express.Router();
const { finansial } = require('../models/index'); // Impor model finansial
const { authenticate, authorize } = require('../middleware/auth');

// Endpoint untuk menambahkan kategori baru
router.post('/', authenticate, authorize(['pemilik']), async (req, res, next) => {
 try {
 const { Tanggal, TotalPendapatan, TotalPengeluaran } = req.body;
 const newfinansial = await finansial.create({ Tanggal,
TotalPendapatan, TotalPengeluaran });
 res.status(201).json(newfinansial);
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menampilkan semua kategori
router.get('/', authenticate, authorize, async (req, res, next) => {
 try {
 const laporan = await finansial.findAll();
 res.json(laporan);
 } catch (err) {
 next(err);
 }
});
// Endpoint untuk menampilkan kategori berdasarkan ID
router.get('/:id', authenticate, authorize, async (req, res, next) => {
 try {
 const finansial = await finansial.findByPk(req.params.id);
 if (finansial) {
 res.json(finansial);
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
 const { Tanggal, TotalPendapatan, TotalPengeluaran } = req.body;
 const finansial = await finansial.findByPk(req.params.id);
 if (finansial) {
 finansial.Tanggal = Tanggal;
 finansial.TotalPendapatan = TotalPendapatan;
 finansial.TotalPengeluaran = TotalPengeluaran;
 await finansial.save();
 res.json(finansial);
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
 const finansial = await finansial.findByPk(req.params.id);
 if (finansial) {
 await finansial.destroy();
 res.json({ message: 'Terhapus' });
 } else {
 res.status(404).json({ message: 'ape niii' });
 }
 } catch (err) {
 next(err);
 }
});
module.exports = router;
