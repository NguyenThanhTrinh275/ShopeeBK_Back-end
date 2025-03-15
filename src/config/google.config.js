const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/oauth2/redirect/google',
    scope: [ 'profile' , 'email' ],
    state: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await authService.findOrCreateUser(profile);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.findUser({ _id: id });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
