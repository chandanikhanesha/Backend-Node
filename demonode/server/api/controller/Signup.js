const mongoose = require("mongoose");

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const helper = require("../helper");

const transporter = helper.transporter;

exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (!email) {
      return res.status(422).send({ message: "Missing email." });
    }
    if (password !== confirmpassword) {
      return res.status(422).send({ message: "password not match." });
    }

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.json({ success: false, message: "Email alredy exits" });
    }

    hashpassword = bcrypt.hashSync(req.body.password, 10).toString("hex");

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashpassword,
    });
    user.save(function (err) {
      if (err) {
        return res.status(400).send(err);
      }

      const token = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      console.log(token);
      const url = `http://localhost:3002/api/verify/${token}`;

      transporter.sendMail({
        from: "jkoladiya2001@gmail.com",
        to: email,
        subject: "Verify your Account",

        text: `click here for verify your account  ${url}

        \n
        Thank You !`,
      });

      return res
        .status(201)
        .send({ message: "Sent a verification email", token: token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};
