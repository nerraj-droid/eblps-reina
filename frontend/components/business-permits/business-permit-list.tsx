"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Plus,
    Trash2,
    Search,
    Eye,
    MoreHorizontal,
    Edit,
    CheckCircle,
    XCircle,
    FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { businessPermitsApi } from "@/lib/api";
import Link from "next/link";

interface BusinessPermit {
    id: number;
    permit_number: string;
    status: string;
    application_date: string;
    approved_at?: string;
    approved_by?: string;
    business: {
        business_name: string;
        business_owner: {
            first_name: string;
            last_name: string;
            middle_name?: string;
            mobile_number: string;
            email: string;
        };
    };
}

export function BusinessPermitList() {
    const [businessPermits, setBusinessPermits] = useState<BusinessPermit[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0
    });

    const fetchBusinessPermits = async (page = 1, search = "") => {
        try {
            setLoading(true);
            const response = await businessPermitsApi.getAll({
                page,
                search: search || undefined
            });

            setBusinessPermits(response.data.data);
            setPagination(response.data.meta);
        } catch (error) {
            console.error("Error fetching business permits:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessPermits();
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        fetchBusinessPermits(1, value);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(businessPermits.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: number, checked: boolean) => {
        if (checked) {
            setSelectedItems(prev => [...prev, id]);
        } else {
            setSelectedItems(prev => prev.filter(item => item !== id));
        }
    };

    const handleDeleteClick = () => {
        if (selectedItems.length > 0) {
            setDeleteDialogOpen(true);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            for (const id of selectedItems) {
                await businessPermitsApi.delete(id.toString());
            }
            setSelectedItems([]);
            setDeleteDialogOpen(false);
            fetchBusinessPermits(pagination.current_page, searchTerm);
        } catch (error) {
            console.error("Error deleting business permits:", error);
        }
    };

    const handleViewPermit = (permitId: number) => {
        // Navigate to view permit page
        window.open(`/business-permits/${permitId}`, '_blank');
    };

    const handleEditPermit = (permitId: number) => {
        // Navigate to edit permit page
        window.location.href = `/business-permits/${permitId}/edit`;
    };

    const handleApprovePermit = async (permitId: number) => {
        try {
            await businessPermitsApi.approve(permitId.toString());
            fetchBusinessPermits(pagination.current_page, searchTerm);
        } catch (error) {
            console.error("Error approving business permit:", error);
        }
    };

    const handleRejectPermit = async (permitId: number) => {
        const reason = prompt("Please provide a reason for rejection:");
        if (reason) {
            try {
                await businessPermitsApi.reject(permitId.toString(), reason);
                fetchBusinessPermits(pagination.current_page, searchTerm);
            } catch (error) {
                console.error("Error rejecting business permit:", error);
            }
        }
    };

    const handlePrintPermit = (permitId: number) => {
        // Open print dialog for permit
        window.open(`/business-permits/${permitId}/print`, '_blank');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800',
            'new_submission': 'bg-blue-100 text-blue-800'
        };

        return statusMap[status as keyof typeof statusMap] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-slate-900">Business Permit List</h1>
                <Link href="/application/new">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Application
                    </Button>
                </Link>
            </div>

            {/* Table Card */}
            <Card>
                <CardContent className="p-6">
                    {/* Search and Actions */}
                    <div className="flex items-center gap-4 mb-6">
                        <Button
                            variant={selectedItems.length > 0 ? "destructive" : "outline"}
                            size="sm"
                            className={selectedItems.length > 0 ? "" : "bg-slate-100"}
                            disabled={selectedItems.length === 0}
                            onClick={handleDeleteClick}
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Search by details"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-blue-50 border-b border-slate-200">
                            <div className="flex items-center gap-1 p-4 text-sm font-medium text-slate-900">
                                <div className="w-8 flex justify-center">
                                    <Checkbox
                                        checked={selectedItems.length === businessPermits.length && businessPermits.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">Business ID No.</div>
                                <div className="flex-2 min-w-0">Business Name</div>
                                <div className="flex-2 min-w-0">
                                    <div className="leading-tight">
                                        <div>Owner / President /</div>
                                        <div>Officer in Charge</div>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">Mobile No.</div>
                                <div className="flex-2 min-w-0">Email Address</div>
                                <div className="flex-1 min-w-0">Latest Status</div>
                                <div className="flex-1 min-w-0">Latest Status Date</div>
                                <div className="flex-1 min-w-0">Status Owner</div>
                                <div className="w-20 flex justify-center">Actions</div>
                            </div>
                        </div>

                        {/* Table Body */}
                        <div className="bg-white">
                            {loading ? (
                                <div className="p-8 text-center text-slate-500">
                                    Loading business permits...
                                </div>
                            ) : businessPermits.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">
                                    No business permits found
                                </div>
                            ) : (
                                businessPermits.map((permit) => (
                                    <div key={permit.id} className="flex items-center gap-1 p-4 border-b border-slate-200 hover:bg-slate-50">
                                        <div className="w-8 flex items-center justify-center">
                                            <Checkbox
                                                checked={selectedItems.includes(permit.id)}
                                                onCheckedChange={(checked) => handleSelectItem(permit.id, checked as boolean)}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-sm text-slate-900">
                                            {permit.permit_number}
                                        </div>
                                        <div className="flex-2 min-w-0 text-sm text-slate-900">
                                            {permit.business.business_name}
                                        </div>
                                        <div className="flex-2 min-w-0 text-sm text-slate-900">
                                            {`${permit.business.business_owner.last_name}, ${permit.business.business_owner.first_name} ${permit.business.business_owner.middle_name || ''}`.trim()}
                                        </div>
                                        <div className="flex-1 min-w-0 text-sm text-slate-900">
                                            {permit.business.business_owner.mobile_number}
                                        </div>
                                        <div className="flex-2 min-w-0 text-sm text-slate-900">
                                            {permit.business.business_owner.email}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(permit.status)}`}>
                                                {permit.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0 text-sm text-slate-900">
                                            {permit.approved_at ? formatDate(permit.approved_at) : formatDate(permit.application_date)}
                                        </div>
                                        <div className="flex-1 min-w-0 text-sm text-slate-900">
                                            {permit.approved_by || '-'}
                                        </div>
                                        <div className="w-20 flex items-center justify-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => handleViewPermit(permit.id)}
                                                title="View Permit"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                        title="More Actions"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem
                                                        onClick={() => handleEditPermit(permit.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit Permit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handlePrintPermit(permit.id)}
                                                        className="cursor-pointer"
                                                    >
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        Print Permit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    {permit.status === 'pending' && (
                                                        <>
                                                            <DropdownMenuItem
                                                                onClick={() => handleApprovePermit(permit.id)}
                                                                className="cursor-pointer text-green-600 focus:text-green-600"
                                                            >
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Approve
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleRejectPermit(permit.id)}
                                                                className="cursor-pointer text-red-600 focus:text-red-600"
                                                            >
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Reject
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-slate-500">
                                Showing {((pagination.current_page - 1) * pagination.per_page) + 1} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} rows
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">10</span>
                                <span className="text-sm text-slate-500">rows per page</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.current_page === 1}
                                onClick={() => fetchBusinessPermits(pagination.current_page - 1, searchTerm)}
                            >
                                Previous
                            </Button>

                            {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                const page = i + 1;
                                return (
                                    <Button
                                        key={page}
                                        variant={page === pagination.current_page ? "default" : "outline"}
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                        onClick={() => fetchBusinessPermits(page, searchTerm)}
                                    >
                                        {page}
                                    </Button>
                                );
                            })}

                            {pagination.last_page > 5 && (
                                <>
                                    <span className="text-slate-500">...</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                        onClick={() => fetchBusinessPermits(pagination.last_page, searchTerm)}
                                    >
                                        {pagination.last_page}
                                    </Button>
                                </>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={pagination.current_page === pagination.last_page}
                                onClick={() => fetchBusinessPermits(pagination.current_page + 1, searchTerm)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                itemCount={selectedItems.length}
            />
        </div>
    );
}
