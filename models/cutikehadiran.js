const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const cutikehadiran = sequelize.define('cutikehadiran', {
    idKaryawan: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    statusCuti: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hadir: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tidakHadir: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    timestamps: false
  });

  return cutikehadiran;
};
