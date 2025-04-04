const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');

// GET: List all products
exports.getAllProducts = async (req, res) => {
  const user = req.session.user;
  const search = req.query.search?.toLowerCase() || '';
  const category = req.query.category || '';

  let products = await Product.find().lean();

  if (category && category !== 'all') {
    products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    products = products.filter(p =>
      p.name?.toLowerCase().includes(search) ||
      p.description?.toLowerCase().includes(search)
    );
  }

  const categories = [...new Set(products.map(p => p.category))];

  const renderPage = user?.role === 'admin' ? 'admin/dashboard' : 'customer/index';
  res.render(renderPage, {
    products,
    user,
    search,
    category,
    categories
  });
};

// GET: Add Product Form
exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    error: null,
    product: null,
    categories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'],
    user: req.session.user
  });
};

// POST: Add Product
exports.postAddProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      categoryDropdown,
      newCategory,
      imageType,
      imageUrl,
      description
    } = req.body;

    const category = newCategory || categoryDropdown;
    const numericPrice = parseFloat(price);
    let image = '';

    if (imageType === 'url') {
      image = imageUrl?.trim();
    } else if (req.file) {
      image = '/uploads/' + req.file.filename;
    }

    const errors = [];

    // 👇 Add upload error from file filter (if any)
    if (req.fileUploadError) errors.push(req.fileUploadError);

    if (!name || name.trim().length < 3) errors.push("Product name must be at least 3 characters.");
    if (isNaN(numericPrice) || numericPrice <= 0) errors.push("Price must be a positive number.");
    if (!category) errors.push("Category is required.");
    if (!description || description.trim().length < 10) errors.push("Description must be at least 10 characters.");
    if (!image) errors.push("Product image is required.");
    if (imageType === 'url') {
      const validUrl = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
      if (!validUrl.test(image)) errors.push("Image URL must end with jpg, jpeg, png, gif, or webp.");
    }

    if (errors.length > 0) {
      return res.render('admin/add-product', {
        error: errors.join(' '),
        product: req.body,
        categories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'],
        user: req.session.user
      });
    }

    const product = new Product({
      name: name.trim(),
      price: numericPrice,
      category: category.trim(),
      description: description.trim(),
      image,
      imageType
    });

    await product.save();
    res.redirect('/products');
  } catch (err) {
    console.error(' Failed to add product:', err);
    res.render('admin/add-product', {
      error: 'Something went wrong while adding the product.',
      product: req.body,
      categories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'],
      user: req.session.user
    });
  }
};

// GET: Edit Product Form
exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.redirect('/products');

    res.render('admin/add-product', {
      error: null,
      product,
      categories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'],
      user: req.session.user
    });
  } catch (err) {
    console.error(' Failed to load product for editing:', err);
    res.redirect('/products');
  }
};

// POST: Update Product
exports.putEditProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId || !productId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error(' Invalid or missing product ID');
      return res.redirect('/products');
    }

    const {
      name,
      price,
      categoryDropdown,
      newCategory,
      imageType,
      imageUrl,
      description
    } = req.body;

    const category = newCategory || categoryDropdown;
    const numericPrice = parseFloat(price);
    let image = '';

    if (imageType === 'url') {
      image = imageUrl?.trim();
    } else if (req.file) {
      image = '/uploads/' + req.file.filename;
    }

    const updatedProduct = {
      name: name?.trim(),
      price: numericPrice,
      category: category?.trim(),
      description: description?.trim(),
      imageType
    };

    if (image) updatedProduct.image = image;

    const errors = [];

    // 👇 Include upload error if any
    if (req.fileUploadError) errors.push(req.fileUploadError);

    if (!name || name.trim().length < 3) errors.push("Product name must be at least 3 characters.");
    if (isNaN(numericPrice) || numericPrice <= 0) errors.push("Price must be a positive number.");
    if (!category) errors.push("Category is required.");
    if (!description || description.trim().length < 10) errors.push("Description must be at least 10 characters.");
    if (!updatedProduct.image) errors.push("Product image is required.");
    if (imageType === 'url') {
      const validUrl = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
      if (!validUrl.test(updatedProduct.image)) errors.push("Image URL must end with jpg, jpeg, png, gif, or webp.");
    }

    if (errors.length > 0) {
      return res.render('admin/add-product', {
        error: errors.join(' '),
        product: { ...req.body, _id: productId },
        categories: ['Living Room', 'Bedroom', 'Office', 'Dining', 'Outdoor'],
        user: req.session.user
      });
    }

    await Product.findByIdAndUpdate(productId, updatedProduct);
    res.redirect('/products');
  } catch (err) {
    console.error('Failed to update product:', err);
    res.redirect('/products');
  }
};

// POST: Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    console.error('Failed to delete product:', err);
    res.redirect('/products');
  }
};

// GET: Product details page
exports.getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('customer/product-details', {
      product,
      user: req.session.user
    });
  } catch (err) {
    console.error('Failed to load product details:', err);
    res.status(500).send('Error loading product details');
  }
};

