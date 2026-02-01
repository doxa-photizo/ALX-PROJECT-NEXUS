import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Package, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            // After 3 seconds, redirect to login
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                ]}
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
                cartSummary={{ totalItems: 0, onCartClick: () => router.push("/cart") }}
            />

            <main className="flex-grow flex items-center justify-center px-4 py-12 bg-gray-50">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
                        <p className="text-gray-500 mt-2">Join Nexus Store and start shopping today</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 min-h-[500px] flex flex-col justify-center">
                        {isSuccess ? (
                            <div className="text-center py-8 animate-in zoom-in duration-300">
                                <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                                <p className="text-gray-500 mb-8">
                                    Your account has been created simulation-style. Redirecting you to login...
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 animate-[loading_3s_ease-in-out]" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl mb-6">
                                    <p className="text-xs text-blue-700 font-medium leading-relaxed">
                                        Note: This is a demo. We use FakeStoreAPI which doesn&apos;t support actual registration.
                                        Fill any details to simulate success.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-14 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            required
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full pl-6 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-gray-400"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-14 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full pl-6 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-gray-400"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-14 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-6 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-gray-400"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 group mt-4"
                                >
                                    {isLoading ? (
                                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign Up
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    <p className="text-center mt-8 text-gray-600 font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
                    </p>
                </div>
            </main>

            <Footer />

            <style jsx>{`
                @keyframes loading {
                    from { width: 0; }
                    to { width: 100%; }
                }
            `}</style>
        </div>
    );
};

export default RegisterPage;
