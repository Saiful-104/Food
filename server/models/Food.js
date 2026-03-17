const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: Number,
  images: [String],
  category: {
    type: String,
    required: true,
    enum: [
      "Appetizers",
      "Main Course",
      "Desserts",
      "Beverages",
      "Salads",
      "Soups",
      "Specials",
    ],
  },
  cuisine: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  ingredients: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  isGlutenFree: {
    type: Boolean,
    default: false,
  },
  isSpicy: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  preparationTime: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for production performance
foodSchema.index({ category: 1 });
foodSchema.index({ restaurant: 1 });
foodSchema.index({ isAvailable: 1 });
foodSchema.index({ rating: -1 });
foodSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Food", foodSchema);
