'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Store.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      Store.hasMany(models.Certificate, {
        foreignKey: 'storeId',
        as: 'certificates',
      });
    }
  }
  Store.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    facebook: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};