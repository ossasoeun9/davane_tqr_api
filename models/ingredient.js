'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ingredient.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      })
      Ingredient.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store"
      })
      Ingredient.belongsToMany(models.Product, {
        through: models.ProductHasIngredient,
        as: "products",
      })
    }
  }
  Ingredient.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};