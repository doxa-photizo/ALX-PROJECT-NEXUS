// API Configuration
// Update this file to switch between different API endpoints

// USE MOCK API (set to false when backend is ready)
export const USE_MOCK_API = false;

// Backend API URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://velostore.shop/api";

// Alternative: Use local backend for development
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// API Timeout (milliseconds)
export const API_TIMEOUT = 10000000;

// Enable/Disable API calls (useful for UI-only development)
export const ENABLE_API = true;
