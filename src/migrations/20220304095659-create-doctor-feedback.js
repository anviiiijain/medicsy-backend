"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("DoctorFeedbacks", {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("DoctorFeedbacks");
  },
};
