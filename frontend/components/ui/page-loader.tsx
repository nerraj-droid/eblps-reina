"use client";

import { cn } from "@/lib/utils";

interface PageLoaderProps {
    isLoading: boolean;
    className?: string;
}

export function PageLoader({ isLoading, className }: PageLoaderProps) {
    if (!isLoading) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm",
            className
        )}>
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner */}
                <div className="relative">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-200"></div>
                    <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                </div>

                {/* Loading text */}
                <div className="text-center">
                    <p className="text-sm font-medium text-slate-900">Loading...</p>
                    <p className="text-xs text-slate-500">Please wait while we prepare the page</p>
                </div>
            </div>
        </div>
    );
}
