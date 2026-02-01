import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/interfaces";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit2,
    Trash2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            // In a real app, we'd call the API: await deleteProduct(id);
            alert(`Product ${id} deleted (Simulated)`);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <AdminRoute>
            <AdminLayout title="Products">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <Filter className="h-5 w-5" />
                            Filters
                        </button>
                        <Link
                            href="/admin/products/new"
                            className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                            <Plus className="h-5 w-5" />
                            Add Product
                        </Link>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Product</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Category</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Price</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Stock</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right leading-none">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-48" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-16" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-12" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-24 ml-auto" /></td>
                                        </tr>
                                    ))
                                ) : filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 p-2 border border-gray-100 group-hover:scale-110 transition-transform">
                                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 line-clamp-1 truncate hover:text-blue-600 transition-colors cursor-pointer" title={product.title}>{product.title}</p>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">ID: #{product.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-black text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-gray-500 font-bold text-sm">84 in stock</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => router.push(`/admin/products/${product.id}`)}
                                                    className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    target="_blank"
                                                    className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
                                                    title="View Storefront"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-8 border-t border-gray-50 flex items-center justify-between">
                        <p className="text-sm font-bold text-gray-400">
                            Showing <span className="text-gray-900">{filteredProducts.length}</span> of <span className="text-gray-900">{products.length}</span> products
                        </p>
                        <div className="flex items-center gap-2">
                            <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl disabled:opacity-30" disabled>
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <div className="flex items-center gap-1">
                                <button className="w-10 h-10 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100">1</button>
                                <button className="w-10 h-10 text-gray-400 hover:bg-gray-50 rounded-xl font-bold">2</button>
                                <button className="w-10 h-10 text-gray-400 hover:bg-gray-50 rounded-xl font-bold">3</button>
                            </div>
                            <button className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default AdminProducts;
