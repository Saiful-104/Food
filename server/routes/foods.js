const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const { protect, admin } = require('../middleware/auth');

// @desc    Get all foods
// @route   GET /api/foods
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      restaurant, 
      cuisine, 
      vegetarian, 
      vegan, 
      glutenFree,
      minPrice,
      maxPrice,
      page = 1, 
      limit = 12 
    } = req.query;

    const query = { isAvailable: true };

    if (category) query.category = category;
    if (restaurant) query.restaurant = restaurant;
    if (cuisine) query.cuisine = cuisine;
    if (vegetarian === 'true') query.isVegetarian = true;
    if (vegan === 'true') query.isVegan = true;
    if (glutenFree === 'true') query.isGlutenFree = true;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const foods = await Food.find(query)
      .populate('restaurant', 'name address deliveryFee')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const total = await Food.countDocuments(query);

    res.json({
      foods,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get single food
// @route   GET /api/foods/:id
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create food (admin only)
// @route   POST /api/foods
router.post('/', protect, admin, async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update food (admin only)
// @route   PUT /api/foods/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      Object.assign(food, req.body);
      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Delete food (admin only)
// @route   DELETE /api/foods/:id
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      await food.remove();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;