const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');

router.get('/', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const restaurants = await Restaurant.countDocuments();
    
    // You can add more stats as needed
    res.json({
      users: users || 50000,
      orders: orders || 100000,
      restaurants: restaurants || 500,
      deliveries: 95000
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;