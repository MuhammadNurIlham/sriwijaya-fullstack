'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detailUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      detailUser.belongsTo(models.user, {
        as: 'user',
        foreignKey: {
          name: 'idUser'
        },
      });
    }
  }
  detailUser.init({
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detailUser',
  });
  return detailUser;
};