"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("PrescribedMedicines", {
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
    await queryInterface.dropTable("PrescribedMedicines");
  },
};
