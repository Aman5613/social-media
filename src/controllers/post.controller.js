const storageUpload = require("../services/storage.services");
const postModel = require("../Models/posts.model");
const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");


// create post controller
const createPostController = async (req, res) => {
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

//   console.log(user);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // image ko cloud pe upload karne ke liye
  //   const img = await storageUpload(req.file);

  // post create karne ke liye hai
  const post = await postModel.create({
    img_url: "dumy-url",
    content: req.body.content,
    author: user._id,
  });

  //   console.log(post);

  res.status(201).json({
    message: "post created successfully!",
    your_post: post,
  });
};


module.exports = {
    createPostController
}