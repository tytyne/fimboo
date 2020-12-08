'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    isVerified:DataTypes.BOOLEAN,
    provider:DataTypes.STRING,
    gender:{
      type:DataTypes.ENUM('female','male', 'prefer not to say'),
    },
    birthdate:DataTypes.DATE,
    nationality:DataTypes.STRING,
    country:DataTypes.STRING,
    province:DataTypes.STRING,
    district:DataTypes.STRING,
    phone:DataTypes.STRING,
    proffession:DataTypes.STRING,
  
  }, { });
 

  return User;
};