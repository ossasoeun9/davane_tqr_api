"use strict";
import { Model } from "@sequelize/core";
import {
  Category,
  Certificate,
  Ingredient,
  ProductCertificate,
  ProductIngredient,
  QrCode,
  Store,
  User,
} from "./index.js";
export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Product.belongsTo(Category, {
        foreignKey: "categoryId",
        as: "category",
      }),
        Product.belongsTo(Store, {
          foreignKey: "storeId",
          as: "store",
        });
      Product.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      }),
        Product.hasMany(QrCode, {
          foreignKey: "productId",
          as: "qrCodes",
        });
      Product.belongsToMany(Ingredient, {
        through: ProductIngredient,
        as: "ingredients",
      });
      Product.belongsToMany(Certificate, {
        through: ProductCertificate,
        as: "certificates",
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
