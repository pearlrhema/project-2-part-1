const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json('You are not Authorized. Login to continue.');
    }
    next();
}

module.exports = {
    isAuthenticated
}