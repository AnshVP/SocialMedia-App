const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");

router.get("/fetchallposts", fetchuser, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name profilePic")
      .populate("likes", "name")
      .populate("comments.userId", "name");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchmyposts", fetchuser, async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user.id })
      .populate("postedBy", "_id name profilePic")
      .populate("likes", "name")
      .populate("comments.userId", "name");
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post(
  "/createpost",
  fetchuser,
  [
    body("caption", "Caption may not be empty").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    try {
      const { photo, caption, location } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const post = new Post({
        location,
        caption,
        photo,
        postedBy: req.user.id,
      });
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.put("/likes", fetchuser, async (req, res) => {
  const { postId } = req.body;
  try {
    let post = await Post.find({ _id: postId, likes: req.user.id });
    if (post.length === 0) {
      post = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: req.user.id } },
        { new: true }
      );
      return res.json(post);
    } else {
      post = await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: req.user.id } },
        { new: true }
      );
      return res.json(post);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.put("/addcomment", fetchuser, async (req, res) => {
  const { postId, comment } = req.body;
  try {
    let post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { userId: req.user.id, comment: comment } } },
      { new: true }
    );
    console.log(post);
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.postedBy.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    post = await Post.findByIdAndDelete(req.params.id);
    res.json({ Success: "Post has been deleted", post: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
