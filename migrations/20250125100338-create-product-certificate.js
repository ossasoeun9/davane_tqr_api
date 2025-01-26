'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ProductCertificates', {
    ProductId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    CertificateId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Certificates',
        key: 'id'
      }
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('ProductCertificates');
}