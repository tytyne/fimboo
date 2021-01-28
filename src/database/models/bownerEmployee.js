'use strict';
module.exports = (sequelize, DataTypes) => {
  const BownerEmployee = sequelize.define('BownerEmployee', {
    businessOwner_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER
  }, {});
  return BownerEmployee;
};