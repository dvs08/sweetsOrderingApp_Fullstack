const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mithai = sequelize.define('Mithai', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  availableQuantity250g: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  availableQuantity500g: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  availableQuantity1000g: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  availableQuantity2000g: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  image: {
    type: DataTypes.STRING, // You can store URLs or file paths
    allowNull: true
  }
});

module.exports = Mithai;
