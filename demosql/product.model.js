const { DataTypes } = require("sequelize");

const Product = (sequelize) =>
  sequelize.define("product", {
    productdetails: {
      type: DataTypes.STRING,
    },
    prize: {
      type: DataTypes.INTEGER,
    },
  });
// Product.associate = (model) => {
//   Product.belongsTo(model.Customer, {
//     foreignkey: "id",
//   });
// };
module.exports = ("user2", Product);
