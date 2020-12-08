'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
   await queryInterface.bulkInsert(
     "Users", [
    {
    username:'tytyne',
    email:'tytyne@example.com',
    password:'tytyne1234',
    firstname:'dusabe',
    lastname:'florentine',
    isVerified:false,
    createdAt: new Date(),
    updatedAt: new Date(),
    }
  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete("Users", null, {});
     
  }
};
