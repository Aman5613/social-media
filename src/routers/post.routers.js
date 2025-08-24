const express = require("express");
const multer = require("multer");
const { createPostController } = require("../controllers/post.controller");

const postRouter = express.Router();

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(),
});

// Route for creating posts
postRouter.post("/create-post", upload.single("image"), createPostController);



module.exports = postRouter;
