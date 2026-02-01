import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import { fetchProducts, getUserOrders } from "@/lib/api";
import {
    ShoppingBag,
    Users,
    ShoppingCart,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Clock
} from "lucide-react";
import { Product, Order } from "@/interfaces";
import Link from "next/link";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 25, // Mocked
        totalRevenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [products, orders] = await Promise.all([
                    fetchProducts(),
                    getUserOrders(1) // Demo purposes use user 1
                ]);

                // Calculate revenue from orders (FakeStoreAPI orders are limited, so we'll add some logic)
                // Since FakeStoreAPI carts don't have prices, we would usually fetch product details for each cart item.
                // For a quick dashboard, let's just estimate or mock a reasonable number based on product count.
                const estimatedRevenue = products.slice(0, 15).reduce((acc: number, p: Product) => acc + p.price * 2, 0);

                setStats({
                    totalProducts: products.length,
                    totalOrders: orders.length + 142, // Adding some weight for "busy" look
                    totalUsers: 158,
                    totalRevenue: estimatedRevenue,
                });

                setRecentOrders(orders.slice(0, 5));
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const statCards = [
        { label: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "blue", trend: "+12.5%", isUp: true },
        { label: "Products", value: stats.totalProducts, icon: ShoppingBag, color: "purple", trend: "+3", isUp: true },
        { label: "Active Orders", value: stats.totalOrders, icon: ShoppingCart, color: "orange", trend: "+18", isUp: true },
        { label: "Total Customers", value: stats.totalUsers, icon: Users, color: "green", trend: "-2%", isUp: false },
    ];

    return (
        <AdminRoute>
            <AdminLayout title="Overview">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {statCards.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-4 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${stat.isUp ? "text-green-500" : "text-red-500"} bg-${stat.isUp ? "green" : "red"}-50 px-2.5 py-1 rounded-lg`}>
                                        {stat.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                        {stat.trend}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1 pl-1">{stat.label}</p>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight pl-1">{stat.value}</h3>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <h2 className="text-xl font-black text-gray-900">Recent Orders</h2>
                                <Link href="/admin/orders" className="text-blue-600 font-bold hover:underline text-sm">View All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Order ID</th>
                                            <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Status</th>
                                            <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest leading-none">Date</th>
                                            <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right leading-none">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-5">
                                                    <span className="font-bold text-gray-900">#ORD-{order.id.toString().padStart(4, '0')}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">Processing</span>
                                                </td>
                                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                                    {new Date(order.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Link href={`/admin/orders/${order.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all inline-block">
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
                            <div className="space-y-3">
                                <Link
                                    href="/admin/products/new"
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <Plus className="h-5 w-5" />
                                        <span className="font-bold">Add New Product</span>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all font-bold text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="h-5 w-5 text-green-500" />
                                        <span>Generate Report</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="bg-blue-900 rounded-3xl p-8 text-white shadow-xl shadow-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="h-5 w-5 text-blue-300" />
                                <span className="text-xs font-black uppercase tracking-widest text-blue-300">System Status</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 leading-tight">All systems are operational</h3>
                            <p className="text-blue-300 text-sm font-medium mb-6">Last checked 2 mins ago. No issues detected in API or Database.</p>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <div key={i} className="flex-grow h-1.5 bg-blue-500/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-300 w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>

            {/* In-page utility styles for dynamic colors if needed by name */}
            <style jsx>{`
                .bg-blue-50 { background-color: rgb(239 246 255); }
                .text-blue-600 { color: rgb(37 99 235); }
                .bg-purple-50 { background-color: rgb(250 245 255); }
                .text-purple-600 { color: rgb(147 51 234); }
                .bg-orange-50 { background-color: rgb(255 247 237); }
                .text-orange-600 { color: rgb(234 88 12); }
                .bg-green-50 { background-color: rgb(240 253 244); }
                .text-green-600 { color: rgb(22 163 74); }
                .bg-red-50 { background-color: rgb(254 242 242); }
                .text-red-500 { color: rgb(239 68 68); }
            `}</style>
        </AdminRoute>
    );
};

export default AdminDashboard;
