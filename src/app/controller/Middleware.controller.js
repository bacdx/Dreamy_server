// checkLogin.js
function checkLogin(req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = checkLogin;
