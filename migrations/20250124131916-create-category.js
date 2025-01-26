'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Categories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    storeId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Stores',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Categories');
}