'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductHasIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductHasIngredient.init({
    productId: DataTypes.UUID,
    ingredientId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductHasIngredient',
  });
  return ProductHasIngredient;
};