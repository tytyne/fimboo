module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {

    cname:DataTypes.STRING,
    cu_shortcode: DataTypes.STRING,

  }, {
  timestamps:false,
  });

  Currency.associate = models =>{
  
  Currency.hasMany(models.Business, {
    foreignKey: 'currencyId',
    targetKey: 'id',
    onDelete: 'SET DEFAULT',
    onUpdate: 'CASCADE',
    as: 'business',
    foreignKeyConstraint: true,
  });

}
 
  return Currency;
};