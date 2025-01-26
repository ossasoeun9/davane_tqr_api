'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Stores', {
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
    photo: {
      type: Sequelize.STRING(300)
    },
    phoneNumber: {
      type: Sequelize.STRING(15)
    },
    address: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50)
    },
    facebook: {
      type: Sequelize.STRING(100)
    },
    location: {
      type: Sequelize.STRING(50)
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
  await queryInterface.dropTable('Stores');
}