"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DoctorDetails, {
        foreignKey: "doctor_id",
      });
      this.belongsTo(models.Slot, {
        foreignKey: "slot_id",
      });
      this.hasOne(models.Appointment, {
        foreignKey: "appointment_id",
      });
    }
  }
  DoctorSlot.init(
    {
      doctor_slot_id: {
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
      slot_id: {
        type: DataTypes.UUID,
        references: {
          model: "Slot",
          key: "slot_id",
        },
      },
    },
    {
      sequelize,
      modelName: "DoctorSlot",
    }
  );
  return DoctorSlot;
};
