import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/interfaces";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("nexus_cart");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
                localStorage.removeItem("nexus_cart");
            }
        }
        setIsInitialized(true);
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("nexus_cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isInitialized]);

    const addToCart = (product: any, quantity = 1) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            // Convert product to CartItem
            const cartItem: CartItem = {
                id: product.id,
                name: product.name || product.title,
                title: product.title || product.name,
                price: typeof product.price === 'number' ? product.price : parseFloat(product.price || '0'),
                image: product.image || product.product_image || '',
                quantity,
                description: product.description || '',
                category: product.category || product.category_name || '',
            };
            return [...prevItems, cartItem];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
