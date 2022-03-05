"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("DoctorPatient", {
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
    await queryInterface.dropTable("DoctorPatient");
  },
};
