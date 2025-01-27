"use strict";
import { Model, sql } from "@sequelize/core";
import { Product, Store, Supplier, User } from "./index.js";
export default (sequelize, DataTypes) => {
  class QrCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      QrCode.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
      QrCode.belongsTo(Store, {
        foreignKey: "storeId",
        as: "store",
      });
      QrCode.belongsTo(Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });
      QrCode.belongsTo(Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  QrCode.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      createDate: DataTypes.DATE,
      expireDate: DataTypes.DATE,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QrCode",
    }
  );
  return QrCode;
};
