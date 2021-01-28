'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {

    permissionName: DataTypes.STRING,
    name:DataTypes.STRING

  }, 
  {
    timestamps: false,
  });

  Permission.associate = models =>{
    Permission.belongsToMany(models.Role, {
      through: models.rolepermission,
      as: 'roles',
      foreignKey: 'permission_id'
    });
  }

  return Permission;
};



