const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  location: {
    type: String,
    default: "Heaven",
  },
  caption: {
    type: String,
    required: true,
  },
  profilePic: { type: String },
  photo: {
    type: String,
    required: true,
  },
  postedOn: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      comment: { type: String },
    },
  ],
});

module.exports = mongoose.model("posts", PostSchema);
