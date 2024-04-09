import { createAPIError } from '../utils/APIError.js';

export const checkLoggedIn = (req, res, next) => {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        next(createAPIError(401, false, 'You are not logged in'));
    }
    next();
}