'use strict';
module.exports = (sequelize, DataTypes) => {
  const BownerBusinessEmployee = sequelize.define('BownerBusinessEmployee', {
    businessOwnerId: DataTypes.INTEGER,
    business_id:DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    status:DataTypes.INTEGER
  }, {});

  return BownerBusinessEmployee;
};