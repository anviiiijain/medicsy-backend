"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorFeedback extends Model {
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
    }
  }
  DoctorFeedback.init(
    {
      feedback_id: {
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
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "DoctorFeedback",
    }
  );
  return DoctorFeedback;
};
