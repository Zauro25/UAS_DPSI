const { Sequelize } = require('sequelize');

// Ganti kredensial dengan yang sesuai
const sequelize = new Sequelize({
  host: 'sql12.freesqldatabase.com',
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,  // Port default MySQL
  logging: false, // Nonaktifkan logging SQL jika tidak diperlukan
});

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
