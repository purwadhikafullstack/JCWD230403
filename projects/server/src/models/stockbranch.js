'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stockbranch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // stockBranch.belongsTo(models.admin);
      stockbranch.belongsTo(models.branch, {
        foreignKey:'branch_id'});
      stockbranch.belongsTo(models.product, {
        foreignKey:'product_id'});
      stockbranch.hasMany(models.product, {
        foreignKey:'stockBranchId'});
      stockbranch.hasMany(models.historyStockProduct);
      stockbranch.hasMany(models.cart, {
        foreignKey: 'stockBranchId' 
      });
    } 
  } 
  stockbranch.init({
    stock: DataTypes.INTEGER, 
    booking: DataTypes.INTEGER,
    entryDate: DataTypes.DATEONLY,
    product_id: DataTypes.INTEGER,
    branch_id: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'stockbranch',
  });
  return stockbranch;
};