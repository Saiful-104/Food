// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Get API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Axios instance
  const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // needed if backend sends cookie
  });

  // Add token to headers
  api.interceptors.request.use(
    (config) => {
      const currentToken = localStorage.getItem("token");
      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Fetch user on app start if token exists
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      logout(); // token invalid
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: newToken, ...userData } = res.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      toast.success("Login successful!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", userData);
      const { token: newToken, ...user } = res.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(user);
      toast.success("Registration successful!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Demo login
  const demoLogin = async (role = "user") => {
    setLoading(true);
    try {
      const res = await api.post("/auth/demo", { role });
      const { token: newToken, ...userData } = res.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      toast.success(`Logged in as demo ${role}`);
      return { success: true };
    } catch (err) {
      toast.error("Demo login failed. Make sure backend is running.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Update user state
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const value = {
    user,
    loading,
    login,
    register: registerUser,
    demoLogin,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
