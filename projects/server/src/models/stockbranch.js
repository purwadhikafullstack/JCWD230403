'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stockBranch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stockBranch.belongsTo(models.admin);
      stockBranch.belongsTo(models.branch, {
        foreignKey:'branch_id'});
      stockBranch.belongsTo(models.product, {
        foreignKey:'product_id'});
      stockBranch.hasMany(models.historyStockProduct);
      stockBranch.hasMany(models.cart);
    }
  } 
  stockBranch.init({
    stockQty: DataTypes.INTEGER,
    takenProduct: DataTypes.INTEGER,
    takenProduct: DataTypes.INTEGER,
    entryDate: DataTypes.DATEONLY,
    isEnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'stockBranch',
  });

  return stockBranch;
};