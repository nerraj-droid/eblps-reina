"use client";

import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings,
  Home,
  FileCheck
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Business Permits", href: "/business-permits", icon: FileText },
  { name: "Applications", href: "/applications", icon: FileCheck },
  { name: "Constituents", href: "/constituents", icon: Users },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "API Test", href: "/api-test", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-gray-50 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">eB</span>
          </div>
          <span className="ml-2 font-semibold text-lg">eBPLS</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
