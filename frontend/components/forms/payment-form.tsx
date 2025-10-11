"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Receipt, Download } from "lucide-react";

export function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    permitNumber: "",
    businessName: "",
    ownerName: "",
    paymentMethod: "",
    amount: 0,
    fees: [
      { description: "Business Permit Fee", amount: 500.00 },
      { description: "Mayor's Permit Fee", amount: 200.00 },
      { description: "Sanitary Permit Fee", amount: 150.00 },
      { description: "Fire Safety Inspection Fee", amount: 100.00 },
      { description: "Zoning Clearance Fee", amount: 75.00 }
    ],
    totalAmount: 1025.00,
    paymentReference: "",
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field: string, value: any) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment processed:", paymentData);
  };

  const totalAmount = paymentData.fees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Order Payment Form</h1>
          <p className="text-muted-foreground">
            Process payment for business permit applications
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header with Logo */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <h2 className="text-lg font-semibold">Republic of the Philippines</h2>
                <h3 className="text-lg font-semibold">PROVINCE OF ISABELA</h3>
                <h4 className="text-lg font-semibold">Reina Mercedes Isabela</h4>
              </div>
              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-sm text-gray-500">Municipality Logo</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-xl font-bold">TAX ORDER PAYMENT FORM</h1>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="permitNumber">Permit Number</Label>
                <Input 
                  id="permitNumber"
                  value={paymentData.permitNumber}
                  onChange={(e) => handleInputChange("permitNumber", e.target.value)}
                  placeholder="Enter permit number"
                />
              </div>
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input 
                  id="businessName"
                  value={paymentData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Enter business name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input 
                id="ownerName"
                value={paymentData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                placeholder="Enter owner name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fee Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentData.fees.map((fee, index) => (
                    <TableRow key={index}>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell className="text-right">₱{fee.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold border-t">
                    <TableCell>Total Amount</TableCell>
                    <TableCell className="text-right">₱{totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="gcash">GCash</SelectItem>
                    <SelectItem value="paymaya">PayMaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="paymentDate">Payment Date</Label>
                <Input 
                  id="paymentDate"
                  type="date"
                  value={paymentData.paymentDate}
                  onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="paymentReference">Payment Reference/Transaction ID</Label>
              <Input 
                id="paymentReference"
                value={paymentData.paymentReference}
                onChange={(e) => handleInputChange("paymentReference", e.target.value)}
                placeholder="Enter payment reference or transaction ID"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount Due:</span>
                <span className="text-2xl font-bold text-primary">₱{totalAmount.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{paymentData.paymentMethod || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Date:</span>
                  <span className="font-medium">{paymentData.paymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference Number:</span>
                  <span className="font-medium">{paymentData.paymentReference || "Not provided"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Actions */}
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Button type="button" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
            <Button type="button" variant="outline">
              <Receipt className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
          </div>
          
          <div className="flex space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              <CreditCard className="mr-2 h-4 w-4" />
              Process Payment
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
