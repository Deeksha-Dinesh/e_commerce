const asyncHandler = require('../middleware/asyncHandler');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getProducts = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const query = {};

  if (typeof category === 'string' && category.trim()) query.category = category.trim();
  if (typeof search === 'string' && search.trim()) {
    query.name = { $regex: escapeRegex(search.trim()).slice(0, 80), $options: 'i' };
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  const categories = await Product.distinct('category');
  res.json({ products, categories });
});

const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid product id');
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid product id');
  }

  const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid product id');
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
