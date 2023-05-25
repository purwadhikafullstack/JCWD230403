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
      addresses.hasOne(models.user, { foreignKey: 'addressId' });
      addresses.belongsTo(models.branch, {foreignKey: 'branchId'});
    }
  }
  addresses.init({
    addressLine: DataTypes.STRING,
    longitude: DataTypes.STRING,
    latitude: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    detail: DataTypes.STRING,
    isPrimary: DataTypes.BOOLEAN,
    postalCode: DataTypes.STRING,
    defaultAddress: DataTypes.BOOLEAN,
    receiverName: DataTypes.STRING,
    receiverPhone: DataTypes.STRING,
    receiverEmail: DataTypes.STRING,
    subDistrict: DataTypes.STRING,
    userUuid: DataTypes.STRING,
    branchId: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    province_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};