import React, { useState } from "react";
import { SidebarProps } from "@/interfaces/";
import Link from "next/link";
import { Columns2,UserStar  ,ChartColumn,ShoppingCart ,User, Package, Settings,LayoutDashboard } from 'lucide-react';


const SidebarLinks: Record<string, SidebarProps> = {
    admin: {
        links: [ { label: "Dashboard", href: "/admin/dashboard" ,icon: <LayoutDashboard  className="h-6 w-6 mb-4 cursor-pointer"/>},
                   { label: "Products", href: "/admin/products" ,icon: <Package className="h-6 w-6 mb-4 cursor-pointer"/>},
                 { label: "Orders", href: "/admin/orders" ,icon: <ShoppingCart className="h-6 w-6 mb-4 cursor-pointer"/>},
                    {label: "Analytics", href: "/admin/analytics" ,icon: <ChartColumn className="h-6 w-6 mb-4 cursor-pointer"/>}

                ]
    }
};



const Sidebar: React.FC<SidebarProps> = ({ links}) => {

    const [,setIsCollapsed] = useState(false); // Placeholder for collapse state logic


return(
<div className="min-h-screen bg-gray-100">
    <div>
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <UserStar className="h-8 w-8 text-blue-600"/>
            <h2 className="text-xl font-bold text-gray-800">Nexus Admin</h2>
            <button
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
                <Columns2 className="h-6 w-6"/>
            </button>
    </div>
        <div className="container mx-auto px-4 py-8">
            {links.map((link) => (
                
                <Link key={link.href} href={link.href}>
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.label}
                </Link>
                
            ))}
        </div>
    </div>
    </div>
);             
}

export default Sidebar; 