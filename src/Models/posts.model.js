const mongoose  = require("mongoose");


const postSchema = mongoose.Schema({
    img_url  : String,
    content : String,
    author : String
})

const postModel = new mongoose.model("posts", postSchema)

module.exports = postModel