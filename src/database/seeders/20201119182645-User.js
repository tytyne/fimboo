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
    gender:'female',
    birthdate:'05/05/1994',
    country:'rwanda',
    nationality:'rwandese',
    province:'kigali',
    district:'kicukiro',
    phone:'07814406117',
    proffession:'software developer',
    isBetaMember: false
    }
  ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkDelete("Users", null, {});
     
  }
};
