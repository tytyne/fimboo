'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {

    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
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


  }, {});
 
 
  return Profile;
};