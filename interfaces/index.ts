import { JSX } from "react/jsx-runtime";


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


/*navigation link interface*/
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
    role?: "user" | "admin";
    isAuthenticated: boolean;
    onLogout: () => void;
  };
}
export interface AdminHeaderProps {
  title: string;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}





export interface Name {
  firstname: string;
  lastname: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  name?: Name;
  phone?: string;
  address?: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  role?: "user" | "admin";
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
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

export interface CartItem extends Product {
  quantity: number;
}
