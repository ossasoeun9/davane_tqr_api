"use strict";
import { Model, sql } from "@sequelize/core";
import { Product, Store, User } from "./index.js";
export default (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Category.hasMany(Product, {
        foreignKey: "categoryId",
        as: "products",
      });
      // Category.belongsTo(Store, {
      //   foreignKey: "storeId",
      //   as: "store",
      // });
      // Category.belongsTo(User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sql.uuidV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
