const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");
const bcrypt = require("bcryptjs");

// register controller
const registerController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username : username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "user register sucessfully",
  });
};

// login controller
const loginController = async (req, res) => {
  
  if (!req.body)
    return res.status(204).json({
      message: "enter username and password",
    });
  const { username, password } = req.body;
  const user = await userModel.findOne({
    username: username,
  });
  if (!user)
    return res.status(400).json({
      message: "user not found - register first",
    });

  if ( ! await bcrypt.compare(password, user.password))
    return res.status(401).json({
      message: "password incorrect",
    });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    message: "user login successfully!",
  });
};

// logout controller
const logoutController = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "user logged out",
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
