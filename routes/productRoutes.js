const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// ===== Multer Configuration =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const allowedTypes = /jpeg|jpg|png|gif|webp/;

const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

// ===== Wrapper to handle Multer errors gracefully =====
function handleUpload(middleware) {
  return (req, res, next) => {
    middleware(req, res, function (err) {
      if (err instanceof multer.MulterError || err?.message?.includes('Only image files')) {
        req.fileUploadError = err.message; // store error in request
        return next(); // continue to controller
      } else if (err) {
        return next(err); // other unexpected error
      }
      next(); // no error
    });
  };
}

// ===== Routes =====

// Public
router.get('/', productController.getAllProducts);

// Admin Routes
router.get('/add', isAuthenticated, isAdmin, productController.getAddProduct);
router.post(
  '/add',
  isAuthenticated,
  isAdmin,
  handleUpload(upload.single('imageUpload')),
  productController.postAddProduct
);

router.get('/edit/:id', isAuthenticated, isAdmin, productController.getEditProduct);
router.post(
  '/edit/:id',
  isAuthenticated,
  isAdmin,
  handleUpload(upload.single('imageUpload')),
  productController.putEditProduct
);

router.post('/delete/:id', isAuthenticated, isAdmin, productController.deleteProduct);


router.get('/:id', productController.getProductDetails);


module.exports = router;
