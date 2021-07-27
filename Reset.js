const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/userModel");

exports.reset = async (req, res) => {
  const { token } = req.params;
  const password = req.body.password;
  try {
    if (!token) {
      return res.status(422).send({
        message: "Missing Token",
      });
    }

    const user = await User.findOne().exec();
    console.log(user);

    if (!user) {
      return res.json({ success: false, message: "User Does Not Found" });
    }

    hashpassword = bcrypt.hashSync(password, 10).toString("hex");
    user.password = hashpassword;
    console.log(user.password);

    user.save(function (err) {
      if (err) {
        return res.status(400).send({ message: "error found" });
      }

      return res.status(200).send({
        message: "your password has been reset for your account",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
