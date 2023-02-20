const jwt = require("jsonwebtoken");

const Authorize = (req, res, next) => {
  jwt.verify(req.headers.authorization, "shhhhh", function (err, decoded) {
    if (decoded) {
      req.body.userid = decoded.id;
      next();
    } else {
      res.send(`err : ${err}`);
    }
  });
};

module.exports = { Authorize };
