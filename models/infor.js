const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const infor = sequelize.define('infor', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IdPerusahaan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false,
    tableName: 'infors'
  });

  return infor;
};
