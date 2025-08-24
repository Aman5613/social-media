const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')


const app = express();
app.use(cookieParser())

app.use(express.json())

module.exports = app