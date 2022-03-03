"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.DoctorDetails, {
        foreignKey: "doctor_id",
      });
      this.belongsToMany(models.PatientDetails, {
        foreignKey: "patient_id",
      });
    }
  }
  DoctorPatient.init(
    {
      doctor_patient_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      doctor_id: {
        type: DataTypes.UUID,
        references: {
          model: "DoctorDetails",
          key: "doctor_id",
        },
      },
      patient_id: {
        type: DataTypes.UUID,
        references: {
          model: "PatientDetails",
          key: "patient_id",
        },
      },
    },
    {
      sequelize,
      modelName: "DoctorPatient",
    }
  );
  return DoctorPatient;
};
