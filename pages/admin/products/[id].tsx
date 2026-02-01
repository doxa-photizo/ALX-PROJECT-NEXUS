import React, { useState, useEffect } from "react";
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
    Type,
    Trash2,
    Eye
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchProduct } from "@/lib/api";
import { Product } from "@/interfaces";

const EditProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState<Partial<Product>>({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        if (!id) return;
        const loadProduct = async () => {
            try {
                const data = await fetchProduct(id as string);
                setFormData(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setIsFetching(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation
        setTimeout(() => {
            alert("Product updated successfully! (Simulated)");
            router.push("/admin/products");
        }, 1500);
    };

    if (isFetching) {
        return (
            <AdminRoute>
                <AdminLayout title="Edit Product">
                    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl mb-4 border border-blue-100 flex items-center justify-center">
                            <Layers className="h-8 w-8 text-blue-600 animate-bounce" />
                        </div>
                        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Loading Product Data...</p>
                    </div>
                </AdminLayout>
            </AdminRoute>
        );
    }

    return (
        <AdminRoute>
            <AdminLayout title={`Editing: ${formData.title?.split(' ').slice(0, 3).join(' ')}...`}>
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => router.push("/admin/products")}
                            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group"
                        >
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Products
                        </button>
                        <div className="flex gap-3">
                            <Link
                                href={`/products/${id}`}
                                target="_blank"
                                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                            >
                                <Eye className="h-4 w-4" />
                                View in Store
                            </Link>
                            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-sm hover:bg-red-100 transition-all">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>

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
                                            rows={8}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-black text-gray-900">Product Image</h2>
                                    <button type="button" className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Change Image</button>
                                </div>
                                <div className="bg-gray-50 rounded-[32px] p-12 flex items-center justify-center group overflow-hidden relative">
                                    <img
                                        src={formData.image}
                                        alt={formData.title}
                                        className="h-64 object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button type="button" className="p-4 bg-white rounded-2xl text-gray-900 shadow-xl hover:scale-110 transition-transform">
                                            <Upload className="h-6 w-6" />
                                        </button>
                                        <button type="button" className="p-4 bg-white rounded-2xl text-red-500 shadow-xl hover:scale-110 transition-transform">
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Image URL..."
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all font-bold text-gray-900 text-sm"
                                />
                            </div>
                        </div>

                        {/* Right: Sidebar / Meta */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8 text-center bg-blue-600 text-white relative overflow-hidden group">
                                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative">
                                    <p className="text-xs font-black text-white/60 uppercase tracking-widest mb-2">Live Status</p>
                                    <h3 className="text-3xl font-black tracking-tight mb-4">Active</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                                        Visible on Store
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-8">
                                <h2 className="text-xl font-black text-gray-900">Pricing</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Base Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
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
                                <h2 className="text-xl font-black">Changes</h2>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-500">Last Modified</span>
                                        <span className="text-xs font-bold">Today, 2:45 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-500">Editor</span>
                                        <span className="text-xs font-bold">Admin-01</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50 group active:scale-[0.98]"
                                    >
                                        {isLoading ? "Saving..." : "Update Product"}
                                        <Save className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => router.push("/admin/products")}
                                        className="w-full bg-white/5 text-gray-400 py-3 rounded-2xl font-bold hover:text-white transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default EditProduct;
