'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.product_category);
      categories.hasMany(models.product, { foreignKey: 'category_id'})
    }
  }
  categories.init({
    category: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },

  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};