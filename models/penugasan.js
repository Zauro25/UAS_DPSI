// models/penugasan.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const penugasan = sequelize.define('penugasan', {
    idTugas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    daftarTugas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laporanKemajuan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idKaryawan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return penugasan;
};
