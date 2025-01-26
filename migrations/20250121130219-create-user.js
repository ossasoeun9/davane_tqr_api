'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    photo: {
      type: Sequelize.STRING(300)
    },
    firstName: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(30)
    },
    phoneNumber: {
      type: Sequelize.STRING(15),
      allowNull: false,
      unique: true
    },
    pswd: {
      type: Sequelize.STRING(128),
      allowNull: false
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
  await queryInterface.dropTable('Users');
}