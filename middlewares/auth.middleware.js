const jwt = require("jsonwebtoken");
const blacklistedTokensModel = require("../schemas/blacklistedTokens.schema");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(" ")[1];

    const blacklistedTokens = await blacklistedTokensModel.find({ token });

    if (blacklistedTokens && blacklistedTokens.length != 0) {
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
