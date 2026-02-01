import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, token, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!token || user?.role !== "admin")) {
            // If not logged in or not admin, redirect or stay if we want to show "Access Denied"
            // For now, let's redirect to login if no token, otherwise we show access denied UI below
            if (!token) {
                router.push("/login");
            }
        }
    }, [token, user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">Verifying Admin Access...</p>
                </div>
            </div>
        );
    }

    if (!token || user?.role !== "admin") {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 text-center max-w-md">
                    <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <ShieldAlert className="h-10 w-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
                    <p className="text-gray-500 mb-8">
                        You do not have the necessary permissions to access the admin area. Please sign in with an admin account.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => router.push("/login")}
                            className="bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all"
                        >
                            Sign in as Admin
                        </button>
                        <button
                            onClick={() => router.push("/products")}
                            className="text-gray-500 font-bold hover:underline py-2"
                        >
                            Back to Store
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AdminRoute;
