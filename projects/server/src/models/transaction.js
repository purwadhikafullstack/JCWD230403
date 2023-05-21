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
      transaction.belongsTo(models.user, {foreignKey: 'userId'});
      transaction.belongsTo(models.branch, {foreignKey: 'branchId'});
      transaction.hasOne(models.transaction_detail, {foreignKey: 'transactionId'});
      transaction.hasMany(models.historyStockProduct);
      // cart.belongsTo(models.stockBranch, {foreignKey: 'stockBranchId'});

    }
  }
  transaction.init({
    uuid: DataTypes.STRING,
    // isVoucher: DataTypes.BOOLEAN,
    status: DataTypes.ENUM(
      "Waiting for payment",
      "Please confirm your payment",
      "On Going",
      "On delivery",
      "Order completed",
      "Order is cancelled"
    ),
    deliveryFee: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER, 
    branchId: DataTypes.INTEGER, 
    paymentProof: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};