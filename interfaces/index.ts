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

  searchHandlingProps ?:{ query:string;
  onSearch: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;},

  cartSummary?:{
  totalItems: number;
  onCartClick: () => void;
}
 userProfile?:{
  username?: string;
  email?: string;
  avatarUrl?: string;
  role?: "user" | "admin" ;
  isAuthenticated: boolean;
  onLogout: () => void;
}

}

