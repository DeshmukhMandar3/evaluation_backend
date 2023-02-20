const express = require("express");
const { alreadyExists } = require("../middlewares/UserMiddlewares");
const { userModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", alreadyExists, (req, res) => {
  bcrypt.hash(req.body.password, 5, async function (err, hash) {
    if (hash) {
      try {
        const user = new userModel({ ...req.body, password: hash });
        await user.save();
        res.send("Registered Successfully");
      } catch (err) {
        res.send(`err:${err}`);
      }
    } else {
      res.send(`err:${err}`);
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.find({ email });
  if (user.length > 0) {
    const token = jwt.sign({ id: user[0]._id }, "shhhhh");
    bcrypt.compare(password, user[0].password, function (err, result) {
      if (result) {
        res.send({ msg: "User Logged In successfully", token });
      } else {
        res.send("Wrong Password");
      }
    });
  } else {
    res.send("Wrong Email");
  }
});

module.exports = { userRouter };
