'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionName: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
   
    });

    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  }
};