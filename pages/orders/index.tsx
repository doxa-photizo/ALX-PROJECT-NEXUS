import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getUserOrders } from "@/lib/api";
import { Order } from "@/interfaces";
import Link from "next/link";
import { Package, Calendar, Clock, ChevronRight } from "lucide-react";

const OrdersPage = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            // If user is null, ProtectedRoute will eventually redirect to login
            // but we add a guard here for the API call
            if (!user) return;
            try {
                const data = await getUserOrders(user.id || 1);
                setOrders(data);
            } catch (err) {
                setError("Failed to fetch orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user]);

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen flex-col bg-gray-50">
                <Navbar
                    navigationLink={[
                        { label: "Home", href: "/" },
                        { label: "Products", href: "/products" },
                        { label: "About", href: "/about" },
                        { label: "Contact", href: "/contact" },
                    ]}
                    userProfile={{
                        isAuthenticated: !!user,
                        username: user?.username || "User",
                        role: user?.role,
                        onLogout: logout,
                    }}
                    searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                    cartSummary={{ totalItems: 0, onCartClick: () => { } }}
                />

                <main className="container mx-auto flex-grow px-4 py-8 max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order History</h1>
                        <p className="text-gray-500 mt-2">Track and manage your recent purchases</p>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-gray-500 animate-pulse font-medium">Loading your orders...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
                            <p className="text-red-600 font-semibold">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
                            <div className="mx-auto w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Package className="h-12 w-12 text-gray-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Looks like you haven&apos;t placed any orders yet. Start shopping to see your history here!
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
                                >
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-50 p-3 rounded-xl">
                                                    <Package className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order ID</p>
                                                    <h3 className="text-lg font-black text-gray-900 italic">#NXS-{order.id.toString().padStart(5, '0')}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    <span className="font-semibold">{new Date(order.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                    <span className="font-semibold font-mono uppercase">Processing</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-50 pt-6 flex items-center justify-between">
                                            <p className="text-gray-600 font-medium">
                                                <span className="font-black text-gray-900">{order.products.length}</span> {order.products.length === 1 ? 'item' : 'items'}
                                            </p>
                                            <Link
                                                href={`/orders/${order.id}`}
                                                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:translate-x-1 transition-transform"
                                            >
                                                View Details
                                                <ChevronRight className="h-5 w-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default OrdersPage;
