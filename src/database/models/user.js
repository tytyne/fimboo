'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN,
    provider:DataTypes.STRING
  
  }, {});
 
 
  return Users;
};
