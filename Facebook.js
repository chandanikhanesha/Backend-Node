const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fetch = require("node-fetch");

exports.facebook = async (req, res) => {
  try {
    const userID = req.body.userID;
    const accessToken = req.body.accessToken;
    console.log("<><><><><><>", req.body.userID);

    let urlGraphFacebook = `https://graph.facebook.com/v11.0/${userID}?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const { email, userID } = response;
        console.log("######response", response);
        User.findOne({ email }).exec((err, user) => {
          console.log("errrrrrrrrrrrr   : ", err);
          console.log("user: ", user);
          if (err) {
            return res
              .statuscode(400)
              .json({ success: false, message: "something wrong" });
          } else {
            if (user) {
              const token = jwt.sign(
                { _id: user._id },
                process.env.USER_VERIFICATION_TOKEN_SECRET,
                { expiresIn: "7d" }
              );
              const { _id, userID, email } = user;
              console.log("userID------", userID);
              console.log({ token, alreadyuserrrr: { _id, userID, email } });
              return res.json({
                token,
                alredyuserr: { _id, userID, email },
                message: "user allready exits",
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                userID: req.body.userID,
                email,
                password: userID + process.env.USER_VERIFICATION_TOKEN_SECRET,

                verified: true,
              });

              user.save(function (err, data) {
                if (err) {
                  return res.status(400).send(err);
                }

                const token = jwt.sign(
                  { ID: user._id },
                  process.env.USER_VERIFICATION_TOKEN_SECRET,
                  { expiresIn: "7d" }
                );

                const { _id, userID, email } = data;

                return res.json({ token, newdata: { _id, email, userID } });
              });
            }
          }
        });
      });
  } catch (err) {
    console.log(err);
    res.json({ message: " catch error" });
  }
};
