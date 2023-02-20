const { userModel } = require("../models/UserModel");

const alreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.find({ email });
  if (user.length > 0) {
    res.send("User Already Exists, Please Login");
  } else {
    next();
  }
};

module.exports = { alreadyExists };
