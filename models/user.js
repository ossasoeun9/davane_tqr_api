'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Store, {
        foreignKey: 'userId',
        as: 'store',
      });
      User.hasMany(models.Certificate, {
        foreignKey: 'userId',
        as: 'certificates',
      });
      User.hasMany(models.Category, {
        foreignKey: "userId",
        as: "categories"
      })
      User.hasMany(models.Supplier, {
        foreignKey: 'userId',
        as: 'suppliers',
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};