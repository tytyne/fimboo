'use strict';

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {

    business_name:DataTypes.STRING,
    logo:DataTypes.STRING,
    country:DataTypes.STRING,
    province:DataTypes.STRING,
    district:DataTypes.STRING,
    sector:DataTypes.STRING,
    cell:DataTypes.STRING,
    phone:DataTypes.STRING,
    currency:{
      type:DataTypes.ENUM('USD','RWF', 'EURO'),
      defaultValue:'RWF'
    },
    tin:DataTypes.STRING,
    website:DataTypes.STRING,
    workspace:DataTypes.STRING,
    about_business:DataTypes.STRING,

  }, {});
 
 
  return Business;
};