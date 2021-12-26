"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, {
        as: "user",
        foreignKey: "idUser",
      });

      Transactions.belongsToMany(models.Products, {
        through: "Orders",
        foreignKey: "idTransaction",
      });
    }
  }
  Transactions.init(
    {
      idUser: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,
      attachment: DataTypes.TEXT,
      status: DataTypes.ENUM([
        "Waiting approve",
        "On the way",
        "Order success",
      ]),
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
