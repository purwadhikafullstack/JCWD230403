'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      price.belongsTo(models.admin);
      price.belongsTo(models.product);
      // price.belongsTo(models.discout);
    }
  }
  price.init({
    productPrice: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    isDiscount: DataTypes.BOOLEAN,
    discountPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'price',
  });
  return price;
};