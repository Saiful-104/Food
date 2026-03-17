# 🍕 FoodExpress - Food Delivery Platform

A modern, full-stack food delivery application built with React, Express, and MongoDB. This project demonstrates a production-ready implementation of a complex web application with real-time features, role-based authentication, and a comprehensive admin dashboard.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Requirements Met](#project-requirements-met)
- [Deployment](#deployment)
- [Demo Credentials](#demo-credentials)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features

- **Account Management**
  - User registration and login with JWT authentication
  - Email validation
  - Password hashing with bcrypt
  - Profile management with image upload
  - Address management for deliveries

- **Food Discovery**
  - Browse all available foods from restaurants
  - Advanced search with multiple filters (category, cuisine, price range, ratings)
  - Sorting options (price, rating, newest, preparation time)
  - Detailed food information with images, nutritional data, and reviews
  - Restaurant discovery and ratings

- **Ordering System**
  - Add items to cart with quantity selection
  - View cart with cost calculation (subtotal, tax, delivery fee)
  - Secure checkout process
  - Multiple payment method options
  - Order tracking with real-time updates
  - Order history and details

- **User Dashboard**
  - Overview with order statistics
  - My Orders page with filtering and search
  - Favorite items management
  - Saved delivery addresses
  - Account settings

### Admin Features

- **Admin Dashboard**
  - Real-time statistics (users, orders, revenue, restaurants, food items, ratings)
  - Quick action menu for common tasks
  - Recent orders monitoring

- **User Management**
  - Search and filter users by role
  - View user details and order history
  - User status management

- **Food Management**
  - Create new food items with images and details
  - Edit existing food items
  - Delete food items
  - Category and availability management
  - Nutritional information tracking

- **Order Management**
  - View all orders with detailed information
  - Filter by status (pending, preparing, on delivery, delivered)
  - Update order status
  - Track delivery progress

- **Restaurant Management**
  - Add new restaurants
  - Edit restaurant details
  - Manage restaurant status
  - View restaurant performance metrics

- **Reports & Analytics**
  - Generate custom reports
  - Sales analytics
  - User activity reports
  - Download reports as files

### Design & UX

- **Design System**
  - 3 primary colors: Red (#ff4d3b), Blue (#0ea5e9), Purple (#a855f7)
  - Consistent spacing system using 8px grid
  - Unified border-radius (rounded-xl = 12px)
  - Consistent typography scale

- **Dark Mode**
  - Full dark mode support throughout the application
  - Proper contrast ratios for accessibility
  - Smooth theme transitions
  - Toggle button in navbar

- **Responsive Design**
  - Mobile-first approach
  - Fully responsive for mobile, tablet, and desktop
  - No horizontal scrolling or layout breaking
  - Hamburger menu for mobile navigation
  - Responsive grid system (1-2 columns on mobile, up to 4 on desktop)

- **Performance**
  - Image optimization with lazy loading
  - React Query for efficient data fetching and caching
  - Code splitting for faster initial load
  - Skeleton loaders for better UX
  - Optimized bundle size

### Components Library

- **Reusable Components**
  - `Button` - Primary, secondary, and outline variants
  - `Input` - Text inputs with validation states
  - `Card` - Consistent card component with hover effects
  - `Badge` - Status badges with multiple colors
  - `Modal` - Accessible modal dialogs
  - `Table` - Data tables with sorting and pagination
  - `Dropdown` - Custom dropdown menus
  - `Pagination` - Page navigation component
  - `Navbar` - Sticky navigation with profile menu
  - `Footer` - Consistent footer across all pages

### Forms & Validation

- **Client-Side Validation**
  - React Hook Form integration
  - Real-time validation feedback
  - Custom error messages
  - Field-level validation rules

- **Server-Side Validation**
  - Express Validator middleware
  - Input sanitization
  - Business logic validation
  - Error response standardization

- **Forms Implemented**
  - Login form with email and password validation
  - Registration form with password confirmation
  - Contact form with message validation
  - Profile update form
  - Checkout form with address validation
  - Admin food creation and edit forms
  - Admin order management forms

### Authentication & Security

- **JWT-Based Authentication**
  - Token generation and validation
  - Token expiration (30 days)
  - Secure token storage in localStorage
  - Automatic token refresh on page load
  - Protected routes for authenticated users

- **Role-Based Access Control**
  - User and Admin roles
  - Role-based route protection
  - Admin-only operations
  - View-level authorization

- **Security Measures**
  - Bcrypt password hashing
  - CORS configuration
  - Environment variable protection
  - No sensitive data in frontend code

## 🛠 Technology Stack

### Frontend

- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context API + React Query
- **Form Handling**: React Hook Form
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Carousel**: React Slick
- **UI Icons**: React Icons
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Intersection Observer**: React Intersection Observer for lazy loading

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: Express Validator
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary integration
- **CORS**: CORS middleware
- **Environment Variables**: dotenv
- **Development**: Nodemon for auto-reload

## 📁 Project Structure

```
nemesis-project/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── AdminRoute.jsx       # Admin route protection
│   │   │   ├── CategoryCard.jsx     # Category display card
│   │   │   ├── Dropdown.jsx         # Dropdown menu component
│   │   │   ├── FoodCard.jsx         # Food item card
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── Modal.jsx            # Modal dialog
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Newsletter.jsx       # Newsletter signup
│   │   │   ├── OrderCard.jsx        # Order card display
│   │   │   ├── Pagination.jsx       # Pagination controls
│   │   │   ├── PrivateRoute.jsx     # Private route protection
│   │   │   ├── Table.jsx            # Data table component
│   │   │   └── TestimonialCard.jsx  # Testimonial display
│   │   ├── context/                # Context providers
│   │   │   ├── AuthContext.jsx      # Authentication logic
│   │   │   └── ThemeContext.jsx     # Dark/Light mode
│   │   ├── hooks/                  # Custom React hooks (future)
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx             # Landing/home page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── Explore.jsx          # Food exploration page
│   │   │   ├── FoodDetails.jsx      # Food detail view
│   │   │   ├── RestaurantDetails.jsx # Restaurant view
│   │   │   ├── About.jsx            # About us page
│   │   │   ├── Contact.jsx          # Contact form page
│   │   │   ├── Blog.jsx             # Blog listing
│   │   │   ├── Privacy.jsx          # Privacy policy
│   │   │   ├── Terms.jsx            # Terms of service
│   │   │   ├── Cart.jsx             # Shopping cart
│   │   │   ├── Checkout.jsx         # Checkout page
│   │   │   ├── Dashboard.jsx        # User dashboard layout
│   │   │   ├── DashboardOverview.jsx # Dashboard home
│   │   │   ├── Profile.jsx          # User profile
│   │   │   ├── Orders.jsx           # Orders list
│   │   │   └── admin/               # Admin pages
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── CreateFood.jsx
│   │   │       ├── EditFood.jsx
│   │   │       ├── ManageFoods.jsx
│   │   │       ├── ManageOrders.jsx
│   │   │       ├── ManageRestaurants.jsx
│   │   │       ├── ManageUsers.jsx
│   │   │       └── Reports.jsx
│   │   ├── utils/                  # Utility functions
│   │   ├── App.jsx                 # Root component
│   │   ├── index.css               # Global styles
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env                         # Environment variables (local)
│   ├── .env.example                 # Environment template
│   └── .gitignore

└── server/                          # Express Backend
    ├── models/                     # MongoDB schemas
    │   ├── User.js
    │   ├── Food.js
    │   ├── Order.js
    │   ├── Restaurant.js
    │   └── Contact.js
    ├── routes/                     # API endpoints
    │   ├── auth.js                 # Authentication routes
    │   ├── users.js                # User management
    │   ├── foods.js                # Food items
    │   ├── orders.js               # Orders
    │   ├── restaurants.js          # Restaurants
    │   ├── contact.js              # Contact forms
    │   ├── stats.js                # Statistics
    │   └── testimonials.js         # Testimonials
    ├── middleware/                 # Custom middleware
    │   ├── auth.js                 # JWT verification
    │   └── validation.js           # Input validation
    ├── config/                     # Configuration
    │   └── database.js             # MongoDB connection
    ├── utils/                      # Utility functions
    │   └── generateToken.js        # JWT token generation
    ├── server.js                   # Entry point
    ├── package.json
    ├── .env                        # Environment variables (local)
    ├── .env.example                # Environment template
    └── .gitignore
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Git

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd nemesis-project
```

### Step 2: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your MongoDB URI and JWT_SECRET
# Then start the server
npm run dev
```

### Step 3: Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## 🔐 Environment Configuration

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

For production:

```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodexpress
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

**Important**: Never commit `.env` files. Use `.env.example` as a template for deployment.

## 🎯 Running the Application

### Development Mode

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Production Build

```bash
# Frontend
cd client
npm run build
npm run preview

# Backend
cd server
NODE_ENV=production npm start
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/demo` - Demo login
- `GET /api/auth/profile` - Get current user profile (Protected)

### User Endpoints

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin only)

### Food Endpoints

- `GET /api/foods` - Get all foods with filters, search, and pagination
- `GET /api/foods/:id` - Get food details
- `POST /api/foods` - Create new food (Admin only)
- `PUT /api/foods/:id` - Update food (Admin only)
- `DELETE /api/foods/:id` - Delete food (Admin only)

### Order Endpoints

- `GET /api/orders` - Get user orders (Protected)
- `POST /api/orders` - Create new order (Protected)
- `PUT /api/orders/:id` - Update order status (Admin only)

### Restaurant Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (Admin only)
- `PUT /api/restaurants/:id` - Update restaurant (Admin only)

### Other Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/stats` - Get platform statistics
- `GET /api/testimonials` - Get testimonials

## ✅ Project Requirements Met

### ✅ Global UI & Design Rules

- [x] 3 Primary colors (Red, Blue, Purple) + Neutral colors
- [x] Light and Dark mode support
- [x] Proper contrast ratios in dark mode
- [x] Consistent 8px spacing grid
- [x] Unified border-radius (12px = rounded-xl)
- [x] Consistent typography scale
- [x] Reusable component library (Button, Input, Card, Badge, Modal, Table, Dropdown)
- [x] Fully responsive (Mobile, Tablet, Desktop)
- [x] No horizontal overflow or layout breaking
- [x] Hamburger menu on mobile
- [x] Responsive grid system (1-4 columns)

### ✅ Forms Standard

- [x] Client-side validation on all forms
- [x] Server-side validation
- [x] Error messages displayed
- [x] Success messages
- [x] Loading states (spinner/disabled buttons)
- [x] Proper label usage
- [x] Accessible inputs connected with labels
- [x] Forms: Login, Register, Contact, Profile Update, Checkout

### ✅ Home/Landing Page

- [x] Sticky navbar with logo and 4+ routes (logged out), 6+ routes (logged in)
- [x] Advanced dropdown (Profile menu)
- [x] Responsive design
- [x] Hero section (60-70% viewport height)
- [x] Clear heading and subheading
- [x] Strong CTA button
- [x] Interactive elements (image carousel with autoplay)
- [x] Dynamic statistics section
- [x] 8+ Meaningful sections:
  - Hero with carousel
  - Statistics
  - Features
  - Categories
  - Featured foods
  - Testimonials
  - Newsletter signup
  - Blog preview
- [x] Footer with links, contact info, social links, copyright

### ✅ Core Listing/Card Section

- [x] Image, title, description, meta info (price, rating)
- [x] "View Details" button
- [x] Consistent card styling (height, width, border-radius)
- [x] Desktop: 4 cards per row
- [x] Responsive grid layout
- [x] Skeleton loaders
- [x] Data from backend (no hardcoded data)

### ✅ Details Page

- [x] Publicly accessible
- [x] Image gallery with carousel
- [x] Content sections (description, specifications)
- [x] Reviews/ratings
- [x] Related items section

### ✅ Explore/Listing Page

- [x] Search bar (functional)
- [x] 2+ filtering fields (category, cuisine, price range, dietary)
- [x] Sorting options (price, rating, preparation time)
- [x] Pagination
- [x] Backend filtering
- [x] Mobile-responsive filter toggle

### ✅ Authentication System

- [x] Login page with validation
- [x] Registration page with validation
- [x] Password validation (min 6 chars, letter + number)
- [x] JWT-based authentication
- [x] Protected routes
- [x] Role-based middleware (User/Admin)
- [x] Demo login buttons
- [x] Password hashing (bcrypt)
- [x] Token expiration handling (30d)

### ✅ Role-Based Dashboard

- [x] User dashboard with 4+ menu items (Overview, Orders, Profile, Settings, etc.)
- [x] Admin dashboard with 6+ menu items (Overview, Manage Users, Items, Orders, Restaurants, Settings)
- [x] Overview cards with dynamic data
- [x] Charts (implemented with Recharts)
- [x] Data tables with pagination, sorting, filtering
- [x] Action buttons (Edit, Delete, View)
- [x] Profile page with image upload, info edit, password change

### ✅ Additional Pages

- [x] About
- [x] Contact (with working form)
- [x] Blog
- [x] Privacy Policy
- [x] Terms & Conditions

### ✅ Backend Requirements

- [x] Express server
- [x] MongoDB with Mongoose
- [x] Proper modular structure (models, routes, middleware)
- [x] API route separation
- [x] Error handling middleware
- [x] Proper status codes
- [x] Password hashing (bcrypt)
- [x] Input validation
- [x] CORS configuration
- [x] Role-based access control

### ✅ Performance Optimization

- [x] Image optimization
- [x] Lazy loading (React Intersection Observer)
- [x] Code splitting (Vite auto-splitting)
- [x] Avoided unnecessary re-renders (React Query caching)
- [x] Production-ready build

### ✅ Code Quality

- [x] Clean folder structure
- [x] Reusable components
- [x] Custom hooks ready (hooks directory)
- [x] Environment variables used
- [x] No console logs in production code
- [x] Meaningful commit messages recommended

### ✅ Deployment Ready

- [x] Frontend build optimized for deployment
- [x] Backend configured with environment variables
- [x] .env.example files provided
- [x] .gitignore configured to protect secrets
- [x] CORS configured for production
- [x] Production env var configuration documented

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
4. Deploy

#### Netlify

1. Add build command: `npm run build`
2. Add publish directory: `dist`
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy

### Backend Deployment (Render/Railway/Heroku)

#### Render

1. Connect GitHub repository
2. Create new Web Service
3. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   CLIENT_URL=your_frontend_url
   ```
4. Deploy

#### Railway

1. Create new project
2. Connect GitHub repo
3. Add MongoDB service
4. Set environment variables
5. Deploy

#### VPS (Ubuntu/DigitalOcean/Linode)

```bash
# SSH into server
ssh user@server_ip

# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone and setup repository
git clone your-repo-url
cd nemesis-project/server
npm install
cp .env.example .env
# Edit .env with production values

# Start with PM2
pm2 start server.js --name "foodexpress-api"
pm2 startup
pm2 save
```

## 👤 Demo Credentials

### User Account

- **Email**: user@demo.com
- **Password**: Demo123

### Admin Account

- **Email**: admin@demo.com
- **Password**: Admin123

_Or use the "Demo User" / "Demo Admin" buttons on the login page_

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Developer**: Saiful Islam  
**Version**: 1.0.0  
**Last Updated**: March 17, 2026

For questions or support, please create an issue in the repository.
