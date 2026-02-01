import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import { getUserOrders } from "@/lib/api";
import { Order } from "@/interfaces";
import {
    Package,
    Calendar,
    ChevronRight,
    Filter,
    Search,
    CheckCircle,
    Clock,
    Truck,
    AlertCircle
} from "lucide-react";

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                // Fetching user 1 orders as a demo
                const data = await getUserOrders(1);
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadOrders();
    }, []);

    return (
        <AdminRoute>
            <AdminLayout title="Orders">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search orders by ID, customer..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                            <Filter className="h-5 w-5" />
                            Filters
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Order ID</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Date</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Status</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Items</th>
                                    <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right leading-none">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-32" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-24" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-20" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-12" /></td>
                                            <td className="px-8 py-6"><div className="h-4 bg-gray-100 rounded w-20 ml-auto" /></td>
                                        </tr>
                                    ))
                                ) : orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <span className="font-bold text-gray-900 italic">#NXS-{order.id.toString().padStart(5, '0')}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium">
                                                <Calendar className="h-4 w-4 text-gray-300" />
                                                {new Date(order.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100/50 w-fit">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                                                Processing
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-gray-900 font-bold">{order.products.length}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:translate-x-1 transition-transform">
                                                Manage Order
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default AdminOrders;
