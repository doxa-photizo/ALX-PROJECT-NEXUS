import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const OrderConfirmation = () => {
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        // Ideally redirect or show loading, but for static page rendering OK
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ]}
                userProfile={{
                    isAuthenticated: !!user,
                    username: user?.username, // Adjust based on actual user object structure
                    role: user?.role,
                    onLogout: () => { }, // Placeholder
                }}
                // Pass dummy props for now to avoid errors, or update Navbar to make them optional
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                cartSummary={{ totalItems: 0, onCartClick: () => router.push('/cart') }}
            />

            <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Order Confirmed!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>
                    <div className="mt-8 flex flex-col space-y-4">
                        <Link href="/orders" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            View Order History
                        </Link>
                        <Link href="/products" className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderConfirmation;
