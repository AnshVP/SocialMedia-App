const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  profilePic: { type: String },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  requested: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
