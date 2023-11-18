import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../configs/config.js';
import User from '../models/User.js';

passport.serializeUser(function (user, done) {
    done(null, { id: user.id });
});

passport.deserializeUser(async function (user, done) {
    const savedUser = await User.findById(user.id);
    done(null, savedUser);
});

passport.use(new GoogleStrategy(
    {
        clientID: config.google.client_id,
        clientSecret: config.google.client_secret,
        callbackURL: `${config.baseUrl}/api/${config.api_version}/auth/google/callback`
    },
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        const user = await User.findOne({ provider: 'google', provider_id: profile.id });
        if (!user) {
            const newUser = new User({
                provider: 'google',
                provider_id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                profile_picture_url: profile.photos[0].value
            });
            await newUser.save();
            return cb(null, newUser);
        }
        cb(null, user);
    }
));