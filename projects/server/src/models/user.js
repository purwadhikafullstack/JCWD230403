'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {foreignKey: 'profileId'});
      user.hasMany(models.addresses, {foreignKey: 'addressId'});
      user.hasMany(models.cart);
      user.hasMany(models.transaction);
      user.belongsTo(models.role, {foreignKey: 'roleId'});
      user.belongsTo(models.branch, {foreignKey: "branchId"})
    }
  }
  user.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profileId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};