'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON(){
      return {...this.get(), uuid:undefined}
    }
  };
  users.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type:DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull:false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};