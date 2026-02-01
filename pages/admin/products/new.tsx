import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import {
    ArrowLeft,
    Upload,
    Save,
    X,
    ImageIcon,
    DollarSign,
    Tag,
    Layers,
    Type
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const NewProduct = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        category: "electronics",
        image: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation
        setTimeout(() => {
            alert("Product created successfully! (Simulated)");
            router.push("/admin/products");
        }, 1500);
    };

    return (
        <AdminRoute>
            <AdminLayout title="Add New Product">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Products
                    </button>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8">
                                <h2 className="text-xl font-black text-gray-900">General Information</h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Product Title</label>
                                        <div className="relative">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Nexus Pro Wireless Headphones"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Description</label>
                                        <textarea
                                            required
                                            rows={6}
                                            placeholder="Write a clear, compelling description of your product..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8">
                                <h2 className="text-xl font-black text-gray-900">Media</h2>
                                <div className="border-4 border-dashed border-gray-50 rounded-[32px] p-12 text-center hover:border-blue-100 hover:bg-blue-50/10 transition-all cursor-pointer group">
                                    <div className="mx-auto w-20 h-20 bg-gray-50 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                        <Upload className="h-8 w-8 text-gray-400 group-hover:text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Upload product image</h3>
                                    <p className="text-gray-400 text-sm font-medium mb-6">Drag and drop your image here, or click to browse</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">PNG</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">JPG</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">SVG</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Or paste image URL here..."
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="mt-8 w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900 text-center text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Sidebar / Meta */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8">
                                <h2 className="text-xl font-black text-gray-900">Pricing & Inventory</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Base Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Category</label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full pl-12 pr-10 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900 appearance-none"
                                            >
                                                <option value="electronics">Electronics</option>
                                                <option value="jewelery">Jewelery</option>
                                                <option value="men's clothing">Men&apos;s Clothing</option>
                                                <option value="women's clothing">Women&apos;s Clothing</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900 p-8 rounded-[32px] shadow-xl shadow-blue-100/20 text-white space-y-8">
                                <h2 className="text-xl font-black">Publishing</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="font-bold text-gray-400">Visibility</span>
                                        <span className="px-3 py-1 bg-green-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Public</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <span className="font-bold text-gray-400">Availability</span>
                                        <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">In Stock</span>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50 group active:scale-[0.98]"
                                >
                                    {isLoading ? "Saving..." : "Save Product"}
                                    <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.push("/admin/products")}
                                    className="w-full bg-white/5 text-gray-400 py-3 rounded-2xl font-bold hover:text-white transition-all text-sm"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default NewProduct;
