"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrescribedMedicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Medicine, {
        foreignKey: "med_id",
      });
      this.belongsTo(models.PrescriptionRecord, {
        foreignKey: "record_id",
      });
    }
  }
  PrescribedMedicine.init(
    {
      record_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: "PrescriptionRecord",
          key: "record_id",
        },
      },
      med_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: "Medicine",
          key: "med_id",
        },
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "PrescribedMedicine",
    }
  );
  return PrescribedMedicine;
};
