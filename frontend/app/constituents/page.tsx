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
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";

// Mock data for constituents
const mockConstituents = [
  {
    id: "C-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+63 912 345 6789",
    businessCount: 2,
    status: "Active",
    registrationDate: "2024-01-15"
  },
  {
    id: "C-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+63 912 345 6790",
    businessCount: 1,
    status: "Active",
    registrationDate: "2024-01-20"
  },
  {
    id: "C-003",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+63 912 345 6791",
    businessCount: 3,
    status: "Inactive",
    registrationDate: "2023-12-10"
  }
];

export default function ConstituentsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Constituents</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Constituent
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Constituent List</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search constituents..."
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
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Business Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registration Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConstituents.map((constituent) => (
                    <TableRow key={constituent.id}>
                      <TableCell className="font-medium">{constituent.id}</TableCell>
                      <TableCell>{constituent.name}</TableCell>
                      <TableCell>{constituent.email}</TableCell>
                      <TableCell>{constituent.phone}</TableCell>
                      <TableCell>{constituent.businessCount}</TableCell>
                      <TableCell>
                        <Badge variant={constituent.status === "Active" ? "default" : "secondary"}>
                          {constituent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{constituent.registrationDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
