const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const penjualan = sequelize.define('penjualan', {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    totalPenjualan: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    IdPerusahaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return penjualan;
};
