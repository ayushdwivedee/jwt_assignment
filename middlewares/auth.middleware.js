const blacklistedTokens = require("../blacklist");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];
    if (blacklistedTokens.includes(token)) {
      return res
        .status(501)
        .json({ msg: "you are logged out , please login again" });
    }

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(500).json({ msg: "unauthorized or login first" });
      }
      if (decoded) {
        req.body._id = decoded._id;
        next();
      }
    });
  } else {
    return res.status(501).json({ msg: "headers missing" });
  }
};

module.exports = auth;
