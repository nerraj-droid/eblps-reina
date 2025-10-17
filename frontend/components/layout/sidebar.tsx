"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Home,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { useLoading } from "@/lib/contexts/loading-context";
import { useAuth } from "@/lib/contexts/auth-context";
import { useEffect } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Create Application", href: "/application/new", icon: FileCheck },
  { name: "Admin Create Application", href: "/admin", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { startLoading, stopLoading } = useLoading();
  const { logout } = useAuth();

  // Stop loading when pathname changes (page has loaded)
  useEffect(() => {
    stopLoading();
  }, [pathname, stopLoading]);

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      startLoading();
      router.push(href);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={cn(
      "hidden md:flex md:flex-col md:h-screen md:fixed md:left-0 md:top-0 md:z-50 transition-all duration-300",
      isCollapsed ? "md:w-16" : "md:w-60"
    )}>
      <div className="flex flex-col flex-grow bg-blue-50 border-r border-blue-200 overflow-y-auto h-full">
        <div className="flex items-center flex-shrink-0 h-16 px-4 py-0 border-b border-blue-200 bg-blue-50">
          <div className="relative h-12 w-12">
            <Image
              src="/reina.png"
              alt="Municipality Logo"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
          {!isCollapsed && (
            <div className="ml-3 flex flex-col">
              <span className="font-semibold text-lg text-slate-900">eBPLS</span>
              <span className="text-xs text-slate-600">Business Permit System</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 hover:bg-blue-100 text-slate-600"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex-grow flex flex-col py-4">
          <nav className="flex-1 px-3 space-y-1">
            <div className="px-3 py-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {!isCollapsed && "MENU"}
              </p>
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 px-3 text-left font-normal transition-colors rounded-md",
                    isCollapsed ? "justify-center px-0" : "",
                    isActive
                      ? "bg-blue-200 text-slate-900"
                      : "text-slate-700 hover:bg-blue-100 hover:text-slate-900"
                  )}
                  title={isCollapsed ? item.name : undefined}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className={cn(
                    "h-4 w-4",
                    isCollapsed ? "" : "mr-3",
                    isActive ? "text-slate-900" : "text-slate-600"
                  )} />
                  {!isCollapsed && item.name}
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="px-3 py-4 border-t border-blue-200">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 text-left font-normal transition-colors rounded-md text-red-500 hover:bg-red-50 hover:text-red-600",
              isCollapsed ? "justify-center px-0" : ""
            )}
            title={isCollapsed ? "Logout" : undefined}
            onClick={handleLogout}
          >
            <LogOut className={cn(
              "h-4 w-4",
              isCollapsed ? "" : "mr-3"
            )} />
            {!isCollapsed && "Logout"}
          </Button>
        </div>
      </div>
    </aside>
  );
}
