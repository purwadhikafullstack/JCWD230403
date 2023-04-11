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
      addresses.belongsTo(models.branch);
    }
  }
  addresses.init({
    uuid: DataTypes.STRING,
    addressLine: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    longitude: DataTypes.STRING,
    lattitude: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    detail: DataTypes.STRING,
    defaultAddress: DataTypes.BOOLEAN,
    receiverName: DataTypes.STRING,
    receiverPhone: DataTypes.STRING,
    receiverEmail: DataTypes.STRING,
    subDistrict: DataTypes.STRING,
    userUuid: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};