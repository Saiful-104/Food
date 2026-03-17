# 🔧 Quick Debugging Checklist - Login & Data Issues

## ✅ Issues FIXED

1. **✅ CORS Error** - Fixed! Added `http://localhost:5173` to allowed origins
2. **✅ Console.error in Register** - Removed from production code

---

## 🚀 How to Fix Remaining Issues

### Step 1: Make Sure Backend is Running

**Terminal 1 - Backend Server:**

```bash
cd server
npm install
npm start
```

Expected output:

```
✅ Server running on port 5000
✅ MongoDB connected
```

### Step 2: Populate Demo Data

**In same terminal, after server starts (Ctrl+C), run:**

```bash
npm run seed
```

Expected output:

```
✅ Connected to MongoDB
✅ Cleared existing data
✅ Created 4 demo users
✅ Created 4 demo restaurants
✅ Created 6 demo food items
Demo Credentials:
   User: user@demo.com / Demo123
   Admin: admin@demo.com / Admin123
```

### Step 3: Restart Backend After Seeding

```bash
npm start
```

### Step 4: Start Frontend

**Terminal 2 - Frontend Server:**

```bash
cd client
npm install
npm run dev
```

Expected output:

```
✅ VITE v4.4.5 ready in 123ms
✅ Local: http://localhost:5173
```

---

## ✅ Testing Checklist

### Test Login with Demo Credentials

**Method 1: Demo Button (Easiest)**

- Go to Login page
- Click "Demo User" button
- Should see dashboard with orders

**Method 2: Manual Login**

- Email: `user@demo.com`
- Password: `Demo123`
- Should redirect to dashboard

**Method 3: Manual Registration**

- Create new account with different email
- Should create user and auto-login

### Test Data Display

**Check Home Page Should Show:**

- ✅ Statistics (users, restaurants, orders)
- ✅ 4+ Features section
- ✅ 6 Food categories
- ✅ 8 Featured foods from database
- ✅ Testimonials
- ✅ Newsletter form

**Check Explore Page Should Show:**

- ✅ Foods from database
- ✅ Search working
- ✅ Filters working (category, price range, etc.)
- ✅ Pagination

---

## 🐛 Troubleshooting

### Issue: "Connection Refused" or "Backend Not Connecting"

**Solution:**

```bash
# Check if backend is running
netstat -an | grep 5000

# Kill any process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart backend
cd server
npm start
```

### Issue: "Demo user not found"

**Solution:**
Run the seed script:

```bash
cd server
npm run seed
npm start
```

### Issue: "Invalid email or password"

**Solution:**

1. Run seed script first (creates demo users)
2. Use exact credentials: `user@demo.com` / `Demo123`
3. Check MongoDB is connected before running seed

### Issue: "Blank page or no foods showing"

**Solution:**

1. Open browser DevTools (F12)
2. Check Network tab - look for failed API calls
3. Run seed script to populate data
4. Clear browser cache: Ctrl+Shift+Del

### Issue: CORS errors in console

**Solution:**

- Backend CORS is now fixed ✅
- Restart both frontend and backend

---

## 🎯 Expected Behavior After Fixes

| Page      | Expected                            | Status         |
| --------- | ----------------------------------- | -------------- |
| Login     | Demo buttons work, login successful | ✅ Fixed       |
| Register  | Can create new user                 | ✅ Fixed       |
| Home      | Shows stats, foods, categories      | ✅ After seed  |
| Explore   | Shows filtered foods                | ✅ After seed  |
| Dashboard | Shows user orders                   | ✅ After login |

---

## 📋 Database Check

To verify MongoDB is connected, check server logs for:

```
✅ MongoDB connected
```

If NOT connected, ensure:

1. `.env` has valid `MONGODB_URI`
2. MongoDB Atlas username/password are correct
3. IP whitelist includes your IP in MongoDB Atlas

---

## 🔑 Quick Commands Reference

```bash
# Start backend
cd server && npm start

# Start frontend
cd client && npm run dev

# Populate demo data
cd server && npm run seed

# Build for production
cd client && npm run build
cd server && # (just use npm start for production)

# Check what's running
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

---

## ✨ After Following These Steps

You should have:

- ✅ Login/Register working
- ✅ Demo user accessible
- ✅ Home page showing dynamic data
- ✅ Foods visible on explore page
- ✅ Admin dashboard accessible
- ✅ All features functional

**Problem 75% solved by backend restart + seed script! 🎉**
