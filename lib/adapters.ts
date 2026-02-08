/**
 * Adapter functions to transform backend API responses
 * to formats expected by frontend components.
 */

import { Product, ProductItem, ShopOrder, ShoppingCartItem, CartItem, Order } from "@/interfaces";

/**
 * Transform backend Product to legacy format for components that expect it
 */
export function adaptProductForDisplay(backendProduct: Product): any {
    // Get the first SKU for price and image
    const firstItem = backendProduct.items?.[0];

    return {
        // Spread all backend fields
        ...backendProduct,
        // Add legacy fields for backward compatibility
        title: backendProduct.name,
        price: firstItem ? Number(firstItem.price) : 0,
        category: backendProduct.category_name,
        image: backendProduct.product_image || firstItem?.product_image || "",
        rating: {
            rate: 0,
            count: 0,
        },
    };
}

/**
 * Transform array of backend products
 */
export function adaptProductsForDisplay(backendProducts: Product[]) {
    return backendProducts.map(adaptProductForDisplay);
}

/**
 * Transform ShoppingCartItem to CartItem for cart components
 */
export function adaptCartItem(backendItem: ShoppingCartItem): CartItem {
    return {
        id: backendItem.id,
        name: backendItem.product_name,
        title: backendItem.product_name, // Alias for compatibility
        price: parseFloat(backendItem.price),
        image: backendItem.image,
        quantity: backendItem.quantity,
        description: "",
        category: "",
    };
}

/**
 * Transform array of cart items
 */
export function adaptCartItems(backendItems: ShoppingCartItem[]): CartItem[] {
    return backendItems.map(adaptCartItem);
}

/**
 * Transform ShopOrder to legacy Order format
 */
export function adaptOrder(backendOrder: ShopOrder): Order {
    return {
        // Spread all backend fields first
        ...backendOrder,
        id: backendOrder.id,
        userId: 0, // Not directly available
        date: backendOrder.order_date,
        products: (backendOrder.lines || []).map((line: any) => ({
            productId: line.product_item,
            quantity: line.quantity
        })),
    } as any;
}

export function adaptOrders(backendOrders: ShopOrder[]): Order[] {
    return backendOrders.map(adaptOrder);
}

/**
 * Transform Product for creating/updating on backend
 */
export function adaptProductForBackend(frontendProduct: any) {
    return {
        name: frontendProduct.title || frontendProduct.name,
        description: frontendProduct.description,
        category: frontendProduct.category, // Should be category ID
        is_published: frontendProduct.is_published ?? true,
    };
}

/**
 * Calculate total price from cart items
 */
export function calculateCartTotal(items: ShoppingCartItem[]): number {
    return items.reduce((total, item) => {
        return total + parseFloat(item.subtotal || "0");
    }, 0);
}

/**
 * Get the best price from product items (SKUs)
 */
export function getBestPrice(product: Product): number {
    if (!product.items || product.items.length === 0) return 0;

    const prices = product.items.map(item => parseFloat(item.price));
    return Math.min(...prices);
}

/**
 * Get the price range for a product
 */
export function getPriceRange(product: Product): { min: number; max: number } | number {
    if (!product.items || product.items.length === 0) return 0;

    const prices = product.items.map(item => parseFloat(item.price));
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    if (min === max) return min;

    return { min, max };
}

/**
 * Check if product is in stock
 */
export function isProductInStock(product: Product): boolean {
    if (!product.items || product.items.length === 0) return false;

    return product.items.some(item => item.qty_in_stock > 0);
}

/**
 * Get total stock for a product
 */
export function getTotalStock(product: Product): number {
    if (!product.items || product.items.length === 0) return 0;

    return product.items.reduce((total, item) => total + item.qty_in_stock, 0);
}
