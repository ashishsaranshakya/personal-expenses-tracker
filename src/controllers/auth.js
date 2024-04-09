import passport from "passport";

export const googleLogin = (req, res, next) => {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (isLoggedIn) {
        res.redirect('/');
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: '/api/v1/auth/google',
        successRedirect: '/',
        session: true,
    })(req, res, next);
};


export const logout = function(req, res){
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.json({success: true, message: 'Logged out successfully'});
    });
}