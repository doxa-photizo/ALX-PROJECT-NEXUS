import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { Users, Target, ShieldCheck, Zap } from "lucide-react";

const AboutPage = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar
                navigationLink={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "About", href: "/about" },
                    { label: "Contact", href: "/contact" },
                ]}
                cartSummary={{ totalItems, onCartClick: () => router.push("/cart") }}
                userProfile={{
                    isAuthenticated: !!user,
                    username: user?.username,
                    role: user?.role,
                    onLogout: logout,
                }}
                searchHandlingProps={{ query: "", onSearch: () => { }, onSearchSubmit: (e) => e.preventDefault() }}
            />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-8 italic italic">The <span className="text-blue-600">Nexus</span> Story</h1>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed mb-16">
                        We believe that high-quality technology and fashion should be accessible to everyone. Nexus Store was founded to bridge the gap between premium design and affordable prices.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                        {[
                            { icon: Target, title: "Our Mission", desc: "To provide the best shopping experience with curated high-quality products." },
                            { icon: Users, title: "Our Community", desc: "Building a global network of tech enthusiasts and fashion-forward individuals." },
                            { icon: ShieldCheck, title: "Quality First", desc: "Every product in our store undergoes rigorous quality checks." },
                            { icon: Zap, title: "Speed & Service", desc: "Fast shipping and 24/7 customer support to keep you satisfied." },
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 ring-1 ring-gray-100 hover:ring-blue-100 transition-all">
                                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                    <feature.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-500 text-sm font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
