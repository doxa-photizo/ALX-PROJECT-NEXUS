import { JSX } from "react/jsx-runtime";

// ============ UI COMPONENT INTERFACES ============

export interface FooterProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface NavbarProps {
  navigationLink: {
    label: string;
    href: string;
    requiresAuth?: boolean;
    roleAccess?: string[];
  }[];
  searchHandlingProps?: {
    query: string;
    onSearch: (query: string) => void;
    onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  };
  cartSummary?: {
    totalItems: number;
    onCartClick: () => void;
  };
  userProfile?: {
    username?: string;
    email?: string;
    avatarUrl?: string;
    role?: "user" | "admin" | "seller";
    isAuthenticated: boolean;
    onLogout: () => void;
  };
}

export interface AdminHeaderProps {
  title: string;
}

export interface SidebarProps {
  links: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

// ============ BACKEND DATA MODELS ============

// Product Item (SKU) - represents a specific variant of a product
export interface ProductItem {
  id: number;
  product?: number; // Product ID (writeOnly on create)
  sku: string;
  qty_in_stock: number;
  price: string; // Decimal as string
  product_image: string; // Read-only
  options?: string; // Read-only, variation options
}

// Product Category
export interface ProductCategory {
  id: number;
  category_name: string;
  parent_category?: number | null;
}

// Product - main product with nested SKUs
export interface Product {
  id: number;
  name: string; // Changed from 'title'
  description: string;
  product_image: string; // Read-only
  is_published: boolean;
  category: any; // Can be ID (number) or category name (string) after adaptation
  category_name: string; // Read-only
  seller: number; // Read-only
  seller_name: string; // Read-only
  items: ProductItem[]; // Nested SKUs

  // Legacy fields for backward compatibility (added by adapter)
  title?: string;
  price?: any; // Can be string from backend or number after transformation
  image?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// User Profile
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  phone_number?: string | null;
  user_type: "customer" | "seller";
  store_name?: string;
  tax_number?: string;
  addresses?: any; // Complex nested structure
  payment_methods?: UserPaymentMethod[];
}

// User (simplified for auth context)
export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  phone_number?: string;
  role?: "user" | "admin" | "seller";
  user_type?: "customer" | "seller";
}

// Payment Method
export interface UserPaymentMethod {
  id: number;
  payment_type: number;
  payment_type_name: string;
  provider: string;
  account_number: string;
  expiry_date: string;
  is_default: boolean;
  payment_status: string;
}

// Shopping Cart
export interface ShoppingCart {
  id: number;
  user?: number | null;
  items: ShoppingCartItem[];
  total_price: string;
}

// Shopping Cart Item
export interface ShoppingCartItem {
  id: number;
  product_item: number;
  product_name: string;
  image: string;
  price: string;
  quantity: number;
  qty?: number; // Alternative field
  subtotal: string;
}

// Order
export interface ShopOrder {
  id: number;
  user?: number; // Added for mock filtering support
  order_date: string;
  order_total: string;
  status_display: string;
  order_status_id: number;
  payment_status: string;
  shipping_address_details: string;
  shipping_carrier?: string | null;
  tracking_number?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
  customer_phone_number: string;
  customer_username: string;
  can_update_status: string;
  is_multi_vendor: string;
  other_sellers_lines_count: string;
  total_lines_count: string;
  lines: any; // Complex nested structure
  order_status?: number; // Write-only
}

// Auth
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string; // JWT access token
  refresh: string; // JWT refresh token
}

export interface RegisterData {
  username: string;
  password: string;
  email: string;
  user_type: "customer" | "seller";
  store_name?: string;
  tax_number?: string;
  seller_phone?: string;
  phone_number?: string;
}

// ============ LEGACY / COMPATIBILITY TYPES ============
// Keep these for backward compatibility with existing components

export interface Rating {
  rate: number;
  count: number;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  date: string;
  products: OrderItem[];
}

export interface CartItem {
  id: number;
  name: string;
  title?: string; // Alias for name
  price: number;
  image: string;
  quantity: number;
  description?: string;
  category?: string;
}

// ============ HELPER TYPES ============

// Paginated response wrapper
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Product card props (for UI components)
export interface ProductCardProp {
  product: Product;
}
