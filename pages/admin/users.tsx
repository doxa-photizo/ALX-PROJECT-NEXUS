import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import { fetchUsers, getUserOrders } from "@/lib/api";
import { User, Order } from "@/interfaces";
import {
    Search,
    Filter,
    Mail,
    Phone,
    MapPin,
    Calendar,
    ChevronRight,
    User as UserIcon,
    ShoppingBag
} from "lucide-react";

interface UserWithStats extends User {
    orderCount: number;
    totalSpent: number;
    addresses?: any[];
}

const AdminUsers = () => {
    const [users, setUsers] = useState<UserWithStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadUsersData = async () => {
            try {
                const fetchedUsers = await fetchUsers();

                // For each user, let's fetch their orders to show activity
                // In a real app, this would be a single optimized API call
                const usersWithStats = await Promise.all(
                    fetchedUsers.slice(0, 10).map(async (user: any) => {
                        const orders = await getUserOrders(); // Simplified for mock
                        return {
                            ...user,
                            orderCount: orders.length,
                            // Fake some spent data for design purposes
                            totalSpent: orders.length * 124.50
                        };
                    })
                );

                setUsers(usersWithStats);
            } catch (error) {
                console.error("Failed to load users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUsersData();
    }, []);

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminRoute>
            <AdminLayout title="Customers & Activity">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-700"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Filter className="h-5 w-5" />
                        Filters
                    </button>
                </div>

                {/* Users List */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-[32px] p-8 border border-gray-100 animate-pulse">
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl" />
                                    <div className="space-y-2">
                                        <div className="h-5 bg-gray-100 rounded w-48" />
                                        <div className="h-4 bg-gray-100 rounded w-32" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-gray-50 rounded-2xl" />
                                    <div className="h-12 bg-gray-50 rounded-2xl" />
                                </div>
                            </div>
                        ))
                    ) : filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white rounded-[32px] p-8 border border-gray-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 font-black text-2xl group-hover:scale-110 transition-transform shadow-inner">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 mb-1">{user.username}</h3>
                                        <p className="text-gray-400 font-bold text-sm tracking-tight flex items-center gap-2">
                                            <span className="text-blue-600">@{user.username}</span>
                                            <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                            Customer ID: #{user.id.toString().padStart(4, '0')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${user.orderCount > 0 ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"}`}>
                                        {user.orderCount > 0 ? "Active Buyer" : "New User"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                                        <Mail className="h-4 w-4 text-blue-400" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                                        <Phone className="h-4 w-4 text-blue-400" />
                                        {user.phone_number || "No phone provided"}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                                        <MapPin className="h-4 w-4 text-blue-400" />
                                        {user.addresses?.[0]?.city || "No City"}
                                    </div>
                                </div>
                                <div className="bg-gray-50/50 rounded-2xl p-6 flex flex-col justify-center">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Order History</p>
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <p className="text-2xl font-black text-gray-900">{user.orderCount}</p>
                                            <p className="text-xs font-bold text-gray-500">Total Bookings</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-blue-600">${user.totalSpent.toFixed(2)}</p>
                                            <p className="text-xs font-bold text-gray-500">Total Spent</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <Calendar className="h-4 w-4" />
                                    Last active: 2 days ago
                                </div>
                                <button className="flex items-center gap-2 text-sm font-black text-blue-600 hover:translate-x-1 transition-transform">
                                    View Full Activity
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default AdminUsers;
