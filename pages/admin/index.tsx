import Sidebar from "@/components/admin/AdminSidebar";
import { AdminLayoutProps } from "@/interfaces/";
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminLayout } from "@/components/layout/AdminLayout";

import { Columns2,UserStar ,LogOut  ,ChartColumn,ShoppingCart ,User, Package, Settings,LayoutDashboard } from 'lucide-react';



export default function AdminPage(): React.ReactNode {
    return (

        <AdminLayout>
            <div>
                <AdminHeader title="Dashboard" />

            </div>
            <div className="flex">  
            <Sidebar links={[
                {label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-6 w-6 mb-4 cursor-pointer"/>},
                {label: "Products", href: "/admin/products", icon: <Package className="h-6 w-6 mb-4 cursor-pointer"/>},
                {label: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-6 w-6 mb-4 cursor-pointer"/>},
                {label: "Users", href: "/admin/users", icon: <User className="h-6 w-6 mb-4 cursor-pointer"/>},
                {label: "Settings", href: "/admin/settings", icon: <Settings className="h-6 w-6 mb-4 cursor-pointer"/>},
            ]} />
            <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                {/* Admin content goes here */}
            </main>
        </div>
        </AdminLayout>
    );
}