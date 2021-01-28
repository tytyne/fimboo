'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    isVerified:DataTypes.STRING,
  

  }, {});
  Users.associate = models => {

    Users.belongsTo(models.Role, {
      as:"role",
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKeyConstraint: true,
    });
    
  }
 
  return Users;
};