import axios from "axios";
import { adaptProductsForDisplay, adaptOrders } from "./adapters";
import { USE_MOCK_API, API_BASE_URL, API_TIMEOUT } from "./config";
import { mockApi } from "./mockApi";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: API_TIMEOUT,
});

// Add auth token to requests if it exists
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ PRODUCTS ============

export const fetchProducts = async (params?: { category?: number; seller?: number; search?: string; page?: number; page_size?: number }) => {
  if (USE_MOCK_API) {
    const data = await mockApi.fetchProducts(params);
    return {
      results: adaptProductsForDisplay(data.results),
      count: data.count,
      next: data.next,
      previous: data.previous
    };
  }

  const { data } = await api.get("/products/", { params });
  const products = data.results || data;

  // Return structure that supports both paginated and non-paginated (array) responses
  if (Array.isArray(data)) {
    return { results: adaptProductsForDisplay(data), count: data.length, next: null, previous: null };
  }

  return {
    results: adaptProductsForDisplay(products),
    count: data.count,
    next: data.next,
    previous: data.previous
  };
};

export const fetchProduct = async (id: string | number) => {
  if (USE_MOCK_API) {
    const data = await mockApi.fetchProduct(id);
    return adaptProductsForDisplay([data])[0];
  }

  const { data } = await api.get(`/products/${id}/`);
  // Transform to display format
  return adaptProductsForDisplay([data])[0];
};

// Fetch product in raw backend format (for admin/editing)
export const fetchProductRaw = async (id: string | number) => {
  const { data } = await api.get(`/products/${id}/`);
  return data;
};

export const createProduct = async (productData: any) => {
  if (USE_MOCK_API) return mockApi.createProduct(productData);

  const { data } = await api.post("/products/", productData);
  return data;
};

export const updateProduct = async (id: number, productData: any) => {
  const { data } = await api.put(`/products/${id}/`, productData);
  return data;
};

export const deleteProduct = async (id: number) => {
  if (USE_MOCK_API) return mockApi.deleteProduct(id);

  const { data } = await api.delete(`/products/${id}/`);
  return data;
};

// ============ CATEGORIES ============

export const fetchCategories = async () => {
  if (USE_MOCK_API) return mockApi.fetchCategories();

  const { data } = await api.get("/categories/");
  return data.results || data;
};

export const fetchCategory = async (id: number) => {
  const { data } = await api.get(`/categories/${id}/`);
  return data;
};

// ============ AUTHENTICATION ============

export const login = async (credentials: { username: string; password: string }) => {
  if (USE_MOCK_API) return mockApi.login(credentials);

  const { data } = await api.post("/accounts/login/", credentials);
  return data; // Returns { access, refresh }
};

export const register = async (userData: { username: string; email: string; password: string; password2: string }) => {
  const { data } = await api.post("/accounts/register/", userData);
  return data;
};

export const logout = async () => {
  const { data } = await api.post("/accounts/logout/");
  return data;
};

// ============ USER PROFILE ============

export const getUserProfile = async () => {
  const { data } = await api.get("/accounts/profile/me/");
  return data;
};

export const updateUserProfile = async (profileData: any) => {
  const { data } = await api.put("/accounts/profile/me/", profileData);
  return data;
};

// ============ ORDERS ============

export const getUserOrders = async (userId?: number) => {
  let ordersData;
  if (USE_MOCK_API) {
    ordersData = await mockApi.fetchOrders({ user: userId });
  } else {
    const { data } = await api.get("/orders/my-orders/");
    ordersData = data.results || data;
  }
  return adaptOrders(ordersData);
};

export const createOrder = async (userId: number, products: any[]) => {
  if (USE_MOCK_API) return mockApi.createOrder(userId, products);
  const { data } = await api.post("/orders/", { user: userId, lines: products });
  return data;
};

export const fetchOrder = async (id: string | number) => {
  const data = USE_MOCK_API ? await mockApi.fetchOrder(id) : (await api.get(`/orders/${id}/`)).data;
  return data;
};

export const fetchOrders = async (params?: { page?: number; page_size?: number }) => {
  let ordersData;
  if (USE_MOCK_API) {
    ordersData = await mockApi.fetchOrders();
  } else {
    const { data } = await api.get("/orders/", { params });
    ordersData = data.results || data;
  }
  return adaptOrders(ordersData);
};

// ============ CART ============

export const getCart = async () => {
  const { data } = await api.get("/cart/");
  return data;
};

export const addToCart = async (productItemId: number, quantity: number) => {
  const { data } = await api.post("/cart/cart-items/", {
    product_item: productItemId,
    quantity
  });
  return data;
};

export const updateCartItem = async (id: number, quantity: number) => {
  const { data } = await api.patch(`/cart/cart-items/${id}/`, { quantity });
  return data;
};

export const removeFromCart = async (id: number) => {
  const { data } = await api.delete(`/cart/cart-items/${id}/`);
  return data;
};

export const clearCart = async () => {
  const { data } = await api.post("/cart/clear/");
  return data;
};

// ============ ADMIN / SELLER ============

export const fetchUsers = async () => {

  const { data } = await api.get("/accounts/users/");
  return data.results || data;
};

export const fetchUser = async (id: number) => {
  const { data } = await api.get(`/accounts/users/${id}/`);
  return data;
};

export default api;
