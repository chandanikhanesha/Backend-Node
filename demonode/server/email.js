var nodemailer = require("nodemailer");

const email_verifier = require("email-verifier-node");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: "jkoladiya2001@gmail.com", pass: "9696@jemu" },
});
var mailOptions = {
  from: "jkoladiya2001@gmail.com",
  to: "jkoladiya2001@gmail.com,",
  subject: "verify email",
  text: ``,
};
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

// verifier.verify("chandnaikhanesha@gmail.com", function (err, info) {
//   if (err) console.log(err);
//   else {
//     console.log("Success (T/F): " + info.success);
//     console.log("Info: " + info.info);
//   }
// });
// app.post("/api/signup", function (req, res, next) {
//   let data = {
//     email: req.body.email,
//     password: req.body.password,
//     cpass: req.body.password,
//   };
//   try {
//     bcrypt.hash(data.password, 10, function (err, hash) {
//       var sql = "INSERT INTO useres (email,password,cpass) VALUES ?";
//       var values = [[data.email, data.password, hash]];
//       conn.query(sql, [values]);
//       transporter.sendMail({
//         from: "jkoladiya2001@gmail.com",
//         to: email,
//         subject: "Verify Account",
//         html: `Click <a href = 'verify your email ${url}'>here</a> to confirm your email.`,
//       });
//       return res.status(201).send({ message: "Sent a verification email" });
//     });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// });

// const verificationToken = user.generateVerificationToken();

// const url = `http://localhost:3002/api/verify/${verificationToken}`;

// UserSchema.methods.generateVerificationToken = function () {
//   const user = this;
//   const verificationToken = jwt.sign(
//     { ID: user._id },
//     process.env.USER_VERIFICATION_TOKEN_SECRET,
//     { expiresIn: "7d" }
//   );
//   return verificationToken;
// };
// exports.verify = async (req, res) => {
//   const { token } = req.params;

//   if (!token) {
//     return res.status(422).send({
//       message: "Missing Token",
//     });
//   }

//   let payload = null;
//   try {
//     payload = jwt.verify(token, process.env.USER_VERIFICATION_TOKEN_SECRET);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
//   try {
//     const user = await User.findOne({ _id: payload.ID }).exec();
//     if (!user) {
//       return res.status(404).send({
//         message: "User does not  exists",
//       });
//     }

//     user.verified = true;
//     await user.save();
//     return res.status(200).send({
//       message: "Account Verified",
//     });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// };

//last update

/////last reset verify api
//exports.reset = async (req, res) => {
// const user = await User.findOne({
//   resetpasstoken: req.params.token,
//   resetpass_expire: { $gt: Date.now() },
// }).exec();
// console.log("user of the -----------------", user);
// if (!user) {
//   return res.status(422).send({
//     message: "Missing Token",
//   });
// }
// console.log("resettoken-------", user.resetpasstoken);
// let payload = null;
//   const { passtoken } = req.params;
//   console.log(passtoken);
//   if (!passtoken) {
//     return res.status(422).send({
//       message: "Missing Token",
//     });
//   }
//   try {
//     payload = jwt.verify(passtoken, process.env.USER_RESET_TOKEN_SECRET);
//     console.log(payload);
//   } catch (err) {
//     res.status(400).send({ message: "error" });
//   }
//   try {
//     const user = await User.findOne({ _id: payload.ID }).exec();
//     if (!user) {
//       return res.status(404).send({
//         message: "User does not  exists",
//       });
//     } else {
//       return res.status(200).send({
//         message: "welcome to reset link page",
//       });
//     }
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// };

// app.post("/api/change-password", async (req, res) => {
//   var email = req.body.email;
//   var password = req.body.password;
//   let data = {
//     newpassword: req.body.newpassword,
//   };
//   try {
//     conn.query(
//       "SELECT * FROM demo WHERE email = ?",
//       [email],
//       function (error, results) {
//         if (error) {
//           return res.status(400), send({ message: "user not found" });
//         }

//         if (results.length > 0) {
//           const comparison = await bcrypt.compare(
//             password,
//             results[0].password
//           );
//           if (!comparison) {
//             return res.status(400).send({ message: "wrong cureent password" });
//           }
//         }
//         hashpass = bcrypt.hashSync(data.newpassword, 10).toString("hex");
//         var sql = "UPDATE demo set password= ${hashpass}";
//         conn.query(sql, function (err) {
//           if (err) {
//             console.log(err);
//             return res.status(400).send({ message: "data not insert" });
//           }
//           return res
//             .staus(200)
//             .send({ message: "your password has been changed" });
//         });
//       }
//     );
//   } catch (err) {
//     return res.status(400).send({ message: "error" });
//   }
// });

exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log();
  try {
    if (!email) {
      return res.status(422).send({ message: "missing email" });
    }
    if (!password) {
      return res.status(422).send({ message: "enter a password." });
    }
    const user = conn.query("SELECT * FROM demo WHERE email = ?", [email]);

    if (!user) {
      console.log(user);
      res.send({
        success: false,
        msg: "user does not found",
      });
    }

    const comparison = await bcrypt.compare(password, user.password);
    if (!comparison) {
      res.send({
        success: false,
        msg: "password does not match",
      });
    }

    if (user.status === "pending") {
      return res.json({
        success: false,
        message: "please verify your account",
      });
    }
    return res.send({
      success: true,
      msg: "login successful",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
