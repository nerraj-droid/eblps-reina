"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User, ChevronDown, LogOut } from "lucide-react";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { isCollapsed } = useSidebar();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      {
        label: 'Dashboard',
        href: '/',
        isActive: pathname === '/'
      }
    ];

    if (pathSegments.length > 0) {
      if (pathSegments[0] === 'applications') {
        breadcrumbs.push({
          label: 'Applications',
          href: '/applications',
          isActive: pathname === '/applications'
        });
      } else if (pathSegments[0] === 'application' && pathSegments[1] === 'new') {
        breadcrumbs.push({
          label: 'Create Application',
          href: '/application/new',
          isActive: pathname === '/application/new'
        });
      } else if (pathSegments[0] === 'admin') {
        breadcrumbs.push({
          label: 'Admin',
          href: '/admin',
          isActive: pathname === '/admin'
        });
      } else if (pathSegments[0] === 'payment') {
        breadcrumbs.push({
          label: 'Payment',
          href: '/payment',
          isActive: pathname === '/payment'
        });
      } else if (pathSegments[0] === 'reports') {
        breadcrumbs.push({
          label: 'Reports',
          href: '/reports',
          isActive: pathname === '/reports'
        });
      } else if (pathSegments[0] === 'settings') {
        breadcrumbs.push({
          label: 'Settings',
          href: '/settings',
          isActive: pathname === '/settings'
        });
      } else if (pathSegments[0] === 'constituents') {
        breadcrumbs.push({
          label: 'Constituents',
          href: '/constituents',
          isActive: pathname === '/constituents'
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className={cn(
        "flex h-16 items-center justify-between px-4 transition-all duration-300",
        isCollapsed ? "md:pl-20" : "md:pl-60"
      )}>
        {/* Breadcrumbs */}
        <div className="flex items-center ml-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {breadcrumb.isActive ? (
                      <BreadcrumbPage className="text-slate-600">
                        {breadcrumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={breadcrumb.href} className="text-slate-500 hover:text-slate-700">
                          {breadcrumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-slate-100 rounded-lg"
            title="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-600" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:bg-slate-100 rounded-lg"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-slate-600" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-auto px-2 hover:bg-slate-100 rounded-lg"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/reina.png" alt="User Profile" />
                  <AvatarFallback className="bg-slate-100 text-slate-700 font-medium text-sm">
                    CN
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 ml-2 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs leading-none text-slate-500">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
