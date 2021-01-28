'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
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
    hiredate: DataTypes.DATE,
    supervisor:DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    is_email_verified: { type: DataTypes.BOOLEAN },
    is_phone_verified:  { type: DataTypes.BOOLEAN },
    last_login: DataTypes.DATE,

  }, {

  });
  Employee.associate=models=>{
    Employee.belongsMany(models.BusinessOwner,{
      through:models.BownerEmployee,
      as:'businessOwners',
      foreignKey:'employee_id'
      
    })
    Employee.belongsMany(models.Busines,{
      through:models.BownerBusinessEmployee,
      as:'businesses',
      foreignKey:'employeeId'
      
    })
  }

  return Employee;
};