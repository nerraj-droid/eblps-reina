"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Eye, Edit, CheckCircle, XCircle } from "lucide-react";

// Mock data for applications
const mockApplications = [
  {
    id: "APP-2024-001",
    businessName: "ABC Corporation",
    applicantName: "John Doe",
    type: "New",
    status: "Pending Review",
    submittedDate: "2024-01-15",
    assignedTo: "Admin 1"
  },
  {
    id: "APP-2024-002",
    businessName: "XYZ Store",
    applicantName: "Jane Smith",
    type: "Renewal",
    status: "Approved",
    submittedDate: "2024-01-20",
    assignedTo: "Admin 2"
  },
  {
    id: "APP-2024-003",
    businessName: "Tech Solutions Inc",
    applicantName: "Mike Johnson",
    type: "Additional",
    status: "Rejected",
    submittedDate: "2024-01-25",
    assignedTo: "Admin 1"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending Review":
      return "bg-yellow-100 text-yellow-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function ApplicationsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Application List</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-8 w-80"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.businessName}</TableCell>
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>{application.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.submittedDate}</TableCell>
                      <TableCell>{application.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {application.status === "Pending Review" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
