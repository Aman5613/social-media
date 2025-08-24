const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({ username, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user register sucessfully",
  });
});

router.post("/login", async (req, res) => {
//   if (!req.cookies) {
//     if (!req.body)
//       return res.status(204).json({
//         message: "enter username and password",
//       });
//     const { username, password } = req.body;
//     const user = await userModel.findOne({
//       username: username,
//     });
//     if (!user)
//       return res.status(400).json({
//         message: "user not found - register first",
//       });

//     if (password != user.password)
//       return res.status(401).json({
//         message: "password incorrect",
//       });

//     return res.status(200).json({
//       message: "user login successfully!",
//     });
//   }
  const token = req.cookies.token;

  const decrypt = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findOne({ _id: decrypt.id }).select("-password");

  res.status(200).json({
    message: "user login sucessfully",
    user: user,
  });
});

module.exports = router;
