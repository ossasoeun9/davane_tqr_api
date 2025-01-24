"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ProductHasIngredients",
      {
        productId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Products",
            key: "id",
          },
        },
        ingredientId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: {
            model: "Ingredients",
            key: "id",
          },
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["productId", "ingredientId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductHasIngredients");
  },
};
