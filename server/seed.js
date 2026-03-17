const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Restaurant = require("./models/Restaurant");
const Food = require("./models/Food");
const dotenv = require("dotenv");

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/foodexpress",
    );
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Food.deleteMany({});
    console.log("Cleared existing data");

    // Create demo users
    const users = await User.create([
      {
        name: "Demo User",
        email: "user@demo.com",
        password: "Demo123",
        role: "user",
        phone: "+1234567890",
      },
      {
        name: "Admin User",
        email: "admin@demo.com",
        password: "Admin123",
        role: "admin",
        phone: "+1234567891",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "Password123",
        role: "user",
        phone: "+1234567892",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "Password123",
        role: "user",
        phone: "+1234567893",
      },
    ]);
    console.log(`✅ Created ${users.length} demo users`);

    // Create demo restaurants
    const restaurants = await Restaurant.create([
      {
        name: "Pizza Paradise",
        description: "Authentic Italian pizzas with fresh ingredients",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
        cuisines: ["Italian", "Pizza"],
        deliveryFee: 2.99,
        minOrder: 15,
        rating: 4.8,
        totalRatings: 245,
        address: "123 Main St, City, State",
        phone: "+1-555-0101",
        hours: "10:00 AM - 11:00 PM",
        isActive: true,
      },
      {
        name: "Burger House",
        description: "Delicious burgers and fast food",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        cuisines: ["American", "Burgers"],
        deliveryFee: 1.99,
        minOrder: 12,
        rating: 4.6,
        totalRatings: 189,
        address: "456 Oak Ave, City, State",
        phone: "+1-555-0102",
        hours: "11:00 AM - 10:00 PM",
        isActive: true,
      },
      {
        name: "Sushi Master",
        description: "Premium Japanese sushi and rolls",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
        cuisines: ["Japanese", "Sushi"],
        deliveryFee: 3.99,
        minOrder: 25,
        rating: 4.9,
        totalRatings: 312,
        address: "789 Park Rd, City, State",
        phone: "+1-555-0103",
        hours: "12:00 PM - 11:00 PM",
        isActive: true,
      },
      {
        name: "Taco Fiesta",
        description: "Authentic Mexican tacos and burritos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
        cuisines: ["Mexican", "Tacos"],
        deliveryFee: 2.49,
        minOrder: 10,
        rating: 4.7,
        totalRatings: 267,
        address: "321 Elm St, City, State",
        phone: "+1-555-0104",
        hours: "10:30 AM - 11:30 PM",
        isActive: true,
      },
    ]);
    console.log(`✅ Created ${restaurants.length} demo restaurants`);

    // Create demo foods
    const foods = await Food.create([
      // Pizza Paradise foods
      {
        name: "Margherita Pizza",
        description: "Fresh mozzarella, tomato sauce, and basil",
        price: 12.99,
        images: [
          "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
        ],
        category: "Main Course",
        cuisine: "Italian",
        restaurant: restaurants[0]._id,
        ingredients: ["Tomato Sauce", "Mozzarella", "Basil", "Olive Oil"],
        nutritionalInfo: { calories: 250, protein: 8, carbs: 35, fat: 8 },
        isVegetarian: true,
        rating: 4.8,
        totalRatings: 89,
        preparationTime: "20-25 min",
      },
      {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and mozzarella",
        price: 14.99,
        images: [
          "https://images.unsplash.com/photo-1628840042765-356cda07f4ee",
        ],
        category: "Main Course",
        cuisine: "Italian",
        restaurant: restaurants[0]._id,
        ingredients: ["Tomato Sauce", "Mozzarella", "Pepperoni"],
        nutritionalInfo: { calories: 320, protein: 16, carbs: 35, fat: 12 },
        isVegetarian: false,
        rating: 4.7,
        totalRatings: 156,
        preparationTime: "25-30 min",
      },
      // Burger House foods
      {
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with melted cheddar cheese",
        price: 9.99,
        images: [
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        ],
        category: "Main Course",
        cuisine: "American",
        restaurant: restaurants[1]._id,
        ingredients: [
          "Beef Patty",
          "Cheddar Cheese",
          "Tomato",
          "Lettuce",
          "Onion",
        ],
        nutritionalInfo: { calories: 450, protein: 25, carbs: 40, fat: 20 },
        isVegetarian: false,
        rating: 4.6,
        totalRatings: 234,
        preparationTime: "15-20 min",
      },
      {
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables",
        price: 10.99,
        images: [
          "https://images.unsplash.com/photo-1585238341710-4913ec62f180",
        ],
        category: "Main Course",
        cuisine: "American",
        restaurant: restaurants[1]._id,
        ingredients: ["Plant-based Patty", "Avocado", "Tomato", "Lettuce"],
        nutritionalInfo: { calories: 380, protein: 15, carbs: 45, fat: 12 },
        isVegetarian: true,
        isVegan: true,
        rating: 4.5,
        totalRatings: 87,
        preparationTime: "15-20 min",
      },
      // Sushi Master foods
      {
        name: "California Roll",
        description: "Crab, cucumber, and avocado roll",
        price: 8.99,
        images: [
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
        ],
        category: "Main Course",
        cuisine: "Japanese",
        restaurant: restaurants[2]._id,
        ingredients: ["Crab", "Cucumber", "Avocado", "Rice", "Nori"],
        nutritionalInfo: { calories: 180, protein: 8, carbs: 30, fat: 4 },
        isVegetarian: false,
        rating: 4.9,
        totalRatings: 312,
        preparationTime: "15-18 min",
      },
      // Taco Fiesta foods
      {
        name: "Chicken Tacos",
        description: "Three soft shell tacos with grilled chicken",
        price: 11.99,
        images: [
          "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
        ],
        category: "Main Course",
        cuisine: "Mexican",
        restaurant: restaurants[3]._id,
        ingredients: [
          "Chicken",
          "Corn Tortilla",
          "Lettuce",
          "Tomato",
          "Cheese",
        ],
        nutritionalInfo: { calories: 320, protein: 28, carbs: 32, fat: 8 },
        isVegetarian: false,
        isSpicy: true,
        rating: 4.7,
        totalRatings: 198,
        preparationTime: "18-22 min",
      },
    ]);
    console.log(`✅ Created ${foods.length} demo food items`);

    console.log("\n✅ Database seeded successfully!");
    console.log(`   Users: ${users.length}`);
    console.log(`   Restaurants: ${restaurants.length}`);
    console.log(`   Foods: ${foods.length}`);
    console.log("\nDemo Credentials:");
    console.log("   User: user@demo.com / Demo123");
    console.log("   Admin: admin@demo.com / Admin123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

// Run seed script
seedDatabase();
