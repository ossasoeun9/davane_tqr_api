"use strict";
import { Model, sql } from "@sequelize/core";
import { Product, ProductCertificate, Store, User } from "./index.js";

export default (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Certificate.belongsTo(Store, {
        foreignKey: "storeId",
        as: "store",
      });
      Certificate.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
      Certificate.belongsToMany(Product, {
        through: ProductCertificate,
        as: "products",
      });
    }
  }
  Certificate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      number: DataTypes.STRING,
      type: DataTypes.STRING,
      IssuingIstitution: DataTypes.STRING,
      issuedDate: DataTypes.DATE,
      expireDate: DataTypes.DATE,
      photo: DataTypes.STRING,
      standard: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
