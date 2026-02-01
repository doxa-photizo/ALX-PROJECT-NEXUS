import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRoute from "@/components/auth/AdminRoute";
import {
    Settings as SettingsIcon,
    Bell,
    Shield,
    Globe,
    Database,
    Mail,
    ChevronRight,
    Save
} from "lucide-react";

const AdminSettings = () => {
    const sections = [
        { icon: Globe, title: "Store Details", desc: "Manage your store name, URL, and branding." },
        { icon: Bell, title: "Notifications", desc: "Configure order alerts and system notifications." },
        { icon: Shield, title: "Security", desc: "Two-factor authentication and access logs." },
        { icon: Mail, title: "Email Settings", desc: "Set up SMTP and automatic customer emails." },
        { icon: Database, title: "Data Management", desc: "Export store data and manage backups." },
    ];

    return (
        <AdminRoute>
            <AdminLayout title="Settings">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-black text-gray-900 mb-8">Platform Settings</h2>
                        <div className="divide-y divide-gray-50">
                            {sections.map((section, i) => (
                                <button key={i} className="w-full flex items-center justify-between py-6 group hover:bg-gray-50 -mx-4 px-4 rounded-2xl transition-all">
                                    <div className="flex items-center gap-6 text-left">
                                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <section.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{section.title}</h3>
                                            <p className="text-sm text-gray-500 font-medium">{section.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">System Maintenance</h3>
                                <p className="text-gray-500 font-medium max-w-md">Schedule your next maintenance window or run a system diagnostic check now.</p>
                            </div>
                            <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 shrink-0">
                                Run Diagnostics
                            </button>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AdminRoute>
    );
};

export default AdminSettings;
