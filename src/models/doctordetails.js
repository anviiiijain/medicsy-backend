"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "email",
      });
      this.belongsTo(models.Clinic, {
        foreignKey: "clinic_id",
      });
      this.belongsToMany(models.PatientDetails, {
        through: "DoctorPatient",
        foreignKey: "doctor_id",
      });
      this.belongsToMany(models.Slot, {
        through: "DoctorSlot",
        foreignKey: "doctor_id",
      });
    }
  }
  DoctorDetails.init(
    {
      doctor_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      clinic_id: {
        type: DataTypes.UUID,
        references: {
          model: "Clinic",
          key: "clinic_id",
        },
      },
      email: {
        type: DataTypes.STRING,
        references: {
          model: "User",
          key: "email",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      bloodGroup: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      specialization: {
        type: DataTypes.STRING,
      },
      experience: {
        type: DataTypes.STRING,
      },
      qualification: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "DoctorDetails",
    }
  );
  return DoctorDetails;
};
