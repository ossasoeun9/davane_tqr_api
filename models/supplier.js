"use strict";
import { Model, sql } from "@sequelize/core";
import { Store, User } from "./index.js";
export default (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Supplier.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
      Supplier.belongsTo(Store, {
        foreignKey: "storeId",
        as: "store",
      });
    }
  }
  Supplier.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      photo: DataTypes.STRING,
      type: DataTypes.INTEGER,
      address: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Supplier",
    }
  );
  return Supplier;
};
