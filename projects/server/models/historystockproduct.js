'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historyStockProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      historyStockProduct.belongsTo(stockBranch);
      historyStockProduct.belongsTo(branch);
      historyStockProduct.belongsTo(transaction);
    }
  }
  historyStockProduct.init({
    before: DataTypes.INTEGER,
    after: DataTypes.INTEGER,
    type: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'historyStockProduct',
  });
  return historyStockProduct;
};