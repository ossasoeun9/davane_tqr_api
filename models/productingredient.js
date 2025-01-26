'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProductIngredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  ProductIngredient.init({}, {
    sequelize,
    modelName: 'ProductIngredient',
    timestamps: false,
  });
  return ProductIngredient;
};