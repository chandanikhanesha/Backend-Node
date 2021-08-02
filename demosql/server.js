const express = require("express");
var bodyParser = require("body-parser");
let router = require("./router");
const db = require("./database");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync with { force: true }");
});

const app = express();
app.use(bodyParser.json());

app.use("/", router);

app.listen(6000, () => {
  console.log("Running on http://localhost:6000");
});
