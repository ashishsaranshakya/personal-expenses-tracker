export const cookieSessionFix = (req, res, next) => {
    // Stub out missing regenerate and save functions.
    // These don't make sense for client side sessions.
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
        cb();
        };
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
        cb();
        };
    }
    next();
}