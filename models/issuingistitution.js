'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IssuingIstitution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      IssuingIstitution.belongsTo(models.Certificate, {
        foreignKey: 'certificateId',
        as: 'certificate',
      });
    }
  }
  IssuingIstitution.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    linkInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IssuingIstitution',
  });
  return IssuingIstitution;
};