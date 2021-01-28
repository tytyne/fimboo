'use strict';
module.exports = (sequelize, DataTypes) => {
  const BownerBusiness = sequelize.define('BownerBusiness', {
    businessOwnerId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    status:DataTypes.INTEGER
  }, {});

  return BownerBusiness;
};