const mongoose  = require("mongoose");


const postSchema = mongoose.Schema({
    img_url  : String,
    content : String,
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }
})

const postModel = new mongoose.model("posts", postSchema)

module.exports = postModel