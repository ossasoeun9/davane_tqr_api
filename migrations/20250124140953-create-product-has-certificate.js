"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ProductHasCertificates",
      {
        productId: {
          type: Sequelize.UUID,
          references: {
            model: "Products",
            key: "id",
          },
        },
        certificateId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Certificates",
            key: "id",
          },
        },
      },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["productId", "certificateId"],
          },
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductHasCertificates");
  },
};
