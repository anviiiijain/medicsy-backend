"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.PatientDetails, {
        foreignKey: "email",
      });
      this.hasOne(models.DoctorDetails, {
        foreignKey: "email",
      });
    }

    toJSON() {
      return { ...this.get(), uuid: undefined };
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "User",
    }
  );
  return User;
};
