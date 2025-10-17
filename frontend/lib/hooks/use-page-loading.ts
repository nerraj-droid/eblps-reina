"use client";

import { useEffect } from "react";
import { useLoading } from "@/lib/contexts/loading-context";

export function usePageLoading() {
    const { stopLoading } = useLoading();

    useEffect(() => {
        // Stop loading when component mounts
        const timer = setTimeout(() => {
            stopLoading();
        }, 50); // Small delay to ensure component is fully mounted

        return () => clearTimeout(timer);
    }, [stopLoading]);

    // Also stop loading on unmount to prevent stuck states
    useEffect(() => {
        return () => {
            stopLoading();
        };
    }, [stopLoading]);
}
