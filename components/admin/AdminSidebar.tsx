import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    LayoutDashboard,
    ShoppingBag,
    Tags,
    Package,
    Settings,
    LogOut,
    Users as UsersIcon,
    X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const router = useRouter();

    const menuItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Products", href: "/admin/products", icon: ShoppingBag },
        { label: "Categories", href: "/admin/categories", icon: Tags },
        { label: "Orders", href: "/admin/orders", icon: Package },
        { label: "Users", href: "/admin/users", icon: UsersIcon },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className={`
            fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
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
                    <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-grow px-4 space-y-2 py-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.href || router.pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                    if (window.innerWidth < 1024) onClose();
                                }}
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
    );
};

export default AdminSidebar;