"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  CreditCard, 
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Home() {
  const stats = [
    {
      title: "Total Applications",
      value: "1,234",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Permits",
      value: "856",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending Review",
      value: "89",
      change: "-3%",
      icon: Clock,
      color: "text-yellow-600"
    },
    {
      title: "Revenue",
      value: "₱2.4M",
      change: "+15%",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "application",
      message: "New business permit application submitted by ABC Corporation",
      time: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "approval",
      message: "Business permit approved for XYZ Store",
      time: "4 hours ago",
      status: "approved"
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received from Tech Solutions Inc",
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      type: "renewal",
      message: "Permit renewal request from Local Restaurant",
      time: "1 day ago",
      status: "pending"
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Electronic Business Permit and Licensing System
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Quick Actions */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>New Application</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>View Constituents</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Process Payment</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Generate Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.status === "approved" && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                      {activity.status === "pending" && (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      )}
                      {activity.status === "completed" && (
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}