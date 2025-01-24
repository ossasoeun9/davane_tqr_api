'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductHasCertificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductHasCertificate.init({
    productId: DataTypes.UUID,
    certificateId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ProductHasCertificate',
  });
  return ProductHasCertificate;
};