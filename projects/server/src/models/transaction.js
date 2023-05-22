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
      // transaction.belongsTo(models.branch, {foreignKey: 'branchId'});
      transaction.hasOne(models.transaction_detail, {foreignKey: 'transactionId'});
      transaction.hasMany(models.historyStockProduct);
      transaction.belongsTo(models.status, {foreignKey: 'statusId'})
      // cart.belongsTo(models.stockBranch, {foreignKey: 'stockBranchId'});

    }
  }
  transaction.init({
    uuid: DataTypes.STRING,
    // isVoucher: DataTypes.BOOLEAN,
    statusId: DataTypes.INTEGER,
    shippingMethod: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    // branchId: DataTypes.INTEGER, 
    paymentProof: DataTypes.INTEGER, 
    // transaction_detailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};