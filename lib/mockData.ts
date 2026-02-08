/**
 * Mock data that matches the velostore.shop backend structure
 */

import { Product, ProductCategory, ShopOrder, ShoppingCart, UserProfile } from "@/interfaces";

// Mock Categories
export const mockCategories: ProductCategory[] = [
    { id: 1, category_name: "Electronics", parent_category: null },
    { id: 2, category_name: "Clothing", parent_category: null },
    { id: 3, category_name: "Home & Garden", parent_category: null },
    { id: 4, category_name: "Sports", parent_category: null },
    { id: 5, category_name: "Books", parent_category: null },
];

// Mock Products (matching backend structure)
export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        product_image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        is_published: true,
        category: 1,
        category_name: "Electronics",
        seller: 1,
        seller_name: "TechStore",
        items: [
            {
                id: 1,
                sku: "WH-001-BLK",
                qty_in_stock: 50,
                price: "199.99",
                product_image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                options: "Color: Black",
            },
            {
                id: 2,
                sku: "WH-001-WHT",
                qty_in_stock: 30,
                price: "199.99",
                product_image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                options: "Color: White",
            },
        ],
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications.",
        product_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        is_published: true,
        category: 1,
        category_name: "Electronics",
        seller: 1,
        seller_name: "TechStore",
        items: [
            {
                id: 3,
                sku: "SW-002-BLK",
                qty_in_stock: 100,
                price: "299.99",
                product_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                options: "Color: Black, Size: 42mm",
            },
        ],
    },
    {
        id: 3,
        name: "Premium Backpack",
        description: "Durable waterproof backpack with laptop compartment and USB charging port.",
        product_image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        is_published: true,
        category: 2,
        category_name: "Clothing",
        seller: 2,
        seller_name: "FashionHub",
        items: [
            {
                id: 4,
                sku: "BP-003-GRY",
                qty_in_stock: 75,
                price: "79.99",
                product_image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
                options: "Color: Gray",
            },
        ],
    },
    {
        id: 4,
        name: "Running Shoes",
        description: "Lightweight running shoes with advanced cushioning and breathable mesh.",
        product_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        is_published: true,
        category: 4,
        category_name: "Sports",
        seller: 3,
        seller_name: "SportGear",
        items: [
            {
                id: 5,
                sku: "RS-004-BLU-9",
                qty_in_stock: 40,
                price: "129.99",
                product_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                options: "Color: Blue, Size: 9",
            },
            {
                id: 6,
                sku: "RS-004-BLU-10",
                qty_in_stock: 35,
                price: "129.99",
                product_image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                options: "Color: Blue, Size: 10",
            },
        ],
    },
    {
        id: 5,
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe and auto-shutoff.",
        product_image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
        is_published: true,
        category: 3,
        category_name: "Home & Garden",
        seller: 1,
        seller_name: "TechStore",
        items: [
            {
                id: 7,
                sku: "CM-005-SLV",
                qty_in_stock: 60,
                price: "89.99",
                product_image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
                options: "Color: Silver",
            },
        ],
    },
    {
        id: 6,
        name: "Desk Lamp LED",
        description: "Adjustable LED desk lamp with touch controls and USB charging port.",
        product_image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        is_published: true,
        category: 3,
        category_name: "Home & Garden",
        seller: 2,
        seller_name: "FashionHub",
        items: [
            {
                id: 8,
                sku: "DL-006-WHT",
                qty_in_stock: 90,
                price: "49.99",
                product_image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
                options: "Color: White",
            },
        ],
    },
];

// Mock User Profile
export const mockUserProfile: UserProfile = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    phone_number: "1234567890",
    user_type: "customer",
    payment_methods: [],
};

// Mock Admin User
export const mockAdminProfile: UserProfile = {
    id: 2,
    username: "admin",
    email: "admin@example.com",
    phone_number: "0987654321",
    user_type: "customer",
};

// Mock Shopping Cart
export const mockCart: ShoppingCart = {
    id: 1,
    user: 1,
    items: [],
    total_price: "0.00",
};

// Mock Orders
export const mockOrders: ShopOrder[] = [
    {
        id: 1,
        order_date: new Date().toISOString(),
        order_total: "299.99",
        status_display: "Processing",
        order_status_id: 1,
        payment_status: "Paid",
        shipping_address_details: "123 Main St, City, State 12345",
        customer_phone_number: "1234567890",
        customer_username: "testuser",
        can_update_status: "true",
        is_multi_vendor: "false",
        other_sellers_lines_count: "0",
        total_lines_count: "2",
        lines: [],
    },
];

// Helper to generate mock JWT token
export const generateMockToken = (userId: number, username: string, role: string = "user") => {
    // This is a fake JWT-like token for development
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
        user_id: userId,
        username,
        role,
        exp: Date.now() + 86400000 // 24 hours
    }));
    const signature = btoa("mock-signature");
    return `${header}.${payload}.${signature}`;
};
