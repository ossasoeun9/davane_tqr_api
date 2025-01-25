"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      }),
        Product.belongsTo(models.Store, {
          foreignKey: "storeId",
          as: "store",
        });
      Product.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      }),
        Product.hasMany(models.QrCode, {
          foreignKey: "productId",
          as: "qrCodes",
        });
      Product.belongsToMany(models.Ingredient, {
        through: models.ProductIngredient,
        as: 'ingredients'
      });
      Product.belongsToMany(models.Certificate, {
        through: models.ProductCertificate,
        as: 'certificates'
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nameEn: DataTypes.STRING,
      nameKh: DataTypes.STRING,
      extId: DataTypes.STRING,
      photo: DataTypes.STRING,
      description: DataTypes.STRING,
      unit: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
