"use strict";
import { Model } from "@sequelize/core";
import { Category, Certificate, QrCode, Supplier, User } from "./index.js";

export default (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Store.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
      Store.hasMany(Certificate, {
        foreignKey: "storeId",
        as: "certificates",
      });
      Store.hasMany(Category, {
        foreignKey: "storeId",
        as: "categories",
      });
      Store.hasMany(Supplier, {
        foreignKey: "storeId",
        as: "suppliers",
      });
      Store.hasMany(QrCode, {
        foreignKey: "storeId",
        as: "qrCodes",
      });
    }
  }
  Store.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      photo: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      facebook: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
