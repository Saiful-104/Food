const express = require('express');
const router = express.Router();

// Sample testimonials - you can later connect to database
const testimonials = [
  {
    _id: '1',
    user: 'John Doe',
    rating: 5,
    comment: 'Best food delivery service! The food always arrives hot and fresh.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    _id: '2',
    user: 'Jane Smith',
    rating: 5,
    comment: 'Amazing variety of restaurants. The tracking feature is super useful.',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    _id: '3',
    user: 'Mike Johnson',
    rating: 4,
    comment: 'Great app, user-friendly interface. Love the quick delivery.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

router.get('/', (req, res) => {
  res.json(testimonials);
});

module.exports = router;