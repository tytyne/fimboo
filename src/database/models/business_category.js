module.exports = (sequelize, DataTypes) => {
  const Business_category = sequelize.define('Business_category', {

    name:DataTypes.STRING,

  }, {});
 
 
  return Business_category;
};