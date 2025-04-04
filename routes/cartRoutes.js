const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Add to cart
router.post('/add', isAuthenticated, cartController.addToCart);

// View cart
router.get('/', isAuthenticated, cartController.getCart);

// Remove from cart
router.post('/remove', isAuthenticated, cartController.removeFromCart);

// Update quantity
router.post('/update', isAuthenticated, cartController.updateQuantity);


module.exports = router;
