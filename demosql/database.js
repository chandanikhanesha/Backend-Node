const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("demosqlnode", "root", "", {
  dialect: "mysql",
  port: 3306,

  host: "127.0.0.1",
});

module.exports = sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Customer = require("./customer.model")(sequelize, Sequelize);
db.Product = require("./product.model")(sequelize, Sequelize);

db.Customer.hasMany(db.Product, { as: "product" });
db.Product.belongsTo(db.Customer, {
  foreignKey: "user_id",
});

module.exports = db;
