'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {

    name:DataTypes.ENUM,
      
  }, {});
 
  return Roles;
};
