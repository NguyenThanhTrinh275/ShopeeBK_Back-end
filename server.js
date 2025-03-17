const express = require("express");
const app = express();

require("dotenv").config();
require("./src/config/google.config");
const router = require("./src/routers");
const errorHandler = require('./src/exception/errorHandler')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const createAdminAccount = require("./src/util/createAdmin");

const mongoose = require("mongoose");
const db = process.env.MONGO_URL ; 
mongoose.connect(db).then(() => console.log("✅ Kết nối DB thành công!")).catch(err => console.log(err))

let port = process.env.PORT || 3000 ; 

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

createAdminAccount(); // tạo tai khoan admin

app.use(errorHandler); // them middleware xu ly loi

app.listen(port,() => console.log(`Server is running in port ${port}`))