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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Plus, Eye, Edit, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { BusinessPermitForm } from "@/components/forms/business-permit-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePageLoading } from "@/lib/hooks/use-page-loading";

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
  const router = useRouter();
  usePageLoading();
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleApprove = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: "Approved" }
          : app
      )
    );
  };

  const handleReject = (applicationId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: "Rejected" }
          : app
      )
    );
  };

  const handleView = (application: any) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (application: any) => {
    setSelectedApplication(application);
    setIsEditDialogOpen(true);
  };

  const handleNewApplication = () => {
    router.push("/application/new");
  };

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
    setIsEditDialogOpen(false);
  };

  const handleFormCancel = () => {
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setSelectedApplication(null);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Applications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(application)}
                            title="View Application"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(application)}
                            title="Edit Application"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {application.status === "Pending Review" && (
                            <>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700"
                                    title="Approve Application"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Approve Application</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to approve this application? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleApprove(application.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Approve
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                    title="Reject Application"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Reject Application</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to reject this application? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleReject(application.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Reject
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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


        {/* Edit Application Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Business Permit Application</DialogTitle>
            </DialogHeader>
            <BusinessPermitForm
              title="Edit Business Permit Application"
              subtitle={`Editing application: ${selectedApplication?.id}`}
              showBackButton={false}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              submitButtonText="Update Application"
              cancelButtonText="Cancel"
              showApplicationType={true}
              isReadOnly={false}
            />
          </DialogContent>
        </Dialog>

        {/* View Application Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>View Business Permit Application</DialogTitle>
            </DialogHeader>
            <BusinessPermitForm
              title="Business Permit Application Details"
              subtitle={`Application ID: ${selectedApplication?.id} | Status: ${selectedApplication?.status}`}
              showBackButton={false}
              onSubmit={() => { }}
              onCancel={handleFormCancel}
              submitButtonText="Close"
              cancelButtonText=""
              showApplicationType={true}
              showBusinessFees={true}
              isReadOnly={true}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
