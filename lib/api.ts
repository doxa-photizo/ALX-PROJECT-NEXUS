import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const fetchProduct = async (id: string | number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const login = async (credentials: { username: string; password: string }) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const createOrder = async (userId: number, products: { productId: number; quantity: number }[]) => {
  // FakeStoreAPI uses 'carts' to simulate orders
  const { data } = await api.post("/carts", {
    userId,
    date: new Date().toISOString().split('T')[0],
    products,
  });
  return data;
};

export const getUserOrders = async (userId: number) => {
  const { data } = await api.get(`/carts/user/${userId}`);
  return data;
};

export default api;
