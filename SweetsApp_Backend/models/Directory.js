const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/database');

const Directory = sequelize.define('Directory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex',  // Composite unique constraint
  },
  fileExtension: {
    type: STRING,
    allowNull: true,
  },
  isFile: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeIndex',  // Composite unique constraint
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  indexes: [
    {
      tableName: 'directory',
      unique: true,
      fields: ['fileName', 'createdBy'],  // Ensure unique fileName per user
    }
  ]
});

module.exports = Directory;
