const AuthController = require("../controllers/AuthController");
const checkRefreshToken = require("../middlewares/checkRefreshToken");
const express = require("express");
const router = express.Router(); 
var passport = require('passport');


router.get('/login/google',  passport.authenticate('google'));

router.get("/oauth2/redirect/google",passport.authenticate("google" , {session: false}),
    async (req, res,next) => {        
        AuthController.loginByGoogle(req, res,next);
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

