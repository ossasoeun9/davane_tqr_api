"use strict";
import { Model, sql } from "@sequelize/core";
import { Category, Certificate, Store, Supplier } from "./index.js";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      User.hasOne(Store, {
        foreignKey: "userId",
        as: "store",
      });
      User.hasMany(Certificate, {
        foreignKey: "userId",
        as: "certificates",
      });
      User.hasMany(Category, {
        foreignKey: "userId",
        as: "categories",
      });
      User.hasMany(Supplier, {
        foreignKey: "userId",
        as: "suppliers",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
