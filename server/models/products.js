"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsToMany(models.Transactions, {
        through: "Orders",
        foreignKey: "idProduct",
      });
    }
  }
  Products.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
