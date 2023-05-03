'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cart.belongsTo(models.stockBranch, {foreignKey: 'stockBranchId'});
      cart.belongsTo(models.user, {foreignKey: 'userId'});
      cart.belongsTo(models.branch, {foreignKey: 'branchId'});
    }
  }
  cart.init({
    quantity: DataTypes.INTEGER,
    current_price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    stockBranchId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};