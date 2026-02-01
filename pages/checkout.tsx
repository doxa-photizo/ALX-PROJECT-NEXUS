import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/lib/api";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const CheckoutPage = () => {
    const { cartItems, totalItems, subtotal, clearCart } = useCart();
    const { user, logout } = useAuth();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
    });

    const shipping = cartItems.length > 0 ? 10.00 : 0.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setIsSubmitting(true);
        try {
            // Mapping cart items to the format expected by API
            const products = cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }));

            // Assuming we have a user ID or using a fallback for demo
            const userId = user?.id || 1;

            await createOrder(userId, products);

            // Clear cart and navigate to confirmation
            clearCart();
            router.push("/order-confirmation");
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("Payment simulation failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0 && !isSubmitting) {
        if (typeof window !== "undefined") {
            router.push("/cart");
        }
        return null;
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-white flex flex-col">
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
                    cartSummary={{ totalItems, onCartClick: () => router.push("/cart") }}
                />

                <main className="flex-grow container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Checkout Form */}
                        <div className="lg:w-2/3">
                            <button
                                onClick={() => router.push("/cart")}
                                className="flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors group"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Return to Cart
                            </button>

                            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

                            <form onSubmit={handlePlaceOrder} className="space-y-12">
                                {/* Contact Info */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <ShoppingCart className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Shipping Details */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <Truck className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                placeholder="123 Street Name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">ZIP / Postal Code</label>
                                            <input
                                                type="text"
                                                id="zipCode"
                                                name="zipCode"
                                                required
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Payment */}
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <CreditCard className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                    </div>
                                    <div className="p-6 border border-blue-100 bg-blue-50/50 rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-[8px] text-white font-bold">
                                                VISA / MC
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Payment Simulation</p>
                                                <p className="text-sm text-gray-600">No real payment will be processed. Clicking &quot;Place Order&quot; will simulate a successful transaction.</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-black text-white py-5 rounded-2xl font-bold text-xl hover:bg-gray-900 transition-all shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? "Processing..." : `Pay $${total.toFixed(2)}`}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

                                <div className="space-y-6 mb-8 overflow-y-auto max-h-[40vh] pr-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                                                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                                                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 border-t border-gray-200 pt-8 mb-8 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Estimated Tax</span>
                                        <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-extrabold text-gray-900 pt-4 border-t border-gray-100">
                                        <span>Total</span>
                                        <span className="text-blue-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <ShieldCheck className="h-10 w-10 text-green-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Secure Purchase</p>
                                        <p className="text-[10px] text-gray-500">Your data is protected by industry standard encryption.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </ProtectedRoute>
    );
};

export default CheckoutPage;
