'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {

   
    gender:DataTypes.ENUM(),
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
