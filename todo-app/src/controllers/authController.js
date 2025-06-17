const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Sign up
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.flash('success', 'Registration successful! You can now log in.');
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'Error during registration. Please try again.');
        res.redirect('/signup');
    }
};

// Login
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', 'Invalid username or password.');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Login successful!');
            return res.redirect('/dashboard');
        });
    })(req, res, next);
};

// Logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have logged out successfully.');
        res.redirect('/login');
    });
};