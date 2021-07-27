const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const helper = require("../helper");

const transporter = helper.transporter;

exports.google = async (req, res) => {
  try {
    const tokenId = req.body.tokenId;
    const accessToken = req.body.accessToken;

    client
      .verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      })
      .then((response) => {
        const { email_verified, email } = response.payload;
        console.log("response", response.payload);

        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            console.log("ye dbuser", user);
            if (err) {
              res.json({ message: "something wrong" });
            } else {
              if (user) {
                console.log("user-------------", user);
                const token = jwt.sign(
                  { _id: user._id },
                  process.env.USER_VERIFICATION_TOKEN_SECRET,
                  { expiresIn: "7d" }
                );
                const { _id, email } = user;
                console.log("token and value", {
                  token,
                  userrrr: { _id, email },
                });
                return res.json({
                  token,
                  userrrrr: { _id, email },
                  message: "user allready exits",
                });
              } else {
                let password =
                  email + process.env.USER_VERIFICATION_TOKEN_SECRET;
                console.log("password", password);
                let newUser = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email,
                  password,

                  verified: true,
                });
                console.log("newuser----------------", newUser);
                newUser.save((err, data) => {
                  if (err) {
                    res.json({
                      sucess: false,
                      message: "something wrong in db",
                    });
                  }

                  const token = jwt.sign(
                    { _id: data._id },
                    process.env.USER_VERIFICATION_TOKEN_SECRET,
                    { expiresIn: "7d" }
                  );
                  const { _id, email } = newUser;

                  return res
                    .status(201)

                    .json({ token, newuser: { _id, email } });
                });
              }
            }
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
