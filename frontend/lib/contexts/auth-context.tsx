"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing authentication on mount
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (token) {
                    // TODO: Validate token with backend
                    // Sa ngayon, we'll just check if it exists
                    const userData = localStorage.getItem("userData");
                    if (userData) {
                        setUser(JSON.parse(userData));
                    }
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Test credentials for development
            if (email === "admin@reina.gov.ph" && password === "password123") {
                const mockUser = {
                    id: "1",
                    email: "admin@reina.gov.ph",
                    name: "Administrator",
                    role: "admin",
                };

                // Store authentication data
                localStorage.setItem("authToken", "mock-token-123");
                localStorage.setItem("userData", JSON.stringify(mockUser));

                setUser(mockUser);
                router.push("/");
                return;
            }

            // TODO: Replace with actual API call for production
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();

            // Store authentication data
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userData", JSON.stringify(data.user));

            setUser(data.user);
            router.push("/");
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        localStorage.removeItem("rememberMe");
        setUser(null);
        router.push("/login");
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
