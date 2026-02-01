import React from "react";
import Link from "next/link";
import { Package, Search, ShoppingCart, CircleUser } from "lucide-react";
import { NavbarProps } from "@/interfaces/";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";

const Navbar: React.FC<NavbarProps> = ({ searchHandlingProps, cartSummary, userProfile, navigationLink }) => {
    const { totalItems } = useCart();
    const router = useRouter();

    const handleCartClick = () => {
        router.push("/cart");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left Side: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Package className="h-8 w-8 text-blue-600" />
                            <span className="text-2xl font-bold text-gray-800 tracking-tight">Nexus Store</span>
                        </Link>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navigationLink.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side: Search, Cart, User */}
                    <div className="flex items-center space-x-6">
                        {/* Search Bar */}
                        {searchHandlingProps && (
                            <form
                                onSubmit={searchHandlingProps.onSearchSubmit}
                                className="relative hidden md:block"
                            >
                                <input
                                    type="text"
                                    value={searchHandlingProps.query}
                                    onChange={(e) => searchHandlingProps.onSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all duration-200"
                                />
                                <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-500">
                                    <Search className="h-5 w-5" />
                                </button>
                            </form>
                        )}

                        {/* Cart & User Icons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={cartSummary?.onCartClick || handleCartClick}
                                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors relative"
                                aria-label="Cart"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    if (userProfile && userProfile.isAuthenticated) {
                                        // Handle user profile click
                                        userProfile.onLogout?.();
                                    } else {
                                        window.location.href = '/login';
                                    }
                                }}
                                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="User Profile"
                            >
                                <CircleUser className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search - Visible only on small screens */}
            {searchHandlingProps && (
                <div className="md:hidden px-4 pb-2">
                    <form onSubmit={searchHandlingProps.onSearchSubmit} className="relative">
                        <input
                            type="text"
                            value={searchHandlingProps.query}
                            onChange={(e) => searchHandlingProps.onSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </form>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
