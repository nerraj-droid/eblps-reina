"use client";

import { useEffect } from "react";
import { useLoading } from "@/lib/contexts/loading-context";

export function usePageLoading() {
    const { stopLoading } = useLoading();

    useEffect(() => {
        const timer = setTimeout(() => {
            stopLoading();
        }, 100);

        return () => clearTimeout(timer);
    }, [stopLoading]);
}
