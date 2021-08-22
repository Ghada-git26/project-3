const requireAuth = (req, res, next) => {
    if (req.session.currentUser) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

function requireAdmin(req, res, next) {
    if (req.session.currentUser && res.locals.isAdmin) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    requireAuth: requireAuth,
    requireAdmin: requireAdmin
};