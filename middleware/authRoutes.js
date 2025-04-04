const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Register (Customer only)
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Logout
router.get('/logout', authController.logout);

const { isAdmin } = require('../middleware/authMiddleware');
const User = require('../models/userModel');

router.get('/admin/customers', isAdmin, async (req, res) => {
  const users = await User.find({ role: 'customer' }).lean();
  res.render('admin/customers', { users, user: req.session.user });
});

router.post('/admin/customers/delete/:id', isAdmin, async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (userToDelete) {
      await userToDelete.deleteOne(); // 🔁 triggers order deletion
    }
    res.redirect('/admin/customers');
  } catch (err) {
    console.error('❌ Failed to delete user:', err);
    res.status(500).send('Error deleting user');
  }
});


module.exports = router;
