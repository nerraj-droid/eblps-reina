"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/forms/login-form";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { useAuth } from "@/lib/contexts/auth-context";

export default function LoginPage() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
        try {
            await login(data.email, data.password);

            if (data.rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    const handleForgotPassword = async (data: { email: string }) => {
        try {
            console.log("Forgot password request:", data);

            // TODO: Implement actual forgot password logic here
            // This is a placeholder - replace with your actual API call
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send reset email");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            // TODO: Show error message to user
            alert("Failed to send reset email. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-sm text-neutral-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (showForgotPassword) {
        return (
            <ForgotPasswordForm
                onBackToLogin={() => setShowForgotPassword(false)}
                onSubmit={handleForgotPassword}
            />
        );
    }

    return (
        <LoginForm
            onForgotPassword={() => setShowForgotPassword(true)}
            onSubmit={handleLogin}
        />
    );
}
