const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Mithai = require('./Mithai');
const Invoice = require('./Invoice');

const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mithaiId: {
    type: DataTypes.INTEGER,
    references: {
      model: Mithai,
      key: 'id'
    },
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weight: {
    type: DataTypes.ENUM('250g', '500g', '1000g', '2000g'),
    allowNull: false
  },
  invoiceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Invoice,
      key: 'id'
    },
    allowNull: false
  }
});

module.exports = Purchase;
