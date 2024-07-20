var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bahanbakuRouter = require('./routes/bahanbaku');
var laporanRouter = require('./routes/laporan');
var cutiRouter = require('./routes/cuti');
var authRouter = require('./routes/auth');
var tugasRouter =require('./routes/tugas');
var jualRouter = require('./routes/jual');
var sequelize = require('./models/index');
var finansial = require('./models/finansial');
var penjualan = require('./models/penjualan');
var pengeluaran = require('./models/pengeluaran');
var infor = require('./models/infor');
var cutikehadiran = require('./models/cutikehadiran');
var penugasan = require('./models/penugasan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bahanbaku', bahanbakuRouter);
app.use('/laporan', laporanRouter);
app.use('/auth', authRouter);
app.use('/cuti', cutiRouter);
app.use('/tugas', tugasRouter);
app.use('/jual', jualRouter);

sequelize.sync()
    .then(() => {
      console.log('Database tersinkron');
    })
    .catch(err => {
      console.error('gabisa kesinkron: ', err);
    });

module.exports = app;
