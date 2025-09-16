'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Directories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileExtension: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isFile: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedBy: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Add the unique composite index
    await queryInterface.addConstraint('Directories', {
      fields: ['fileName', 'createdBy'],
      type: 'unique',
      name: 'compositeIndex'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Directories');
  }
};
