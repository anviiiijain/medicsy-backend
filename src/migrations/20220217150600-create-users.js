'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      name: {
        type: DataTypes.STRING,
        allowNull:false

      },
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull:false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      },
      role: {
        type: DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  }
};