module.exports = (sequelize, DataTypes) => {
  const Business_category = sequelize.define('Business_category', {

    name:DataTypes.STRING,
    shortcode: DataTypes.STRING,

  }, {
    timestamps:false,
  });
 
  Business_category.associate = models =>{
    Business_category.hasMany(models.Business, {
      foreignKey: 'categoryId',
      targetKey: 'id',
      onDelete: 'SET DEFAULT',
      onUpdate: 'CASCADE',
      as: 'businessCategory',
      foreignKeyConstraint: true,
    });

   
  }
  return Business_category;
};