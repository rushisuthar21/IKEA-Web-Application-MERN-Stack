const User = require('../models/userModel');

// GET: Login Page
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    error: null,
    user: req.session.user || null
  });
};

// POST: Login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.render('auth/login', {
        error: 'Invalid email or password',
        user: null
      });
    }

    req.session.user = user;

    res.redirect('/products');
  } catch (err) {
    console.error('Login error:', err);
    res.render('auth/login', {
      error: 'Something went wrong. Please try again.',
      user: null
    });
  }
};

// GET: Register Page
exports.getRegister = (req, res) => {
  res.render('auth/register', {
    error: null,
    user: req.session.user || null
  });
};

// POST: Register
exports.postRegister = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('auth/register', {
        error: 'Email already registered',
        user: null
      });
    }

    const user = new User({
      name,
      email,
      password,
      address,
      role: 'customer'
    });

    await user.save();
    req.session.user = user;
    res.redirect('/products');
  } catch (err) {
    console.error('Registration error:', err);
    res.render('auth/register', {
      error: 'Failed to register. Please try again.',
      user: null
    });
  }
};

// GET: Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
