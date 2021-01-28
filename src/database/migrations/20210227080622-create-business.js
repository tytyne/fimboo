'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    
      business_name: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
      category: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      country:{
        type:Sequelize.STRING
      },
      province:{
        type:Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      cell: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      currencyId: {
        type:Sequelize.INTEGER
      },
      tin: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      workspace:{
        type:Sequelize.ENUM('owned','rental'),
        defaultValue:"owned"
      },
      status:{
        type:Sequelize.ENUM('active','unactive'),
        defaultValue:"active"
      },
      about_business: {
        type: Sequelize.STRING
      },
      owner: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Businesses');
  }
};