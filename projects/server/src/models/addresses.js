'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      addresses.belongsTo(models.user);
      // addresses.belongsTo(models.branch);
    }
  }
  addresses.init({
    address: DataTypes.STRING,
    longitude: DataTypes.STRING,
    lattitude: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    isPrimary: DataTypes.BOOLEAN,
    province_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};