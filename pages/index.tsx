
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { GetStaticProps } from "next";



export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

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
    <div className="min-h-screen bg-white flex flex-col">
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
          totalItems: totalItems,
          onCartClick: handleCartClick,
        }}
        userProfile={{
          isAuthenticated: !!user,
          username: user?.username,
          role: user?.role,
          onLogout: logout,
        }}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            {/* Background Image Placeholder or Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90" />
            {/* You can allow user to replace this with an actual image later */}
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              Welcome to <span className="text-blue-400">Nexus Store</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
              Premium Tech, Unbeatable Prices. Discover the latest gadgets and accessories to elevate your lifestyle.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/products")}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50"
              >
                Shop Now
              </button>
              <button
                onClick={() => router.push("/about")}
                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );


}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
