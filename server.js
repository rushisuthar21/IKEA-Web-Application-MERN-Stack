const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');


dotenv.config();
const app = express();


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes('Only image files')) {
    return res.render('admin/add-product', {
      error: err.message,
      product: req.body,
      categories: ['Living Room', 'Hall', 'Floor', 'Bedroom', 'Office', 'Dining', 'Outdoor', 'Kids Room', 'Car Parking'],
      user: req.session.user
    });
  }

  console.error('🔥 Unhandled Error:', err);
  res.status(500).send('Something went wrong.');
});

app.use("/public", express.static("public"));

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'customer', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'customer', 'contact.html'));
});

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve uploaded images

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// ===== View Engine =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== Routes =====
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/', authRoutes);             // Enables /login, /register
app.use('/products', productRoutes);  // Admin & customer product views
app.use('/cart', cartRoutes);         // User cart
app.use('/orders', orderRoutes);      // Checkout, payment, invoice

// ===== Default Redirect =====
app.get('/', (req, res) => {
  res.redirect('/products'); // Default landing
});

// ===== Admin Seeder =====
const User = require('./models/userModel');
const seedAdmin = async () => {
  const exists = await User.findOne({ email: 'admin@store.com' });
  if (!exists) {
    const admin = new User({
      name: 'Admin',
      email: 'admin@store.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('🛠️ Admin seeded: admin@store.com / admin123');
  }
};
seedAdmin();

// ===== Start Server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
