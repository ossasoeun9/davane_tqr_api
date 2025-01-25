'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QrCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QrCode.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      })
      QrCode.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store"
      })
      QrCode.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier"
      })
      QrCode.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product"
      })
    }
  }
  QrCode.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    createDate: DataTypes.DATE,
    expireDate: DataTypes.DATE,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QrCode',
  });
  return QrCode;
};