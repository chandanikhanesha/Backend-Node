const mongoose = require("mongoose");
const Comm = require("../models/commentModel");
const User = require("../models/userModel");

exports.comments = async (req, res) => {
  try {
    const comment = [req.body.comment];
    const postid = req.body.postid;
    const commentid = req.body.commentid;
    console.log(comment, postid);
    const user = await User.findOne().exec();
    console.log("user", user);

    const comm = new Comm({
      commentid: req.body.commentid,
      comment: [req.body.comment],
      postedby: user.email,
      postid: req.body.postid,
    });

    comm.save(function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      Comm.find().sort({ postedby: 1 });

      var name = user.email;
      name = name.substring(0, name.length - 10);
      console.log(name);
      console.log(comm.comment);

      return res.json({
        postedby: name,
        postid: comm.postid,
        commentid: comm.commentid,
        success: true,
        message: "your comments is submmited",
        comment: comm.comment,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
