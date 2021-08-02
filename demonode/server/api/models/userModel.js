const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,

  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },

  isactive: {
    type: Number,
    default: 1,
  },
  userID: String,
  // comments: [{ String }],
});

module.exports = mongoose.model("User", UserSchema);
