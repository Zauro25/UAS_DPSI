const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const pengeluaran = sequelize.define('pengeluaran', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalPengeluaran: {
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

  return pengeluaran;
};
