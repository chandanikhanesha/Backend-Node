const { DataTypes } = require("sequelize");

const Customer = (sequelize, Sequelize) =>
  sequelize.define("customer", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  });

// Customer.associate = (model) => {
//   Customer.hasOne(model.Product, {
//     onDelete: "cascade",
//   });
// };
module.exports = ("User", Customer);
