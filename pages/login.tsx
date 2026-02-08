import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Package, Mail, Lock, AlertCircle, ArrowRight, Github } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const LoginPage = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [role, setRole] = useState<"user" | "admin">("user");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await login(formData, role);
            // Success redirect is handled inside login() or here
        } catch (err: any) {
            setError(err.response?.data || "Invalid username or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                        <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4 transition-transform hover:scale-105">
                            <Package className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
                        <p className="text-gray-500 mt-2">Sign in to your account to continue shopping</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-red-600 font-medium leading-relaxed">{error}</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-gray-400 font-medium"
                                        placeholder="johnd"
                                    />
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 w-0 group-focus-within:w-full rounded-full" />
                                </div>
                                <p className="mt-1.5 text-[10px] text-gray-400 uppercase tracking-wider font-bold">Hint: johnd</p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-semibold text-gray-700">Password</label>
                                    <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot password?</Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder-gray-400 font-medium"
                                        placeholder="••••••••"
                                    />
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300 w-0 group-focus-within:w-full rounded-full" />
                                </div>
                                <p className="mt-1.5 text-[10px] text-gray-400 uppercase tracking-wider font-bold">Hint: m38rmn=</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">Sign in as</label>
                                <div className="grid grid-cols-2 gap-3 p-1.5 bg-gray-50 rounded-2xl border border-gray-100 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => setRole("user")}
                                        className={`py-2.5 rounded-xl font-bold text-sm transition-all ${role === "user"
                                            ? "bg-white text-blue-600 shadow-sm border border-blue-50"
                                            : "text-gray-400 hover:text-gray-600"}`}
                                    >
                                        Customer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("admin")}
                                        className={`py-2.5 rounded-xl font-bold text-sm transition-all ${role === "admin"
                                            ? "bg-white text-blue-600 shadow-sm border border-blue-50"
                                            : "text-gray-400 hover:text-gray-600"}`}
                                    >
                                        Administrator
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="my-8 flex items-center gap-4">
                            <div className="flex-grow h-px bg-gray-100" />
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Or continue with</span>
                            <div className="flex-grow h-px bg-gray-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 text-sm">
                                <Github className="h-5 w-5" />
                                Github
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-700 text-sm">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-gray-600 font-medium">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-600 font-bold hover:underline">Create account</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;
