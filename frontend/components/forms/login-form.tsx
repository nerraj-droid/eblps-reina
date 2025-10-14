"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
    onForgotPassword?: () => void;
    onSubmit?: (data: LoginFormData) => void;
}

export function LoginForm({ onForgotPassword, onSubmit }: LoginFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "admin@reina.gov.ph",
            password: "password123",
            rememberMe: false,
        },
    });

    const rememberMe = watch("rememberMe");

    const handleFormSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(data);
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 bg-[url('/reina-hall.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-blue-500/75" />
            <div className="relative z-10 w-full max-w-md">
                <Card className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-[74px] h-[74px] relative">
                            <Image
                                src="/reina.png"
                                alt="Reina Mercedes Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold text-neutral-950 tracking-tight">
                                eBPLS | Electronic Business Permit and Licensing System
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                        <div className="space-y-6">
                            {/* Test Credentials: admin@reina.gov.ph / password123 */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-neutral-950">
                                    Username / Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="emailaddress@email.com"
                                    className="h-9"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-neutral-950">
                                    Password <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-9"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
                                    />
                                    <Label
                                        htmlFor="rememberMe"
                                        className="text-sm text-neutral-700 cursor-pointer"
                                    >
                                        Remember Me
                                    </Label>
                                </div>
                                <button
                                    type="button"
                                    onClick={onForgotPassword}
                                    className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                                >
                                    Forgot your password?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-9 bg-blue-500 hover:bg-blue-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
