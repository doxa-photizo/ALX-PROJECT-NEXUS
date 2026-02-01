
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React, { useState } from "react"; // Added useState
import { useRouter } from "next/router"; // Added useRouter
import { useAuth } from "@/context/AuthContext"; // Added useAuth



export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth(); // Assuming useAuth exposes these

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <>
      <Navbar
        navigationLink={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
        searchHandlingProps={{
          query: searchQuery,
          onSearch: handleSearch,
          onSearchSubmit: handleSearchSubmit,
        }}
        cartSummary={{
          totalItems: 0, // Placeholder, ideally from a CartContext
          onCartClick: handleCartClick,
        }}
        userProfile={{
          isAuthenticated: !!user,
          username: user?.username, // Adjust based on actual user object structure
          role: user?.role,
          onLogout: logout,
        }}
      />

      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Nexus Store</h1>
          <p className="text-lg text-gray-700">
            Discover the latest tech gadgets and accessories at unbeatable prices.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

