const User = require('../models/userModel');

// GET: Show login page
exports.getLogin = (req, res) => {
    res.render('auth/login', {
        error: null,
        user: req.session.user || null
    });
};

// POST: Handle login
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.render('auth/login', {
            error: 'Invalid credentials',
            user: null
        });
    }

    req.session.user = {
        _id: user._id,
        email: user.email,
        role: user.role
    };

    res.redirect('/products');
};

// GET: Show register page
exports.getRegister = (req, res) => {
    res.render('auth/register', {
        error: null,
        user: null
    });
};

// POST: Handle registration
exports.postRegister = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('auth/register', {
            error: 'Passwords do not match',
            user: null
        });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render('auth/register', {
            error: 'Email already exists',
            user: null
        });
    }

    const newUser = new User({
        email,
        password,
        role: 'customer'
    });

    await newUser.save();

    req.session.user = {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role
    };

    res.redirect('/products');
};

// Logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
