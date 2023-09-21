const expr = require("express");
const router = expr.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

router.get("/getrecommendedusers", fetchuser, async (req, res) => {
  try {
    const users = await User.find({followers:{$ne: req.user.id}}).select("-password");
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

router.post("/addfollower", fetchuser, async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { followers: userId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { followings: req.user.id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $pull: { requested: req.user.id } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

router.delete("/unfollow/:id", fetchuser, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { followings: req.params.id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { followers: req.user.id } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

router.post("/followback", fetchuser, async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { followings: userId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $push: { followers: req.user.id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { requests: userId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

router.delete("/removerequest/:id", fetchuser, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { requests: req.params.id } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

router.post("/addrequest", fetchuser, async (req, res) => {
  try {
    const { userId } = req.body;
    let user = await User.find({ _id: userId, requests: req.user.id });
    if (user.length === 0) {
      await User.findByIdAndUpdate(
        userId,
        { $push: { requests: req.user.id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { requested: userId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { requests: req.user.id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user.id,
        { $pull: { requested: userId } },
        { new: true }
      );
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal Server Error occured!!");
  }
});

module.exports = router;
