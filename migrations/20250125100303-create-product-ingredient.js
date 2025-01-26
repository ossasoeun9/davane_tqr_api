'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ProductIngredients', {
    ProductId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    IngredientId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Ingredients',
        key: 'id'
      }
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ProductIngredients');
}