'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // products.hasOne(models.price);
      product.hasMany(models.stockBranch, {
        foreignKey:'product_id'});
      product.belongsTo(models.stockBranch)
      product.hasMany(models.transaction_detail);
      product.hasMany(models.cart);
      product.belongsTo(models.categories, {foreignKey: 'category_id'})
    }
  } 
  product.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });

  return product;
};