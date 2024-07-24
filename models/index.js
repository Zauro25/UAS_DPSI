// models/index.js
const { Sequelize } = require('sequelize');

// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize('projectDPSI', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const pool = mysql.createPool({
  host: proccess.env.HOST,
  user: proccess.env.USERNAME,
  password: proccess.env.PASSWORD,
  database: proccess.env.DDMANE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit:0
})

// Definisikan model
const finansial = require('./finansial')(sequelize, Sequelize.DataTypes);
const infor = require('./infor')(sequelize, Sequelize.DataTypes);
const pengeluaran = require('./pengeluaran')(sequelize, Sequelize.DataTypes);
const penjualan = require('./penjualan')(sequelize, Sequelize.DataTypes);
const penugasan = require('./penugasan')(sequelize, Sequelize.DataTypes);
const cutikehadiran = require('./cutikehadiran')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes);

// Relasi antar model
infor.belongsTo(finansial, { foreignKey: 'IdPerusahaan' });
finansial.hasMany(infor, { foreignKey: 'IdPerusahaan' });

pengeluaran.belongsTo(finansial, { foreignKey: 'IdPerusahaan' });
finansial.hasMany(pengeluaran, { foreignKey: 'IdPerusahaan' });

penjualan.belongsTo(finansial, { foreignKey: 'IdPerusahaan' });
finansial.hasMany(penjualan, { foreignKey: 'IdPerusahaan' });

penugasan.belongsTo(cutikehadiran, { foreignKey: 'idKaryawan' });
cutikehadiran.hasMany(penugasan, { foreignKey: 'idKaryawan' });

module.exports = { sequelize, finansial, infor, pengeluaran, penjualan, penugasan, cutikehadiran, User };
