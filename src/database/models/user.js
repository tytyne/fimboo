'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    provider:DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN
  
  }, {});
 
 
  return User;
};
