const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/userModel');
const { isAdmin } = require('../middleware/authMiddleware');

// ==============================
// Authentication Routes
// ==============================

// Login Routes
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Register Routes (Customer only)
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Logout
router.get('/logout', authController.logout);

// ==============================
// Admin: Manage Customers
// ==============================

// View all customers
router.get('/admin/customers', isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' }).lean();
    res.render('admin/customers', {
      users,
      user: req.session.user
    });
  } catch (err) {
    console.error('❌ Failed to fetch customers:', err);
    res.status(500).send('Error fetching customers');
  }
});

// Delete customer
router.post('/admin/customers/delete/:id', isAdmin, async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    if (userToDelete) {
      await userToDelete.deleteOne(); // 🔁 Triggers the Mongoose middleware to delete orders
    }
    res.redirect('/admin/customers');
  } catch (err) {
    console.error('❌ Failed to delete customer:', err);
    res.status(500).send('Error deleting customer');
  }
});

module.exports = router;
