'use strict';
module.exports = (sequelize, DataTypes) => {
  const rolepermission = sequelize.define('rolepermission', {

    role_id:DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER,

  }, {
  timestamps:false,
  });
 
  return rolepermission;
};