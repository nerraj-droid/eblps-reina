"use client";

import { useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, Plus, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { businessPermitsApi } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { transformBackendArrayToFrontend, BackendBusinessPermit, formatDateTime } from "@/lib/data-transformer";
import { useRouter } from "next/navigation";
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

interface BusinessPermit {
  id: string;
  business_id_no: string;
  business_name: string;
  owner_name: string;
  mobile_no: string;
  email_address: string;
  latest_status: string;
  latest_status_date: string;
  status_owner: string;
  business_type: string;
  application_date: string;
  expiry_date: string;
  permit_number: string;
  address: string;
  total_fee: number;
  payment_status: string;
}

interface ApiResponse {
  data: BackendBusinessPermit[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  message: string;
}

export default function BusinessPermitList() {
  const router = useRouter();
  const [businessPermits, setBusinessPermits] = useState<BusinessPermit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBusinessPermits = async () => {
    try {
      setLoading(true);
      const response = await businessPermitsApi.getAll({
        page: currentPage,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
      });
      
      const data: ApiResponse = response.data;
      // Transform backend data to frontend format
      const transformedData = transformBackendArrayToFrontend(data.data);
      setBusinessPermits(transformedData);
      setTotalPages(data.meta.last_page);
      setTotalItems(data.meta.total);
    } catch (error) {
      console.error("Error fetching business permits:", error);
      // Fallback to mock data if API fails
      setBusinessPermits([
        {
          id: "BP-2024-001",
          business_id_no: "0203125-2025-0000669",
          business_name: "ABC CORPORATION",
          owner_name: "JOHN DOE",
          mobile_no: "+639175201190",
          email_address: "john.doe@abccorp.com",
          latest_status: "ACTIVE",
          latest_status_date: "2024-01-15T10:00:00",
          status_owner: "JOHN DOE",
          business_type: "Corporation",
          application_date: "2024-01-15",
          expiry_date: "2024-12-31",
          permit_number: "BP-2024-001",
          address: "123 Main St, Reina Mercedes",
          total_fee: 5000,
          payment_status: "Paid"
        },
        {
          id: "BP-2024-002",
          business_id_no: "0203125-2025-0000670",
          business_name: "XYZ STORE",
          owner_name: "JANE SMITH",
          mobile_no: "+639175201191",
          email_address: "jane.smith@xyzstore.com",
          latest_status: "PENDING",
          latest_status_date: "2024-01-20T14:30:00",
          status_owner: "JANE SMITH",
          business_type: "Sole Proprietorship",
          application_date: "2024-01-20",
          expiry_date: "2024-12-31",
          permit_number: "BP-2024-002",
          address: "456 Oak Ave, Reina Mercedes",
          total_fee: 3000,
          payment_status: "Unpaid"
        }
      ]);
      setTotalPages(1);
      setTotalItems(2);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessPermits();
  }, [currentPage, searchTerm, statusFilter]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(businessPermits.map(permit => permit.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      setShowDeleteDialog(true);
    }
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Delete each selected item
      for (const itemId of selectedItems) {
        await businessPermitsApi.delete(itemId);
      }
      
      // Refresh the list
      await fetchBusinessPermits();
      
      // Clear selection
      setSelectedItems([]);
      setShowDeleteDialog(false);
      
      console.log(`Successfully deleted ${selectedItems.length} business permit(s)`);
    } catch (error) {
      console.error("Error deleting business permits:", error);
      alert("Error deleting business permits. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSingleDelete = async (itemId: string) => {
    try {
      await businessPermitsApi.delete(itemId);
      await fetchBusinessPermits();
      console.log("Successfully deleted business permit");
    } catch (error) {
      console.error("Error deleting business permit:", error);
      alert("Error deleting business permit. Please try again.");
    }
  };

  const handleAddNew = () => {
    router.push('/admin');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "default";
      case "unpaid":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Business Permit List</CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 py-4">
            <Button
              variant={selectedItems.length > 0 ? "destructive" : "outline"}
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
              className="mr-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete {selectedItems.length > 0 ? `(${selectedItems.length})` : ''}
            </Button>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search permits..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleStatusFilter("")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("rejected")}>
                  Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading business permits...</span>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedItems.length === businessPermits.length && businessPermits.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Business ID No.</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>
                      <div className="flex flex-col">
                        <span>Owner / President /</span>
                        <span>Officer in Charge</span>
                      </div>
                    </TableHead>
                    <TableHead>Mobile No.</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Latest Status</TableHead>
                    <TableHead>
                      <div className="flex flex-col">
                        <span>Latest Status</span>
                        <span>Date</span>
                      </div>
                    </TableHead>
                    <TableHead>Status Owner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessPermits.map((permit) => (
                    <TableRow key={permit.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(permit.id)}
                          onCheckedChange={(checked) => handleSelectItem(permit.id, checked as boolean)}
                          aria-label={`Select ${permit.business_name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium uppercase">{permit.business_id_no || permit.permit_number}</TableCell>
                      <TableCell className="uppercase">{permit.business_name}</TableCell>
                      <TableCell className="uppercase">{permit.owner_name}</TableCell>
                      <TableCell className="uppercase">{permit.mobile_no || 'N/A'}</TableCell>
                      <TableCell>{permit.email_address || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(permit.latest_status)} className="uppercase">
                          {permit.latest_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatDateTime(permit.latest_status_date || permit.application_date)}
                      </TableCell>
                      <TableCell className="uppercase">{permit.status_owner || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleSingleDelete(permit.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {businessPermits.length === 0 && !loading && (
                <div className="text-center py-8 text-muted-foreground">
                  No business permits found.
                </div>
              )}

              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * 15) + 1} to {Math.min(currentPage * 15, totalItems)} of {totalItems} results.
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedItems.length} business permit{selectedItems.length > 1 ? 's' : ''}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Yes, Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}