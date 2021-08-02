const mongoose = require("mongoose");
const User = require("../models/userModel");
const helper = require("../helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(password);

    if (!email) {
      return res.status(422).send({ message: "missing email" });
    }
    if (!password) {
      return res.status(422).send({ message: "enter a password." });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.json({ success: false, message: "User Does Not Found" });
    }
    const token = jwt.sign(
      { ID: user._id },
      process.env.USER_VERIFICATION_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: "Password Was Wrong" });
    }

    if (!user.verified) {
      return res.json({
        success: false,
        message: "Please verify your account",
      });
    }
    return res.json({
      success: true,
      message: "you are logged in",
      token: token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "err" });
  }
};
