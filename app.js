const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/google.config");
const mongoose = require("mongoose");
const router = require("./src/routers");
const errorHandler = require('./src/middlewares/errorHandler')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const sequelize = require("./src/config/database");

let port = process.env.PORT || 5000 ; 
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
mongoose.connect(db);

app.use(session({
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Để `true` nếu dùng HTTPS
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.json());
app.use('/api' , router); 
app.use(errorHandler);

app.listen(port,() => console.log(`Server is running in port ${port}`))