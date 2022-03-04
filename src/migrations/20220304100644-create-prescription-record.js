"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("PrescriptionRecords", {
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
    await queryInterface.dropTable("PrescriptionRecords");
  },
};
