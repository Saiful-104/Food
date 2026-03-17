// Debug utility for API testing
// Add this file at: client/src/utils/apiDebug.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const debugAPI = async () => {
  console.clear();
  console.log("🔍 API Debug Report");
  console.log("====================\n");

  console.log("1️⃣  API Base URL:", API_URL);
  console.log("2️⃣  Environment:", import.meta.env.MODE);

  // Test each endpoint
  const endpoints = [
    { name: "Stats", url: "/stats", method: "GET" },
    { name: "Testimonials", url: "/testimonials", method: "GET" },
    { name: "Foods (limit 1)", url: "/foods?limit=1", method: "GET" },
    {
      name: "Restaurants (limit 1)",
      url: "/restaurants?limit=1",
      method: "GET",
    },
  ];

  console.log("\n📡 Testing Endpoints:\n");

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_URL}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(`✅ ${endpoint.name} (${response.status})`);
      console.log(`   URL: ${API_URL}${endpoint.url}`);
      console.log(`   Data:`, data);
    } catch (error) {
      console.error(`❌ ${endpoint.name}`);
      console.error(`   Error: ${error.message}`);
    }
  }

  // Test demo login
  console.log("\n🔑 Testing Demo Login:\n");
  try {
    const response = await fetch(`${API_URL}/auth/demo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: "user" }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`✅ Demo Login Successful (${response.status})`);
      console.log(`   User: ${data.name}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Token: ${data.token?.substring(0, 20)}...`);
    } else {
      console.error(`❌ Demo Login Failed (${response.status})`);
      console.error(`   Message: ${data.message}`);
    }
  } catch (error) {
    console.error(`❌ Demo Login Error`);
    console.error(`   Error: ${error.message}`);
  }

  console.log("\n✨ Debug report complete! Check console for details.");
};

// Call this in browser console or on page load for testing
// Usage: import { debugAPI } from '@/utils/apiDebug'; debugAPI();
