import React from "react";
import {
    Menu,
    Bell,
    Search
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminHeaderProps {
    title: string;
    onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-xl">
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
    );
};

export default AdminHeader;