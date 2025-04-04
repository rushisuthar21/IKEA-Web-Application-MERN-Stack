const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },         // Can be URL or uploaded path
  imageType: { type: String },     // 'url' or 'upload'
  description: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
