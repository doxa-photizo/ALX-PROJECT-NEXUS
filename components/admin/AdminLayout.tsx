import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ProtectedRoute from "@/components/common/ProtectedRoute";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ProtectedRoute adminOnly>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
                    {/* Header */}
                    <AdminHeader
                        title={title}
                        onMenuClick={() => setSidebarOpen(true)}
                    />

                    {/* Page Content */}
                    <main className="flex-grow overflow-y-auto p-8 bg-gray-50">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;
