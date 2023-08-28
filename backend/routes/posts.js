const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Post = require("../models/Post");
const { body, validationResult } = require("express-validator");

router.get("/fetchallposts", fetchuser, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
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
      .populate("postedBy", "_id name")
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
    let post = await Post.find({ _id: postId });
    post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { userId: req.user.id, comment: comment } } },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
