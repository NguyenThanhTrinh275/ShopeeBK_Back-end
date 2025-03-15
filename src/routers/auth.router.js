const AuthController = require("../controllers/AuthController");
const checkRefreshToken = require("../middlewares/checkRefreshToken");
const express = require("express");
const router = express.Router(); 
var passport = require('passport');


router.get('/login/google', passport.authenticate('google'));
router.get("/oauth2/redirect/google", passport.authenticate("google"),
    (req, res) => {
        console.log("✅ Đã đăng nhập thành công!");
        res.send("Đăng nhập thành công!");
    }
);
router.post("/login", async (req, res,next) => {
    AuthController.login(req, res,next);
});

// Router này chỉ nhận token refresh trên header để cấp accessToken mới
router.post("/refresh",checkRefreshToken,async(req, res, next) =>{
    AuthController.refreshToken(req, res, next)
})

module.exports = router

