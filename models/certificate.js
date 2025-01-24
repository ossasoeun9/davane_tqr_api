"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Certificate.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store",
      });
      Certificate.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Certificate.belongsToMany(models.Product, {
        through: models.ProductHasCertificate,
        as: "products"
      })
    }
  }
  Certificate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      IssuingIstitution: DataTypes.STRING,
      issuedDate: DataTypes.DATE,
      expireDate: DataTypes.DATE,
      photo: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
