'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class historystockproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // historyStockProduct.belongsTo(stockBranch);
      // historyStockProduct.belongsTo(branch);
      // historyStockProduct.belongsTo(transaction);
      historystockproduct.belongsTo(models.product, {
        foreignKey:'product_id'});
    }
  }
  historystockproduct.init({
    product_id: DataTypes.INTEGER,
    before: DataTypes.INTEGER,
    after: DataTypes.INTEGER,
    type: DataTypes.STRING,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'historystockproduct',
  });
  return historystockproduct;
};