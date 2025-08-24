const app = require("./src/app");
const connectToDB = require("./src/DB/connectDB");
const router = require("./src/routers/auth.route");
const postRouter = require("./src/routers/post.routers");
const port  = process.env.PORT ||  4000;


app.use('/auth', router)

app.use('/posts', postRouter)


connectToDB();

app.listen(port, () => {
    console.log("server is running on port", port)
})