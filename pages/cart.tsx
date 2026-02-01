import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, totalItems, subtotal } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();

    const shipping = cartItems.length > 0 ? 10.00 : 0.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
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
                cartSummary={{ totalItems, onCartClick: () => { } }}
            />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex items-center space-x-2 mb-8">
                    <button
                        onClick={() => router.push("/")}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Back to home"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Shopping Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="h-12 w-12 text-blue-500" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            Looks like you haven&apos;t added anything to your cart yet. Explore our products and find something you love.
                        </p>
                        <button
                            onClick={() => router.push("/products")}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 inline-flex items-center gap-2"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-hover hover:shadow-md"
                                >
                                    <div className="relative w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <Link href={`/products/${item.id}`} className="hover:text-blue-600 transition-colors">
                                            <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{item.title}</h3>
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-2 capitalize">{item.category}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 px-2 hover:bg-gray-200 transition-colors text-gray-600"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-10 text-center font-semibold text-gray-800 tabular-nums">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 px-2 hover:bg-gray-200 transition-colors text-gray-600"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xl font-bold text-gray-900 tabular-nums">${(item.price * item.quantity).toFixed(2)}</p>
                                        <p className="text-xs text-gray-400 mt-1">${item.price.toFixed(2)} each</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6 border-b border-gray-100 pb-6 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span className="font-semibold text-gray-900 tabular-nums">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimated Shipping</span>
                                        <span className="font-semibold text-gray-900 tabular-nums">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimated Tax (8%)</span>
                                        <span className="font-semibold text-gray-900 tabular-nums">${tax.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-900 mb-8">
                                    <span>Total</span>
                                    <span className="tabular-nums text-blue-600">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => router.push("/checkout")}
                                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                    Secure checkout • Secure SSL encryption
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
