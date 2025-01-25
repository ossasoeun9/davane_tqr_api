'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ProductIngredient.belongsTo(models.Product, {
      //   foreignKey: 'productId',
      //   as: 'product'
      // })
      // ProductIngredient.belongsTo(models.Ingredient, {
      //   foreignKey: 'ingredientId',
      //   as: 'ingredient'
      // })
    }
  }
  ProductIngredient.init({}, {
    sequelize,
    modelName: 'ProductIngredient',
    timestamps: false,
  });
  return ProductIngredient;
};