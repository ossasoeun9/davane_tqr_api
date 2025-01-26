"use strict";
import { Model } from "@sequelize/core";
import { Product, ProductIngredient, Store, User } from "./index.js";
export default (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      Ingredient.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
      Ingredient.belongsTo(Store, {
        foreignKey: "storeId",
        as: "store",
      });
      Ingredient.belongsToMany(Product, {
        through: ProductIngredient,
        as: "products",
      });
    }
  }
  Ingredient.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
