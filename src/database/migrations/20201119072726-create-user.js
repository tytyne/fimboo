'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },

      isVerified:{
        type:Sequelize.BOOLEAN,
        defaultValue:false

      },

      provider:{
        type:Sequelize.STRING,
        defaultValue:'local'

      },
       profilePicture: {
        type: Sequelize.STRING,
        defaultValue:'https://res.cloudinary.com/fimboo/image/upload/v1609507499/profile_pictures/profile-icon-png-898_rashbu.png'
      },
      gender:{
        type:Sequelize.DataTypes.ENUM('female','male', 'prefer not to say'),
      },
      birthdate: {
        type: Sequelize.DATE
      },
      age:{
        type:Sequelize.INTEGER
      },
      nationality: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      countryCode:{
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      proffession: {
        type: Sequelize.STRING
      },
      status:{
        type:Sequelize.ENUM('active','unactive'),
        defaultValue:"active"
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
    await queryInterface.dropTable('Users');
  }
};