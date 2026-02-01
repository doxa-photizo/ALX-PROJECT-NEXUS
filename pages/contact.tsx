import React from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
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

            <main className="flex-grow bg-gray-50 py-20 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
                    {/* Contact Info */}
                    <div className="bg-gray-900 p-12 text-white flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-black mb-6">Get in touch</h1>
                            <p className="text-gray-400 font-medium mb-12">We&apos;re here to help you with any questions about your order or our products.</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Mail className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Email us</p>
                                        <p className="font-bold">support@nexusstore.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Phone className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Call us</p>
                                        <p className="font-bold">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Our Store</p>
                                        <p className="font-bold">123 Tech Lane, Silicon Valley, CA</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-12">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 bg-white/5 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer" />
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-12">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">First Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email</label>
                                <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Message</label>
                                <textarea className="w-full bg-gray-50 border-none rounded-3xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold h-32 resize-none" />
                            </div>
                            <button className="w-full bg-blue-600 text-white rounded-2xl py-5 font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group active:scale-[0.98]">
                                Send Message
                                <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
