const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

// CUSTOMER ROUTES
router.get('/checkout', isAuthenticated, orderController.getCheckout);
router.post('/checkout', isAuthenticated, orderController.postCheckout);
router.get('/payment', isAuthenticated, orderController.getPaymentPage);
router.post('/payment', isAuthenticated, orderController.postPayment);
router.get('/invoice', isAuthenticated, orderController.getInvoice);
router.get('/my', isAuthenticated, orderController.getMyOrders);

// ADMIN ROUTES
router.get('/admin/orders', isAuthenticated, isAdmin, orderController.getAllOrders);
router.post('/admin/orders/:id/status', isAuthenticated, isAdmin, orderController.updateOrderStatus);
router.get('/admin/orders/:id', isAuthenticated, isAdmin, orderController.getOrderDetails);


module.exports = router;
