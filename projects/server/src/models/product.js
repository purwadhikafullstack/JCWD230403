'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // products.hasOne(models.price);
      products.hasMany(models.stockBranch, {
        foreignKey:'product_id'});
      products.belongsTo(models.stockBranch)
      products.hasMany(models.transaction_detail);
      products.hasMany(models.cart);
      products.belongsTo(models.categories, {foreignKey: 'category_id'})
    }
  }
  products.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });

  return products;
};