const express = require("express");
const { postModel } = require("../models/PostModel");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const { userid } = req.body;
  let device = {};
  if (req.query && req.query.device) {
    device = { device: req.query.device };
  }
  try {
    const posts = await postModel.find({ $and: [{ userid: userid }, device] });
    res.send(posts);
  } catch (err) {
    res.send(`err: ${err}`);
  }
});

postRouter.get("/top", async (req, res) => {
  const { userid } = req.body;
  try {
    const posts = await postModel.find({ userid }).sort({ no_of_comments: -1 });
    res.send(posts[0]);
  } catch (err) {
    res.send(`err: ${err}`);
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  try {
    await postModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.send("Updated Post");
  } catch (err) {
    res.send(`err:${err}`);
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  try {
    await postModel.findByIdAndDelete({ _id: req.params.id });
    res.send("Deleted Post");
  } catch (err) {
    res.send(`err:${err}`);
  }
});

postRouter.post("/add", async (req, res) => {
  try {
    const post = new postModel(req.body);
    await post.save();
    res.send("Post Added Successfully");
  } catch (err) {
    res.send(`err:${err}`);
  }
});

module.exports = { postRouter };
