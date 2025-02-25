const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./src/routers")
let port = process.env.PORT || 5000 ; 
let db = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(router)

app.listen(port,() => console.log("Server is running!"))