'use strict';
module.exports = (sequelize, DataTypes) => {
  const BusinessOwner = sequelize.define('BusinessOwner', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rememberMe: { type: DataTypes.BOOLEAN },
    provider: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM('female', 'male', 'prefer not to say'),
    },
    birthdate: DataTypes.DATE,
    age: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    phone: DataTypes.STRING,
    workphone: DataTypes.STRING,
    preferedLanguage: DataTypes.STRING,
    business_number: DataTypes.DATE,
    employees_number:DataTypes.STRING,
    is_email_verified: { type: DataTypes.BOOLEAN },
    is_phone_verified:  { type: DataTypes.BOOLEAN },
    last_login: DataTypes.DATE,

  }, {

  });
  BusinessOwner.associate=models=>{
    BusinessOwner.belongsMany(models.Employee,{
      through:models.BownerEmployee,
      as:'employees',
      foreignKey:'businessOwner_id'
      
    })
    BusinessOwner.belongsMany(models.Business,{
      through:models.BownerBusinessEmployee,
      as:'Businesses',
      foreignKey:'businessOwnerId'
      
    })

  }


  return BusinessOwner;
};