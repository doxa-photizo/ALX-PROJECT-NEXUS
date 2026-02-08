/**
 * Mock API implementation that mimics velostore.shop backend
 * Set USE_MOCK_API = true in config.ts to use this instead of real backend
 */

import { mockProducts, mockCategories, mockUserProfile, mockAdminProfile, mockCart, mockOrders, generateMockToken } from "./mockData";
import { Product, ProductCategory, ShopOrder, ShoppingCart, UserProfile } from "@/interfaces";

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
export const mockApi = {
    // ============ PRODUCTS ============
    async fetchProducts(params?: { category?: number; seller?: number; search?: string }) {
        await delay();
        let products = [...mockProducts];

        if (params?.category) {
            products = products.filter(p => p.category === params.category);
        }
        if (params?.seller) {
            products = products.filter(p => p.seller === params.seller);
        }
        if (params?.search) {
            const search = params.search.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(search) ||
                p.description.toLowerCase().includes(search)
            );
        }

        return { results: products, count: products.length, next: null, previous: null };
    },

    async fetchProduct(id: string | number) {
        await delay();
        const product = mockProducts.find(p => p.id === Number(id));
        if (!product) throw new Error("Product not found");
        return product;
    },

    async createProduct(data: any) {
        await delay();
        const newProduct: Product = {
            id: mockProducts.length + 1,
            name: data.name,
            description: data.description,
            product_image: data.product_image || "https://via.placeholder.com/500",
            is_published: data.is_published ?? true,
            category: data.category,
            category_name: mockCategories.find(c => c.id === data.category)?.category_name || "Unknown",
            seller: 1,
            seller_name: "CurrentUser",
            items: [],
        };
        mockProducts.push(newProduct);
        return newProduct;
    },

    async updateProduct(id: string | number, data: any) {
        await delay();
        const index = mockProducts.findIndex(p => p.id === Number(id));
        if (index === -1) throw new Error("Product not found");

        mockProducts[index] = { ...mockProducts[index], ...data };
        return mockProducts[index];
    },

    async deleteProduct(id: string | number) {
        await delay();
        const index = mockProducts.findIndex(p => p.id === Number(id));
        if (index === -1) throw new Error("Product not found");
        mockProducts.splice(index, 1);
        return { message: "Product deleted successfully" };
    },

    // ============ CATEGORIES ============
    async fetchCategories() {
        await delay();
        return mockCategories;
    },

    async createCategory(data: { category_name: string; parent_category?: number }) {
        await delay();
        const newCategory: ProductCategory = {
            id: mockCategories.length + 1,
            category_name: data.category_name,
            parent_category: data.parent_category || null,
        };
        mockCategories.push(newCategory);
        return newCategory;
    },

    // ============ AUTHENTICATION ============
    async login(credentials: { username: string; password: string }) {
        await delay();

        // Mock authentication - accept any credentials for demo
        const isAdmin = credentials.username.toLowerCase() === "admin";
        const user = isAdmin ? mockAdminProfile : mockUserProfile;

        return {
            access: generateMockToken(user.id, user.username, isAdmin ? "admin" : "user"),
            refresh: generateMockToken(user.id, user.username, isAdmin ? "admin" : "user"),
        };
    },

    async register(data: any) {
        await delay();
        return {
            access: generateMockToken(99, data.username, "user"),
            refresh: generateMockToken(99, data.username, "user"),
        };
    },

    // ============ USER PROFILE ============
    async fetchProfile() {
        await delay();
        return mockUserProfile;
    },

    async updateProfile(data: any) {
        await delay();
        Object.assign(mockUserProfile, data);
        return mockUserProfile;
    },

    // ============ CART ============
    async fetchCart() {
        await delay();
        return mockCart;
    },

    async addToCart(data: { product_item: number; quantity: number }) {
        await delay();
        // Find the product item
        const product = mockProducts.find(p => p.items.some(item => item.id === data.product_item));
        const productItem = product?.items.find(item => item.id === data.product_item);

        if (!product || !productItem) throw new Error("Product not found");

        const cartItem = {
            id: mockCart.items.length + 1,
            product_item: data.product_item,
            product_name: product.name,
            image: productItem.product_image,
            price: productItem.price,
            quantity: data.quantity,
            qty: data.quantity,
            subtotal: (parseFloat(productItem.price) * data.quantity).toFixed(2),
        };

        mockCart.items.push(cartItem);
        mockCart.total_price = mockCart.items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toFixed(2);

        return cartItem;
    },

    async updateCartItem(id: number, data: { quantity: number }) {
        await delay();
        const item = mockCart.items.find(i => i.id === id);
        if (!item) throw new Error("Cart item not found");

        item.quantity = data.quantity;
        item.qty = data.quantity;
        item.subtotal = (parseFloat(item.price) * data.quantity).toFixed(2);
        mockCart.total_price = mockCart.items.reduce((sum, i) => sum + parseFloat(i.subtotal), 0).toFixed(2);

        return item;
    },

    async removeFromCart(id: number) {
        await delay();
        const index = mockCart.items.findIndex(i => i.id === id);
        if (index === -1) throw new Error("Cart item not found");

        mockCart.items.splice(index, 1);
        mockCart.total_price = mockCart.items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toFixed(2);

        return { message: "Item removed from cart" };
    },

    async clearCart() {
        await delay();
        mockCart.items = [];
        mockCart.total_price = "0.00";
        return mockCart;
    },

    // ============ ORDERS ============
    async fetchOrders(params?: { user?: number }) {
        await delay();
        let orders = [...mockOrders];
        if (params?.user) {
            orders = orders.filter(o => o.user === params.user);
        }
        return orders;
    },

    async fetchOrder(id: string | number) {
        await delay();
        const order = mockOrders.find(o => o.id === Number(id));
        if (!order) throw new Error("Order not found");
        return order;
    },

    async createOrder(userId: number, products: any[]) {
        await delay();
        const newOrder: ShopOrder = {
            id: mockOrders.length + 1,
            order_date: new Date().toISOString(),
            order_total: "0.00", // Calculate from products
            status_display: "Pending",
            order_status_id: 1,
            payment_status: "Pending",
            shipping_address_details: "Mock Address",
            customer_phone_number: mockUserProfile.phone_number || "",
            customer_username: mockUserProfile.username,
            can_update_status: "true",
            is_multi_vendor: "false",
            other_sellers_lines_count: "0",
            total_lines_count: products.length.toString(),
            lines: products,
        };
        mockOrders.push(newOrder);
        return newOrder;
    },

    // ============ USERS (Admin) ============
    async fetchUsers() {
        await delay();
        return [mockUserProfile, mockAdminProfile];
    },

    async fetchUser(id: string | number) {
        await delay();
        if (Number(id) === 1) return mockUserProfile;
        if (Number(id) === 2) return mockAdminProfile;
        throw new Error("User not found");
    },
};
