const mongoose = require("mongoose");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const helper = require("../helper");
const transporter = helper.transporter;

exports.changepassword = async (req, res) => {
  try {
    const email = req.body.email;

    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    console.log(password);

    if (!password) {
      return res.status(422).send({ message: "enter a password." });
    }

    const user = await User.findOne({ email }).exec();
    console.log(user);
    if (!user) {
      return res.json({ success: false, message: "User not exits" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: "Password Was Wrong" });
    }
    if (newpassword !== confirmpassword) {
      return res
        .status(422)
        .send({ message: "password and confirmpassword not match" });
    }

    hashpassword = bcrypt.hashSync(req.body.newpassword, 10).toString("hex");
    user.password = hashpassword;
    console.log(user.newpassword);
    user.save(function (err) {
      if (err) {
        return res.status(400).send({ message: "errr" });
      }
      var mailOptions = {
        from: "jkoladiya2001@gmail.com",
        to: user.email,
        subject: "Change password",
        text: `Hello! your password for your account  ${user.email} has just been changed.`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .send({ message: "some issue in changing password" });
        } else {
          console.log("Email sent: " + info.response);
          return res.json({
            success: true,
            message:
              "your password has been change & your confirmation mail was send",
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "err" });
  }
};
