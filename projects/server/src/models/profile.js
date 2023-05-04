'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      profile.belongsTo(models.user);
    }
  }
  profile.init({
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false
    },
    birthDate: DataTypes.DATE,
    profilePicture: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};