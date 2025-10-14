"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
    onBackToLogin?: () => void;
    onSubmit?: (data: ForgotPasswordFormData) => void;
}

export function ForgotPasswordForm({ onBackToLogin, onSubmit }: ForgotPasswordFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const handleFormSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            if (onSubmit) {
                await onSubmit(data);
            }
            setIsSubmitted(true);
        } catch (error) {
            console.error("Forgot password error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
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

                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-lg font-semibold text-neutral-950">
                                    Check Your Email
                                </h2>
                                <p className="text-sm text-neutral-600">
                                    We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                                </p>
                            </div>
                            <Button
                                onClick={onBackToLogin}
                                variant="outline"
                                className="w-full"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Login
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

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

                    <div className="space-y-4">
                        <div className="text-center space-y-2">
                            <h2 className="text-lg font-semibold text-neutral-950">
                                Forgot Password?
                            </h2>
                            <p className="text-sm text-neutral-600">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-neutral-950">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="h-9"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    className="w-full h-9 bg-blue-500 hover:bg-blue-600 text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={onBackToLogin}
                                    variant="outline"
                                    className="w-full"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Login
                                </Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
}
