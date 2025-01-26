'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class ProductCertificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  ProductCertificate.init({}, {
    sequelize,
    modelName: 'ProductCertificate',
    timestamps: false,
  });
  return ProductCertificate;
};