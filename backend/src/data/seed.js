require('dotenv').config();
const mongoose = require('mongoose');
const products = require('./products');
const Product = require('../models/Product');
const User = require('../models/User');

const seed = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('Set MONGO_URI before running seed');
    }

    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shoplane.dev';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Shoplane Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seed();
