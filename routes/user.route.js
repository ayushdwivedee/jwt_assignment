const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../schemas/userModel.schema");
const blacklistedTokens = require("../blacklist");

userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender, age } = req.body;
  try {
    await bcrypt.hash(password, 5, function (err, hash) {
      if (err) {
        return res
          .status(400)
          .json({ msg: `error while hashing the user ${err}` });
      }
      const user = new userModel({
        name,
        email,
        password: hash,
        gender,
        age,
      });
      user.save();
    });
    res.status(201).json({ msg: `user created successfully` });
  } catch (error) {
    res.status(400).json({ msg: `error while registering user ${error}` });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json({ msg: "User not found" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(400).json({ msg: `error while login the user ` });
      }
      if (result) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        return res.status(201).json({ msg: "Login success full", token });
      } else {
        return res.status(400).json({
          msg: `wrong password ,error in result using bcrypt compare the user  `,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: `wrong email ${error}` });
  }
});

userRouter.post("/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  blacklistedTokens.push(token);

  res.status(201).json({ msg: "logout successfully" });
});
module.exports = userRouter;
