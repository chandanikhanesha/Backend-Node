const mongoose = require("mongoose");
const validator = require("validator");

const loginschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "alredy presented"],
  },
  password: {
    type: String,
    required: true,
    unique: [true, "alredy present"],
    min: [6, "Must be at least 6, got {VALUE}"],
    max: 12,
  },
});

const login = new mongoose.model("login", loginschema);
module.exports = login;
