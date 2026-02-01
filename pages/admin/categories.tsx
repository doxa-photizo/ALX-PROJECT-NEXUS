import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import {
    Plus,
    Tags,
    MoreVertical,
    Edit2,
    Trash2,
    Layers,
    ArrowUpRight,
    Search
} from "lucide-react";

const AdminCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products/categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCategories();
    }, []);

    return (
        <AdminRoute>
            <AdminLayout title="Categories">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <p className="text-gray-500 font-medium max-w-lg">
                        Organize your products into meaningful groupings to help customers find what they&apos;re looking for.
                    </p>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
                        <Plus className="h-5 w-5" />
                        New Category
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white h-48 rounded-[32px] border border-gray-100 animate-pulse" />
                        ))
                    ) : categories.map((category) => (
                        <div key={category} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all group">
                            <div className="flex items-start justify-between mb-8">
                                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Tags className="h-6 w-6" />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 capitalize mb-2">{category}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">12 Products</p>
                                <button className="flex items-center gap-1 text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                    Manage
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Add Category Card */}
                    <button className="border-4 border-dashed border-gray-50 rounded-[32px] p-8 flex flex-col items-center justify-center text-center hover:border-blue-100 hover:bg-blue-50/20 transition-all group">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Plus className="h-6 w-6 text-gray-300 group-hover:text-blue-600" />
                        </div>
                        <p className="font-bold text-gray-400 group-hover:text-gray-900 transition-colors">Add Category</p>
                    </button>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default AdminCategories;
