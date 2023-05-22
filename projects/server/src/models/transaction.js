'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user);
      transaction.belongsTo(models.branch);
      transaction.hasOne(models.transaction_detail);
      transaction.hasMany(models.historystockproduct);
    }
  }
  transaction.init({
    uuid: DataTypes.STRING,
    isVoucher: DataTypes.BOOLEAN,
    status: DataTypes.ENUM(
      "Waiting for payment",
      "Please confirm your payment",
      "On Going",
      "On delivery",
      "Order completed",
      "Order is cancelled"
    ),
    amount: DataTypes.INTEGER,
    totalOrderQty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};