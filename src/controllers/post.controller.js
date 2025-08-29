const storageUpload = require("../services/storage.services");
const postModel = require("../Models/posts.model");
const genarateCaption = require("../services/ai.service");

// create post controller
const createPostController = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }


  // image ko cloud pe upload karne ke liye
    const img = await storageUpload(req.file);

  
  // gemini se caption generate karne ke liye
  const caption = await genarateCaption(req.file)
  

  // post create karne ke liye hai
  const post = await postModel.create({
    img_url: img.url,
    content: caption,
    author: req.user._id,
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