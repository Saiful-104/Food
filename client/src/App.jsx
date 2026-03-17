import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Explore from "./pages/Explore";
import FoodDetails from "./pages/FoodDetails";
import RestaurantDetails from "./pages/RestaurantDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageFoods from "./pages/admin/ManageFoods";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
import Reports from "./pages/admin/Reports";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/food/:id" element={<FoodDetails />} />
                  <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetails />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />

                  {/* Protected Routes - Dashboard with Nested Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<DashboardOverview />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="addresses" element={<Addresses />} />
                    <Route
                      path="settings"
                      element={
                        <div className="text-center py-12">
                          <h2 className="text-2xl font-bold mb-4">
                            Account Settings
                          </h2>
                          <p className="text-neutral-600 dark:text-neutral-400">
                            Settings page coming soon
                          </p>
                        </div>
                      }
                    />
                  </Route>

                  {/* Other Protected Routes */}
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <Cart />
                      </PrivateRoute>
                    }
                  />

                  <Route
                    path="/checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/users"
                    element={
                      <AdminRoute>
                        <ManageUsers />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/foods"
                    element={
                      <AdminRoute>
                        <ManageFoods />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <ManageOrders />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/restaurants"
                    element={
                      <AdminRoute>
                        <ManageRestaurants />
                      </AdminRoute>
                    }
                  />

                  <Route
                    path="/admin/reports"
                    element={
                      <AdminRoute>
                        <Reports />
                      </AdminRoute>
                    }
                  />

                  {/* 404 - Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>

      {/* React Query Devtools - only in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
