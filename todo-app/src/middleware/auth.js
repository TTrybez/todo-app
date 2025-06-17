const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = {
    authMiddleware,
    isAuthenticated
};