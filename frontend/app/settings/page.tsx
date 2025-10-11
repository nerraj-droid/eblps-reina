"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, User, Bell, Shield, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@ebpls.gov.ph" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+63 912 345 6789" />
              </div>
              
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch id="sms-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup data daily
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode for system updates
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>System Information</Label>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Version: 1.0.0</p>
                  <p>Last Updated: January 15, 2024</p>
                  <p>Database Status: Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
