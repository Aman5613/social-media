const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");

const authMiddleware = async (req, res, next) => {
  // user ko fin karne ke liye:  token -> decrypt -> user
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized - login first",
    });
  }

  const decrypt = jwt.verify(token, process.env.JWT_SECRET);

  //   console.log(decrypt);

  const user = await userModel.findOne({ _id: decrypt.id }).select("-password");

  if (!user)
    return res.status(400).json({
      message: "Invalid token - login again",
    });

  //   console.log(user);

  req.user = user;

  next();
};

module.exports = {
  authMiddleware,
};
