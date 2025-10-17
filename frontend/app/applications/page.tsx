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
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { BusinessPermitForm } from "@/components/forms/business-permit-form";
import { applicationsApi } from "@/lib/api";
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
  const [applications, setApplications] = useState<any[]>([]);
  const [originalApplications, setOriginalApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedApplications = filteredApplications.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await applicationsApi.getAll();
        
        const applicationsData = Array.isArray(response.data) ? response.data : response.data?.data || [];
        
        const transformedApplications = applicationsData.map((app: any) => {
          const submittedDate = app.application_date ? 
            new Date(app.application_date).toLocaleDateString() : 
            new Date(app.created_at).toLocaleDateString();
          
          let applicantName = 'N/A';
          let mobileNumber = 'N/A';
          let emailAddress = 'N/A';
          
          if (app.business?.business_owner) {
            const owner = app.business.business_owner;
            applicantName = `${owner.first_name || ''} ${owner.last_name || ''}`.trim() || 'N/A';
            mobileNumber = owner.phone || 'N/A';
            emailAddress = app.business.business_email || owner.email || 'N/A';
          } else if (app.business?.business_owner_id) {
            applicantName = 'Owner ID: ' + app.business.business_owner_id;
            mobileNumber = 'N/A (Owner data not loaded)';
            emailAddress = app.business.business_email || 'N/A';
          } else {
            mobileNumber = 'N/A (No business data)';
          }
          
          return {
            id: app.permit_number || app.id,
            businessName: app.business?.business_name || 'N/A',
            applicantName: applicantName,
            mobileNumber: mobileNumber,
            emailAddress: emailAddress,
            type: app.permit_type || 'New',
            status: app.status === 'pending' ? 'Pending Review' : app.status || 'Pending Review',
            submittedDate: submittedDate,
            assignedTo: 'Admin'
          };
        });
        
        setApplications(transformedApplications);
        setOriginalApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows(new Set());
  }, [searchTerm]);


  const handleView = (application: any) => {
    const originalApp = originalApplications.find(app => 
      (app.permit_number || app.id) === application.id
    );
    
    setSelectedApplication(originalApp || application);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (application: any) => {
    const originalApp = originalApplications.find(app => 
      (app.permit_number || app.id) === application.id
    );
    setSelectedApplication(originalApp || application);
    setIsEditDialogOpen(true);
  };

  const handleNewApplication = () => {
    router.push("/application/new");
  };

  const handleFormSubmit = (formData: any) => {
    setIsEditDialogOpen(false);
  };

  const transformApplicationToFormData = (application: any) => {
    if (!application) {
      return null;
    }
    
    return application;
  };

  const handleFormCancel = () => {
    setIsEditDialogOpen(false);
    setIsViewDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleCheckboxChange = (applicationId: string, checked: boolean) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(applicationId);
      } else {
        newSet.delete(applicationId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(displayedApplications.map(app => app.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRows(new Set()); // Clear selection when changing pages
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleDelete = (application: any) => {
    setApplicationToDelete(application);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!applicationToDelete) return;
    
    try {
      setIsDeleting(true);
      
      const originalApp = originalApplications.find(app => 
        (app.permit_number || app.id) === applicationToDelete.id
      );
      
      if (originalApp) {
        await applicationsApi.delete(originalApp.id);
        
        setApplications(prev => prev.filter(app => app.id !== applicationToDelete.id));
        setOriginalApplications(prev => prev.filter(app => (app.permit_number || app.id) !== applicationToDelete.id));
        setSelectedRows(prev => {
          const newSet = new Set(prev);
          newSet.delete(applicationToDelete.id);
          return newSet;
        });
        
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application. Please try again.');
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleTDAction = (application: any) => {
  };

  const handleBulkDelete = () => {
    if (selectedRows.size === 0) return;
    setIsBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    if (selectedRows.size === 0) return;
    
    try {
      setIsBulkDeleting(true);
      
      const selectedApplications = applications.filter(app => selectedRows.has(app.id));
      
      const deletePromises = selectedApplications.map(async (app) => {
        const originalApp = originalApplications.find(origApp => 
          (origApp.permit_number || origApp.id) === app.id
        );
        
        if (originalApp) {
          return applicationsApi.delete(originalApp.id);
        }
        return Promise.resolve();
      });
      
      await Promise.all(deletePromises);
      
      setApplications(prev => prev.filter(app => !selectedRows.has(app.id)));
      setOriginalApplications(prev => prev.filter(app => !selectedRows.has(app.permit_number || app.id)));
      setSelectedRows(new Set());
      
      console.log(`${selectedApplications.length} applications deleted successfully`);
    } catch (error) {
      console.error('Error deleting applications:', error);
      alert('Failed to delete some applications. Please try again.');
    } finally {
      setIsBulkDeleting(false);
      setIsBulkDeleteDialogOpen(false);
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Business Permit List</h1>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleNewApplication}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant={selectedRows.size > 0 ? "destructive" : "outline"}
                size="sm"
                onClick={handleBulkDelete}
                disabled={selectedRows.size === 0 || isBulkDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isBulkDeleting ? 'Deleting...' : 
                 selectedRows.size > 0 ? `Delete ${selectedRows.size} selected` : 'Delete'}
              </Button>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by details"
                  className="pl-8 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={selectedRows.size === displayedApplications.length && displayedApplications.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-[231px]">Business ID No.</TableHead>
                    <TableHead className="w-[295px]">Business Name</TableHead>
                    <TableHead className="w-[200px]">Owner / President / Officer in Charge</TableHead>
                    <TableHead className="w-[146px]">Mobile No.</TableHead>
                    <TableHead className="w-[200px]">Email Address</TableHead>
                    <TableHead className="w-[136px]">Latest Status</TableHead>
                    <TableHead className="w-[136px]">Latest Status Date</TableHead>
                    <TableHead className="w-[200px]">Status Owner</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8">
                        Loading applications...
                      </TableCell>
                    </TableRow>
                  ) : displayedApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8">
                        {searchTerm ? 'No applications found matching your search.' : 'No applications found.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedApplications.map((application) => (
                    <TableRow key={application.id} className="h-[85px]">
                      <TableCell>
                        <Checkbox 
                          checked={selectedRows.has(application.id)}
                          onCheckedChange={(checked) => handleCheckboxChange(application.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.businessName}</TableCell>
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>{application.mobileNumber}</TableCell>
                      <TableCell>{application.emailAddress}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{application.submittedDate}</TableCell>
                      <TableCell>{application.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-[35px] w-[36px] p-0"
                            onClick={() => handleView(application)}
                            title="View Application"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-[35px] px-3"
                            onClick={() => handleTDAction(application)}
                            title="TD Action"
                          >
                            TD
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredApplications.length)} of {filteredApplications.length} rows
              {searchTerm && ` (filtered from ${applications.length} total)`}
            </span>
            {selectedRows.size > 0 && (
              <Badge variant="secondary">
                {selectedRows.size} selected
              </Badge>
            )}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">Delete this?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete this business permit application? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-2">
              <AlertDialogCancel 
                disabled={isDeleting}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Delete Confirmation Dialog */}
        <AlertDialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">Delete this?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Are you sure you want to delete {selectedRows.size} selected business permit application{selectedRows.size > 1 ? 's' : ''}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-2">
              <AlertDialogCancel 
                disabled={isBulkDeleting}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmBulkDelete}
                disabled={isBulkDeleting}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isBulkDeleting ? 'Deleting...' : 'Yes, Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Application Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-[1400px] w-[95vw] max-h-[90vh] overflow-y-auto" style={{ width: '95vw', maxWidth: '1400px' }}>
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
              initialData={transformApplicationToFormData(selectedApplication)}
            />
          </DialogContent>
        </Dialog>

        {/* View Application Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-[1400px] w-[95vw] max-h-[90vh] overflow-y-auto" style={{ width: '95vw', maxWidth: '1400px' }}>
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
              initialData={transformApplicationToFormData(selectedApplication)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
