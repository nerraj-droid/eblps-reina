"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, User, ChevronDown } from "lucide-react";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { isCollapsed } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className={cn(
        "flex h-16 items-center justify-end px-4 transition-all duration-300",
        isCollapsed ? "md:pl-20" : "md:pl-60"
      )}>
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
                  <p className="text-sm font-medium leading-none">Christina Maria Newman</p>
                  <p className="text-xs leading-none text-slate-500">
                    christina.newman@example.com
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
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
