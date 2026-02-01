import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    LayoutDashboard,
    ShoppingBag,
    Tags,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    Package
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
    const { logout, user } = useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Products", href: "/admin/products", icon: ShoppingBag },
        { label: "Categories", href: "/admin/categories", icon: Tags },
        { label: "Orders", href: "/admin/orders", icon: Package },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="p-8 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">Nexus<span className="text-blue-600">Admin</span></span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-grow px-4 space-y-2 py-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = router.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all
                                        ${isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-50">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                        >
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-xl">
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="text-2xl font-black text-gray-900 truncate">{title}</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="pl-12 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-100 outline-none transition-all w-64 text-sm font-medium"
                            />
                        </div>

                        <button className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 rounded-xl relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="h-10 w-px bg-gray-100" />

                        <div className="flex items-center gap-4 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{user?.username || "Admin"}</p>
                                <p className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest">{user?.role || "Administrator"}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-black shadow-inner">
                                {user?.username?.charAt(0).toUpperCase() || "A"}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-grow overflow-y-auto p-8 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
