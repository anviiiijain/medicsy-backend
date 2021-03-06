"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("DoctorDetails", {
      doctor_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      clinic_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
      blood_group: {
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
    await queryInterface.dropTable("DoctorDetails");
  },
};
