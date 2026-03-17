const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

// @desc    Submit contact form
// @route   POST /api/contact
router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ 
      message: 'Message sent successfully',
      contact 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
router.get('/', protect, admin, async (req, res) => {
  try {
    const messages = await Contact.find().sort('-createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Update contact message status (admin only)
// @route   PUT /api/contact/:id
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (message) {
      message.status = req.body.status || message.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;