"use client";

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { PageLoader } from "@/components/ui/page-loader";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { useLoading } from "@/lib/contexts/loading-context";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isCollapsed } = useSidebar();
  const { isLoading } = useLoading();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={cn(
          "flex-1 p-6 transition-all duration-300",
          isCollapsed ? "md:ml-16" : "md:ml-72"
        )}>
          {children}
        </main>
      </div>
      <PageLoader isLoading={isLoading} />
    </div>
  );
}
