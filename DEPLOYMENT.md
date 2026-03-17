# 🚀 Deployment Guide - FoodExpress

This guide covers deploying the FoodExpress application to production environments.

## System Architecture

```
┌─────────────────┐
│  Frontend       │
│  (Vercel/       │◄───────────────────────────┐
│   Netlify)      │                            │
└────────┬────────┘                            │
         │                                     │
         │ HTTPS                               │
         │                                     │
┌────────▼──────────────────────────────────┐ │
│         API Gateway / Load Balancer        │ │
│         (Optional - for scalability)       │ │
└────────┬──────────────────────────────────┘ │
         │                                     │
         │ HTTPS (REST API)                    │
         │                                     │
┌────────▼──────────────────────────────────┐ │
│        Backend Server                      │ │
│        (Node.js/Express)                   │ │
│        (Render/Railway/VPS)                │ │
└────────┬──────────────────────────────────┘ │
         │                                     │
         │ MongoDB Connection String           │
         │                                     │
┌────────▼──────────────────────────────────┐ │
│     MongoDB Atlas / Database               │ │
│     (Cloud hosted or self-managed)         │ │
└──────────────────────────────────────────┘ │
                                              │
                   Image Storage (Optional)   │
                   Cloudinary/AWS S3 ─────────┘
```

## Table of Contents

1. [Frontend Deployment](#frontend-deployment)
2. [Backend Deployment](#backend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Security Considerations](#security-considerations)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

---

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js/Vite)

#### Prerequisites

- Vercel account (vercel.com)
- GitHub account with repository

#### Steps

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Select the `client` folder as the root directory

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically rebuild on push

#### Deployment URL

Your app will be available at: `https://your-project-name.vercel.app`

### Option 2: Netlify

#### Prerequisites

- Netlify account (netlify.com)
- GitHub account with repository

#### Steps

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   Go to Site Settings → Build & Deploy → Environment:

   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Option 3: GitHub Pages

#### Steps

1. **Add github-pages dependency**

   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

2. **Update package.json**

   ```json
   {
     "homepage": "https://yourusername.github.io/nemesis-project",
     "scripts": {
       "build": "vite build",
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Backend Deployment

### Option 1: Render (Easy - Recommended)

#### Prerequisites

- Render account (render.com)
- GitHub account with repository

#### Steps

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `foodexpress-api` (or your project name)
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free (for development) or Paid (for production)

3. **Add Environment Variables**
   Go to "Environment" tab and add:

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodexpress?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_with_random_characters_12345
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.com
   PORT=10000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy

#### Get Your Backend URL

The backend will be available at: `https://your-service-name.onrender.com`

### Option 2: Railway

#### Prerequisites

- Railway account (railway.app)
- GitHub account with repository

#### Steps

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Select Repository and Branch**
   - Choose your nemesis-project repository
   - Select the main branch

3. **Add Services**
   - Add MongoDB service
   - Add Node.js service

4. **Configure Node Service**
   - Set root directory to `server`
   - Set start command: `npm start`

5. **Environment Variables**
   Under Variables, add:

   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.com
   ```

6. **Deploy**
   - Click "Deploy"

### Option 3: VPS (Advanced - Full Control)

#### Prerequisites

- Ubuntu 20.04 or later VPS
- SSH access
- Domain name (optional but recommended)

#### Steps

1. **SSH into Server**

   ```bash
   ssh root@your_server_ip
   ```

2. **Update System**

   ```bash
   apt update
   apt upgrade -y
   ```

3. **Install Node.js and npm**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   apt-get install -y nodejs
   node --version
   npm --version
   ```

4. **Install PM2 (Process Manager)**

   ```bash
   npm install -g pm2
   ```

5. **Install MongoDB (if self-hosted)**

   ```bash
   apt-get install -y mongodb
   systemctl start mongodb
   systemctl enable mongodb
   ```

6. **Clone Repository**

   ```bash
   cd /home/user
   git clone https://github.com/yourusername/nemesis-project.git
   cd nemesis-project/server
   ```

7. **Install Dependencies**

   ```bash
   npm install
   ```

8. **Create .env file**

   ```bash
   nano .env
   ```

   Add production values:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/foodexpress
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.com
   ```

9. **Start with PM2**

   ```bash
   pm2 start server.js --name "foodexpress-api"
   pm2 startup
   pm2 save
   ```

10. **Setup Nginx as Reverse Proxy** (Optional but recommended)

    ```bash
    apt-get install -y nginx
    ```

    Create `/etc/nginx/sites-available/foodexpress`:

    ```nginx
    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

    Enable the site:

    ```bash
    ln -s /etc/nginx/sites-available/foodexpress /etc/nginx/sites-enabled/
    nginx -t
    systemctl restart nginx
    ```

11. **Setup SSL with Let's Encrypt** (Recommended)
    ```bash
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d your-domain.com
    ```

---

## Database Setup

### MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Create" on the dashboard
   - Choose free tier
   - Select your region (closest to your server)
   - Name your cluster

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Copy the connection string

4. **Allow IP Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (or specify your IP)

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Copy the MongoDB URI
   - Replace username and password in your .env:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/foodexpress?retryWrites=true&w=majority
   ```

### Self-Hosted MongoDB

For production, ensure MongoDB is running with authentication:

```bash
# Start MongoDB with authentication
mongod --auth --dbpath /var/lib/mongodb

# In mongo shell
mongo admin
db.createUser({
  user: "admin",
  pwd: "your_secure_password",
  roles: [{role: "root", db: "admin"}]
})

db.createUser({
  user: "foodexpress",
  pwd: "your_secure_password",
  roles: [{role: "readWrite", db: "foodexpress"}]
})
```

---

## Environment Variables

### Frontend (.env.production)

```bash
# Production API URL (update with your backend URL)
VITE_API_URL=https://your-backend-url.com/api

# Optional analytics
# VITE_GOOGLE_ANALYTICS_ID=G_XXXXXXXXXXXXXXX
```

### Backend (.env.production)

```bash
# Server Configuration
PORT=10000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodexpress?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=change_this_to_a_long_random_string_with_special_characters_1234567890!@#$%
JWT_EXPIRE=30d

# CORS Configuration (your frontend URL)
CLIENT_URL=https://your-frontend-url.com

# Optional: File Upload (Cloudinary)
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email Service (for notifications)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password

# Optional: Payment Gateway
# STRIPE_PUBLIC_KEY=pk_live_xxxxxxxx
# STRIPE_SECRET_KEY=sk_live_xxxxxxxx
```

---

## Security Considerations

### 1. **Environment Variables**

- ✅ Never commit `.env` files
- ✅ Use `.env.example` for templates
- ✅ Use strong JWT_SECRET (at least 32 characters)
- ✅ Store secrets in platform-specific secret management

### 2. **HTTPS/SSL**

- ✅ Always use HTTPS in production
- ✅ Use Let's Encrypt for free SSL certificates
- ✅ Ensure CORS is configured correctly

### 3. **Database Security**

- ✅ Use strong passwords for database users
- ✅ Enable authentication on MongoDB
- ✅ Restrict database access by IP
- ✅ Use encrypted connections

### 4. **API Security**

- ✅ Implement rate limiting
- ✅ Validate all inputs server-side
- ✅ Use JWT for authentication
- ✅ Hash passwords with bcrypt
- ✅ Implement CORS properly

### 5. **Secrets Management**

For VPS deployment:

```bash
# Create secure env file with restricted permissions
touch /var/www/foodexpress/.env
chmod 600 /var/www/foodexpress/.env
```

### 6. **Firewall Configuration**

```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp

# Deny everything else
ufw default deny incoming
ufw default allow outgoing
ufw enable
```

---

## Monitoring & Maintenance

### 1. **PM2 Monitoring**

```bash
# View logs
pm2 logs foodexpress-api

# Monitor in real-time
pm2 monit

# View process details
pm2 show foodexpress-api

# Restart after crash
pm2 restart foodexpress-api
```

### 2. **Database Backups**

For MongoDB Atlas, automatic backups are enabled. For self-hosted:

```bash
# Backup
mongodump --archive=foodexpress_backup.archive \
  --uri="mongodb://user:password@localhost/foodexpress"

# Restore
mongorestore --archive=foodexpress_backup.archive \
  --uri="mongodb://user:password@localhost/foodexpress"
```

### 3. **Monitoring Dashboard**

Consider using:

- **Uptime Robot** - for uptime monitoring
- **Loggly/LogStash** - for log aggregation
- **New Relic** - for application performance monitoring
- **Sentry** - for error tracking

### 4. **Performance Optimization**

```bash
# Enable gzip compression
apt-get install -y gzip

# Use Node clustering (if on large VPS)
npm install cluster
```

---

## Troubleshooting

### Issue: Backend not connecting to MongoDB

**Solution:**

```bash
# Check MongoDB is running
systemctl status mongodb

# Check connection string in .env
# Verify username/password are correct
# Check IP whitelist on MongoDB Atlas
```

### Issue: CORS errors

**Solution:**
Update `CLIENT_URL` in backend .env:

```env
CLIENT_URL=https://your-actual-frontend-url.com
```

### Issue: 502 Bad Gateway on Render/Railway

**Solution:**

1. Check server logs
2. Verify environment variables are set
3. Check if MongoDB is accessible
4. Increase plan if on free tier

### Issue: Vercel deployment fails

**Solution:**

1. Delete `client/node_modules` and `.next` (if exists)
2. Ensure package.json is in client directory
3. Check build output for errors
4. Verify VITE_API_URL is set

### Issue: Slow response times

**Solution:**

1. Enable caching in nginx
2. Use MongoDB indexes
3. Optimize database queries
4. Enable gzip compression
5. Consider upgrading server resources

---

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database is running and accessible
- [ ] Environment variables are set correctly
- [ ] HTTPS/SSL is enabled
- [ ] CORS is configured properly
- [ ] Email notifications working (if implemented)
- [ ] Payment gateway configured (if using payments)
- [ ] Monitoring is set up
- [ ] Backups are scheduled
- [ ] DNS records are updated (if using domain)
- [ ] Tested all key features:
  - [ ] User registration
  - [ ] User login
  - [ ] Demo login
  - [ ] Food browsing and filtering
  - [ ] Add to cart
  - [ ] Checkout
  - [ ] Admin dashboard
  - [ ] Contact form

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Node.js Best Practices**: https://nodejs.org/en/docs/guides/nodejs-dev-guide-to-http2/
- **Express Security**: https://expressjs.com/en/advanced/best-practice-security.html

---

**Last Updated**: March 17, 2026  
**Version**: 1.0.0

For questions or support, please create an issue in the repository.
