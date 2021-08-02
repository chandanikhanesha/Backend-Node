const mongoose = require("mongoose");
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");

const helper = require("../helper");
const transporter = helper.transporter;

exports.forgot = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const token = jwt.sign(
      { ID: user._id },
      process.env.USER_VERIFICATION_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    console.log(token);

    const url = `http://localhost:3000/ResetPass`;
    var mailOptions = {
      from: "jkoladiya2001@gmail.com",
      to: email,
      subject: "forgot password",
      text: `Click here for reset your password    ${url}   `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(400).send({ message: "error" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({
          success: false,
          message: "Your forgot email was send",
        });
      }
    });
  } catch (err) {
    console.log(error);
    return res.status(400).send({ message: "error" });
  }
};
