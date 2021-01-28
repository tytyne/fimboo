'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Business_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      shortcode: {
        type: Sequelize.STRING
      },
    
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Business_categories');
  }
};
