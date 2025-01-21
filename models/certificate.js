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
      Certificate.hasOne(models.IssuingIstitution, {
        foreignKey: "certificateId",
        as: "issuingIstitution",
      });
    }
  }
  Certificate.init(
    {
      title: DataTypes.STRING,
      issuedDate: DataTypes.DATE,
      expireDate: DataTypes.DATE,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
