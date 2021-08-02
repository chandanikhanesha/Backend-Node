const express = require("express");
const router = express.Router();

const auth = require("../MiddleWare/auth");

const Signup = require("../controller/Signup");
const UserLogin = require("../controller/UserLogin");
const Forgot = require("../controller/Forgot");
const ChangePass = require("../controller/ChangePass");
const Reset = require("../controller/Reset");
const Verify = require("../controller/Verify");
const Google = require("../controller/Google");
const Facebook = require("../controller/Facebook");
const Comments = require("../controller/Comments");
const Payment = require("../controller/Payment");

router.post("/signup", Signup.signup);
router.post("/login", UserLogin.login);
router.get("/verify/:token", Verify.verify);

router.post("/forgot", Forgot.forgot);
router.post("/reset/:token", Reset.reset);
router.post("/change", ChangePass.changepassword);

router.post("/google", Google.google);
router.post("/facebook", Facebook.facebook);
router.post("/comments", Comments.comments);
router.post("/payment", Payment.payment);

// router.get("/logout", function (req, res) {
//   res.redirect("https://accounts.google.com/logout");
// });
// router.delete("/logout", async (req, res) => {
//   await req.session.destroy();
//   res.status(200);
//   res.json({
//     message: "Logged out successfully",
//   });
// });
// router.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/login");
// });

module.exports = router;
