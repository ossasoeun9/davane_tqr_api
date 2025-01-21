'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stores', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stores');
  }
};