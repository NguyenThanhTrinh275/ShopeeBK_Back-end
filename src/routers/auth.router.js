const AuthenticationController = require("../controllers/AuthenticationController");

const express = require("express");
const router = express.Router(); 


router.post("/log-in", async (req, res,next) => {
    await AuthenticationController.authenticate(req, res,next);
});
router.post("/verify", async(req, res, next) =>{
    await AuthenticationController.verify(req, res, next)
})
module.exports = router