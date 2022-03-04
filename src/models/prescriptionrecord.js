"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PrescriptionRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DoctorPatient, {
        foreignKey: "doctor_patient_id",
      });
      this.hasMany(models.PrescribedMedicine, {
        foreignKey: "record_id",
      });
    }
  }
  PrescriptionRecord.init(
    {
      record_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      doctor_patient_id: {
        type: DataTypes.UUID,
        references: {
          model: "DoctorPatient",
          key: "doctor_patient_id",
        },
      },
      daignosis: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "PrescriptionRecord",
    }
  );
  return PrescriptionRecord;
};
