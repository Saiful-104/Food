const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all restaurants
// @route   GET /api/restaurants
router.get('/', async (req, res) => {
  try {
    const { cuisine, city, minRating, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };

    if (cuisine) query.cuisine = { $in: cuisine.split(',') };
    if (city) query['address.city'] = city;
    if (minRating) query.rating = { $gte: Number(minRating) };

    const restaurants = await Restaurant.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Restaurant.countDocuments(query);

    res.json({
      restaurants,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create restaurant (admin only)
// @route   POST /api/restaurants
router.post('/', protect, admin, async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update restaurant (admin only)
// @route   PUT /api/restaurants/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      Object.assign(restaurant, req.body);
      const updatedRestaurant = await restaurant.save();
      res.json(updatedRestaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete restaurant (admin only)
// @route   DELETE /api/restaurants/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      await restaurant.remove();
      res.json({ message: 'Restaurant removed' });
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;