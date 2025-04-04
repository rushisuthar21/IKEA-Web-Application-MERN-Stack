const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// GET: Show checkout form
exports.getCheckout = (req, res) => {
  res.render('customer/checkout', {
    user: req.session.user,
    error: null,
    formData: {} // For re-filling form values if error occurs
  });
};

// POST: Handle checkout submission
exports.postCheckout = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || !cart.items.length || !cart.items.some(i => i.productId)) {
      return res.redirect('/cart');
    }

    const { name, email, phone, address } = req.body;

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      return res.render('customer/checkout', {
        user: req.session.user,
        error: 'Invalid phone number. Please use a 10-digit number.',
        formData: { name, email, phone, address }
      });
    }

    const totalAmount = cart.items.reduce((sum, item) => {
      if (!item.productId) return sum;
      return sum + item.productId.price * item.quantity;
    }, 0);

    const newOrder = new Order({
      userId,
      items: cart.items
        .filter(i => i.productId)
        .map(i => ({
          productId: i.productId._id,
          quantity: i.quantity
        })),
      customerDetails: { name, email, phone, address },
      totalAmount
    });

    const savedOrder = await newOrder.save();
    await Cart.deleteOne({ userId });

    req.session.latestOrderId = savedOrder._id;
    res.redirect('/orders/payment');
  } catch (err) {
    console.error('Checkout Error:', err);
    res.status(500).send('Something went wrong during checkout.');
  }
};

// GET: Show payment form
exports.getPaymentPage = (req, res) => {
  res.render('customer/payment', {
    user: req.session.user,
    error: null
  });
};

// POST: Validate and simulate payment
exports.postPayment = (req, res) => {
  const { cardNumber, expiry, cvv } = req.body;
  const errors = [];

  // Card number must be 16 digits
  if (!/^\d{16}$/.test(cardNumber)) {
    errors.push('Card number must be 16 digits.');
  }

  // Expiry in MM/YY format and not in past
  const [monthStr, yearStr] = expiry.split('/');
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear() % 100;

  if (!monthStr || !yearStr || isNaN(monthStr) || isNaN(yearStr)) {
    errors.push('Expiry date must be in MM/YY format.');
  } else {
    const mm = parseInt(monthStr);
    const yy = parseInt(yearStr);

    if (mm < 1 || mm > 12 || yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      errors.push('Expiry date must be in the future.');
    }
  }

  // CVV must be 3 digits
  if (!/^\d{3}$/.test(cvv)) {
    errors.push('CVV must be 3 digits.');
  }

  if (errors.length > 0) {
    return res.render('customer/payment', {
      user: req.session.user,
      error: errors.join(' ')
    });
  }

  // Simulate successful payment
  res.redirect('/orders/invoice');
};

// GET: Show invoice
exports.getInvoice = async (req, res) => {
  try {
    const orderId = req.query.orderId || req.session.latestOrderId;

    if (!orderId) return res.redirect('/orders/my');

    const order = await Order.findById(orderId)
      .populate('items.productId')
      .lean();

    if (!order || String(order.userId) !== String(req.session.user._id)) {
      return res.status(403).send('Unauthorized access to invoice.');
    }

    res.render('customer/invoice', {
      order,
      user: req.session.user
    });
  } catch (err) {
    console.error(' Invoice Error:', err);
    res.status(500).send('Failed to load invoice.');
  }
};

// GET: Admin view all orders
exports.getAllOrders = async (req, res) => {
  try {
    const query = req.query.search?.toLowerCase() || '';
    const statusFilter = req.query.status || '';

    const orders = await Order.find()
      .populate('items.productId')
      .populate('userId')
      .lean();

    let filteredOrders = orders;

    if (query) {
      filteredOrders = filteredOrders.filter(order =>
        order.customerDetails?.name?.toLowerCase().includes(query) ||
        order.customerDetails?.email?.toLowerCase().includes(query)
      );
    }

    if (statusFilter && statusFilter !== 'all') {
      filteredOrders = filteredOrders.filter(order =>
        (order.status || 'Pending') === statusFilter
      );
    }

    res.render('admin/orders', {
      orders: filteredOrders,
      search: query,
      statusFilter,
      user: req.session.user
    });
  } catch (err) {
    console.error('Failed to load orders:', err);
    res.status(500).send('Error loading orders');
  }
};

// POST: Admin update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Order.findByIdAndUpdate(id, { status });
    res.redirect('/orders/admin/orders');
  } catch (err) {
    console.error('Failed to update status:', err);
    res.status(500).send('Error updating order status');
  }
};

// GET: Customer's My Orders
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const orders = await Order.find({ userId })
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .lean();

    res.render('customer/my-orders', {
      orders,
      user: req.session.user
    });
  } catch (err) {
    console.error('Failed to load customer orders:', err);
    res.status(500).send('Could not load your orders');
  }
};

// GET: Order details (admin)
exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId')
      .lean();

    if (!order) return res.status(404).send('Order not found');

    res.render('admin/order-details', {
      order,
      user: req.session.user
    });
  } catch (err) {
    console.error('Failed to load order details:', err);
    res.status(500).send('Something went wrong');
  }
};
