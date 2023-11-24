import dotenv from 'dotenv';
dotenv.config();
import googleOauthConfig from "/etc/secrets/googleOauthConfig.json" assert { type: "json" };

export default {
    baseUrl: process.env.BASE_URL,
    api_version: process.env.API_VERSION,
    google: {
        client_id: googleOauthConfig.web.client_id,
        client_secret: googleOauthConfig.web.client_secret,
        callbackURL: `${process.env.BASE_URL}/api/${process.env.API_VERSION}/auth/google/callback`
    },
    mongoDB: {
        url: process.env.MONGO_URL
    },
    session: {
        cookieKey1: process.env.COOKIE_KEY_1
    }
}