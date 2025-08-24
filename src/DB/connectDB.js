const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("DB connected"))
};

module.exports = connectToDB
