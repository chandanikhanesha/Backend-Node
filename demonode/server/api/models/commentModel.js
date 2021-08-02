const { servicenetworking_v1 } = require("googleapis");
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  commentid: { type: String },

  comment: [String],
  postedby: { type: String, ref: "User" },
  postid: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});
module.exports = mongoose.model("Comm", commentSchema);
