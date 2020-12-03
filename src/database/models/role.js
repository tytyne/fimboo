'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {

    name:{
      type:DataTypes.ENUM('admin','employee', 'disabled')
      
    }

  }, {});
 
  return Role;
};