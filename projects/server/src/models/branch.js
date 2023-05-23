'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // branch.belongsTo(models.admin);
      branch.hasMany(models.stockbranch,{
        foreignKey:'branch_id'});
      branch.hasMany(models.addresses, {foreignKey: 'branchId'});
      branch.hasMany(models.cart);
      branch.hasMany(models.transaction_detail);
      branch.hasMany(models.transaction);
      branch.hasMany(models.historystockproduct);
      branch.belongsTo(models.product)
      branch.hasMany(models.user, {foreignKey: "branchId" })
      // branch.belongsTo(models.city, {foreignKey: "city_id"})
      // branch.belongsTo(models.province, {foreignKey: "province_id"})
    }
  }
  branch.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    phone: DataTypes.STRING,
    longitude: DataTypes.STRING,
    lattitude: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    subDistrict: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    province_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'branch',
  });

  return branch;
};