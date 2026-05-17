import dotenv from 'dotenv';
dotenv.config();

export default {
    baseUrl: process.env.BASE_URL,
    api_version: process.env.API_VERSION,
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/api/${process.env.API_VERSION}/auth/google/callback`
    },
    mongoDB: {
        url: process.env.MONGO_URL
    },
    session: {
        cookieKey1: process.env.COOKIE_KEY_1
    }
}