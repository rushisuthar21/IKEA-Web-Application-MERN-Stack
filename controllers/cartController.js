const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// POST: Add product to cart
exports.addToCart = async (req, res) => {
  const userId = req.session.user?._id;
  const productId = req.body.productId;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, quantity: 1 });
  }

  await cart.save();
  res.redirect('/cart');
};

// GET: Display cart page
exports.getCart = async (req, res) => {
  const userId = req.session.user._id;

  const cart = await Cart.findOne({ userId })
    .populate('items.productId') //  Fix: Properly populate product data
    .lean();

  res.render('customer/cart', {
    cart,
    user: req.session.user
  });
};

// POST: Remove item from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.session.user._id;
  const productId = req.body.productId;

  await Cart.updateOne(
    { userId },
    { $pull: { items: { productId } } }
  );

  res.redirect('/cart');
};


// POST: Update item quantity in cart
exports.updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.session.user._id;
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) return res.redirect('/cart');
  
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.quantity = Math.max(1, parseInt(quantity)); // Prevent quantity < 1
      }
  
      await cart.save();
      res.redirect('/cart');
    } catch (err) {
      console.error('❌ Failed to update quantity:', err);
      res.status(500).send('Failed to update cart quantity.');
    }
  };
  
