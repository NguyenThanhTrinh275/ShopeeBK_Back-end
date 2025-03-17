const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AuthController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/oauth2/redirect/google',
    scope: [ 'profile' , 'email' ],
    state: true
}, async (accessToken, refreshToken, profile, done) => {
    try {        
        const user = await userController.findOrCreateUser(profile);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));



module.exports = passport;
