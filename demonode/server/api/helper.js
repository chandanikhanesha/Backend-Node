const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: process.env.GMAIL_SERVICE_NAME,
  auth: {
    user: process.env.GMAIL_USER_NAME,
    pass: process.env.GMAIL_USER_PASSWORD,
  },
});

var returnval = (req, res) => {
  return res.status(404).send({
    message: "User does not  exists",
  });
};

exports.transporter = transporter;
exports.returnval = returnval;
