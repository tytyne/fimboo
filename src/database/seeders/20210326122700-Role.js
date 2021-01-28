'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
   
      name: 'SuperAdmin',
      description:"super admin",
    
    }, {
  
      name: 'ITsupport',
      description:"IT support",
    
    },

    {
   
      name: 'BusinessOwner',
      description:"Business Owner",
     
    },
     {

      name: 'CoFounder',
      description:"Co founder",
     
    }, {
   
      name: 'Employee',
      description:"employee",
    
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};