'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    provider:DataTypes.STRING,
    isVerified:DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    gender:{
      type:DataTypes.ENUM('female','male', 'prefer not to say'),
    },
    birthdate:DataTypes.DATE,
    age:DataTypes.INTEGER,
    nationality:DataTypes.STRING,
    country:DataTypes.STRING,
    province:DataTypes.STRING,
    district:DataTypes.STRING,
    countryCode:DataTypes.STRING,
    phone:DataTypes.STRING,
    proffession:DataTypes.STRING,
    status:{
      type:DataTypes.ENUM('activate','unactivate'),
      defaultValue:'active'
    },
  
  }, {});
 
 
  return User;
};