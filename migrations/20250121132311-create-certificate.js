'use strict';

import { Ingredient } from '../models';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Certificates', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    title: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    standard: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    issuingIstitution: {
      type: Sequelize.STRING(250)
    },
    issuedDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    expireDate: {
      type: Sequelize.DATE
    },
    photo: {
      type: Sequelize.STRING(150)
    },
    note: {
      type: Sequelize.STRING(300)
    },
    storeId: {
      allowNull: false,
      type: Sequelize.UUID,
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
  await queryInterface.dropTable('Certificates');
}