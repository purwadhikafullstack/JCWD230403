'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // admin.hasMany(models.branch);
      // admin.hasMany(models.stockBranch);
      // admin.hasMany(models.price);
      // admin.belongsTo(models.role, {foreignKey: 'roleId'});
    }
  }
  admin.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isSuper: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    },
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};