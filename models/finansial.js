const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const finansial = sequelize.define('finansial', {
    IdPerusahaan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Tanggal: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TotalPendapatan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TotalPengeluaran: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'finansial' // pastikan nama tabel sesuai dengan yang ada di database
  });

  return finansial;
};
