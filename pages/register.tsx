import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Package, Mail, Lock, User, ArrowRight, Store, Phone, FileText } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { register, RegistrationData } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
    const router = useRouter();
    const [userType, setUserType] = useState<"customer" | "seller">("customer");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone_number: "",
        store_name: "",
        tax_number: "",
        seller_phone: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserTypeToggle = () => {
        const newType = userType === "customer" ? "seller" : "customer";
        setUserType(newType);
        if (newType === "customer") {
            setFormData(prev => ({
                ...prev,
                store_name: "",
                tax_number: "",
                seller_phone: ""
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const payload: RegistrationData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                user_type: userType,
                phone_number: formData.phone_number,
                ...(userType === "seller" && {
                    store_name: formData.store_name,
                    tax_number: formData.tax_number,
                    seller_phone: formData.seller_phone
                })
            };

            await register(payload);
            toast.success("Registration successful! Redirecting to login...");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error: any) {
            console.error("Registration error:", error);
            const message = error.response?.data?.message || error.response?.data?.detail || "Registration failed. Please try again.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                ]}
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                cartSummary={{ totalItems: 0, onCartClick: () => router.push("/cart") }}
            />

            <main className="flex-grow flex items-center justify-center px-4 py-16">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 p-10 max-w-3xl w-full border border-gray-100 relative overflow-hidden">
                    {/* Decorative Corner Icon using Tailwind */}
                    <div className="absolute top-8 right-8 text-blue-900 opacity-90 hidden md:block">
                        <Package className="h-16 w-16" strokeWidth={1.5} />
                    </div>

                    <div className="mb-10 relative z-10">
                        <h1 className="text-4xl font-extrabold text-blue-950 tracking-tight mb-2">Create Your Nexus Account</h1>
                        <p className="text-gray-500 text-lg">Join as customer or elevate to a seller account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* 2-Column Grid for Core Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600 ml-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600 ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-600 ml-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                                <label className="text-sm font-medium text-gray-600 ml-1">Phone Number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        required
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Seller Toggle Switch */}
                        <div className="flex items-center gap-4 py-2">
                            <span className="text-gray-900 font-semibold text-lg">Register as Seller</span>
                            <button
                                type="button"
                                onClick={handleUserTypeToggle}
                                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${userType === 'seller' ? 'bg-blue-600' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${userType === 'seller' ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        {/* Seller Fields Section */}
                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${userType === 'seller' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="bg-blue-900/5 rounded-2xl p-6 border border-blue-100 mt-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <h3 className="text-blue-900 font-bold mb-2 flex items-center gap-2">
                                            <Store className="h-5 w-5" /> Seller Details
                                        </h3>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600 ml-1">Store Name</label>
                                        <input
                                            type="text"
                                            name="store_name"
                                            required={userType === 'seller'}
                                            value={formData.store_name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                            placeholder="My Store"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-600 ml-1">Tax Number</label>
                                        <input
                                            type="text"
                                            name="tax_number"
                                            required={userType === 'seller'}
                                            value={formData.tax_number}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                            placeholder="TAX-123"
                                        />
                                    </div>

                                    <div className="space-y-1 md:col-span-2">
                                        <label className="text-sm font-medium text-gray-600 ml-1">Seller Phone</label>
                                        <input
                                            type="tel"
                                            name="seller_phone"
                                            required={userType === 'seller'}
                                            value={formData.seller_phone}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-800"
                                            placeholder="+1 (555) 999-9999"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-950 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-900 active:scale-[0.98] transition-all shadow-xl shadow-blue-900/20 disabled:opacity-70 disabled:cursor-wait mt-4 flex items-center justify-center gap-2"
                        >
                            {isLoading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            Create Account
                        </button>

                        <div className="flex flex-col items-center gap-3 mt-6 text-sm text-gray-500">
                            <p>
                                Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline border-2 border-gray-200 px-3 py-1 rounded-lg ml-2 inline-block hover:border-blue-600 transition-colors">Sign In</Link>
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-blue-600 hover:underline">Terms of Service</a>
                                <span>•</span>
                                <a href="#" className="hover:text-blue-600 hover:underline">Privacy Policy</a>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RegisterPage;
