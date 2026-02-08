import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { login as apiLogin } from "@/lib/api";
import { LoginCredentials, User } from "@/interfaces";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials, role: "user" | "admin") => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role") as "user" | "admin" | null;
        if (storedToken) {
            setToken(storedToken);
            try {
                const decoded = jwtDecode(storedToken) as User;
                setUser({ ...decoded, role: storedRole || "user" });
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials, role: "user" | "admin") => {
        try {
            const response = await apiLogin(credentials);
            // Backend returns { access, refresh } tokens
            const accessToken = response.access || response.token;

            localStorage.setItem("token", accessToken);
            localStorage.setItem("role", role);
            setToken(accessToken);

            try {
                const decoded = jwtDecode(accessToken) as User;
                setUser({ ...decoded, role });
            } catch (decodeError) {
                // If token can't be decoded, create a basic user object
                setUser({
                    id: 0,
                    username: credentials.username,
                    email: "",
                    role
                });
            }

            if (role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/products");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
