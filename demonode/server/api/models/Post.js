const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  comments: [{ type: Schema.Types.ObjectId, ref: "comm" }],
});
module.exports = mongoose.model("Post", postSchema);
