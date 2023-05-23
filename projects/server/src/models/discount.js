'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      discount.hasMany(models.price);
      discount.belongsTo(models.product, {foreignKey: 'productId'});
    }
  }
  discount.init({
    nameDiscount: DataTypes.STRING,
    specialPrice: DataTypes.INTEGER,
    activeDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    productId: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};