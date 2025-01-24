"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      nameEn: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      nameKh: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      productId: {
        type: Sequelize.STRING(50),
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      photo: {
        type: Sequelize.STRING(150),
      },
      description: {
        type: Sequelize.STRING(500),
      },
      unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING(500),
      },
      storeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Stores",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
