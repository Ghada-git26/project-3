const express = require("express");
const User = require("../models/User");
const auth = require("../middlewares/requireAuth");
const router = express.Router();

router.get("/me", auth.requireAuth, (req, res, next) => {
    User.findById(req.session.currentUser._id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
});

module.exports = router;