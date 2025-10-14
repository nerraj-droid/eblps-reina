"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import NextImage from "next/image";

// Municipality logo image
const imgReina = "/reina.png";

interface TaxOrderPaymentFormProps {
    onClose: () => void;
    onSubmit: (formData: any) => void;
}

export function TaxOrderPaymentForm({ onClose, onSubmit }: TaxOrderPaymentFormProps) {
    const [formData, setFormData] = useState({
        dateCreated: new Date().toLocaleDateString('en-US') + " " + new Date().toLocaleTimeString('en-US'),
        taxOrderPaymentFor: "NEW BUSINESS",
        grossSales: "0.00",
        mayorsPermitFee: "0.00",
        healthCertificate: "0.00",
        occupationalFee: "0.00",
        sanitaryPermit: "0.00",
        businessPlate: "0.00",
        zoningCertificate: "0.00",
        weightAndMeasures: "0.00",
        storageOfFlammableMaterials: "0.00",
        finesAndPenalties: "0.00",
        barangayBusinessClearanceFee: "0.00",
        totalAmount: "0.00",
        status: "COMPLETE",
        officialReceiptNo: "1234567890"
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    // Handle escape key to close modal and prevent body scroll
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                className="bg-white max-w-7xl w-full max-h-[95vh] shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto p-32 "
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="border-2 shadow-none rounded-none">
                    <CardContent className="p-0 relative">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        {/* Header with Logo */}
                        <div className="flex items-center justify-center pb-0 pt-8 px-0 relative w-full">
                            <div className="flex flex-col gap-[12px] items-center px-0 py-[15px] relative shrink-0 w-[698px]">
                                <div className="flex flex-col gap-[4px] items-center relative shrink-0 text-center text-neutral-950 text-nowrap whitespace-pre">
                                    <p className="font-medium leading-[1.5] relative shrink-0 text-[16px]">
                                        Republic of the Philippines
                                    </p>
                                    <p className="font-semibold leading-[1.2] relative shrink-0 text-[20px] tracking-[-0.4px]">
                                        PROVINCE OF ISABELA
                                    </p>
                                    <p className="font-medium leading-[1.5] relative shrink-0 text-[16px]">
                                        Reina Mercedes Isabela
                                    </p>
                                </div>
                            </div>
                            <div className="absolute left-[144.17px] size-[157px] top-[1.4px]">
                                <NextImage
                                    alt="Municipality Logo"
                                    width={130}
                                    height={130}
                                    className="absolute inset-0 max-w-none object-cover pointer-events-none"
                                    src={imgReina}
                                />
                            </div>
                        </div>

                        {/* Form Title */}
                        <div className="text-center mt-6 bg-[#3B82F6] h-16 flex items-center justify-center text-white">
                            <h1 className="text-lg font-bold">TAX ORDER PAYMENT FORM</h1>
                        </div>

                        {/* Form Content */}
                        <div className="p-8 space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Date Created */}
                                <div className="flex items-center">
                                    <div className="w-[423px]">
                                        <p className="text-sm font-bold text-neutral-950">Date Created:</p>
                                    </div>
                                    <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                        <p className="text-sm text-neutral-950 text-right">{formData.dateCreated}</p>
                                    </div>
                                </div>

                                {/* Tax Order Payment For */}
                                <div className="flex items-center">
                                    <div className="w-[423px]">
                                        <p className="text-sm font-bold text-neutral-950">Tax Order Payment for:</p>
                                    </div>
                                    <div className="flex-1">
                                        <Select
                                            value={formData.taxOrderPaymentFor}
                                            onValueChange={(value) => handleInputChange("taxOrderPaymentFor", value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="NEW BUSINESS">NEW BUSINESS</SelectItem>
                                                <SelectItem value="RENEWAL">RENEWAL</SelectItem>
                                                <SelectItem value="ADDITIONAL">ADDITIONAL</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Fee Fields */}
                                <div className="space-y-5">
                                    {/* Gross Sales */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Gross Sales:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.grossSales}
                                                onChange={(e) => handleInputChange("grossSales", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Mayor's Permit Fee */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Mayor's Permit Fee:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.mayorsPermitFee}
                                                onChange={(e) => handleInputChange("mayorsPermitFee", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Health Certificate */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Health Certificate:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.healthCertificate}
                                                onChange={(e) => handleInputChange("healthCertificate", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Occupational Fee */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Occupational Fee:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.occupationalFee}
                                                onChange={(e) => handleInputChange("occupationalFee", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Sanitary Permit */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Sanitary Permit:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.sanitaryPermit}
                                                onChange={(e) => handleInputChange("sanitaryPermit", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Business Plate */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Business Plate:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.businessPlate}
                                                onChange={(e) => handleInputChange("businessPlate", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Zoning Certificate */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Zoning Certificate:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.zoningCertificate}
                                                onChange={(e) => handleInputChange("zoningCertificate", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Weight and Measures */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Weight and Measures:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.weightAndMeasures}
                                                onChange={(e) => handleInputChange("weightAndMeasures", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Storage of Flammable Materials */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Storage of Flammable Materials:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.storageOfFlammableMaterials}
                                                onChange={(e) => handleInputChange("storageOfFlammableMaterials", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Fines and Penalties */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Fines and Penalties:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.finesAndPenalties}
                                                onChange={(e) => handleInputChange("finesAndPenalties", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    {/* Barangay Business Clearance Fee */}
                                    <div className="flex items-center">
                                        <div className="w-[423px]">
                                            <p className="text-sm font-bold text-neutral-950">Barangay Business Clearance Fee:</p>
                                        </div>
                                        <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                            <Input
                                                value={formData.barangayBusinessClearanceFee}
                                                onChange={(e) => handleInputChange("barangayBusinessClearanceFee", e.target.value)}
                                                className="border-0 text-right"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Total Amount */}
                                <div className="flex items-center">
                                    <div className="w-[423px]">
                                        <p className="text-sm font-bold text-neutral-950">Total Amount:</p>
                                    </div>
                                    <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                        <Input
                                            value={formData.totalAmount}
                                            onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                                            className="border-0 text-right font-semibold"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center">
                                    <div className="w-[423px]">
                                        <p className="text-sm font-bold text-neutral-950">Status:</p>
                                    </div>
                                    <div className="flex-1">
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => handleInputChange("status", value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="COMPLETE">COMPLETE</SelectItem>
                                                <SelectItem value="PENDING">PENDING</SelectItem>
                                                <SelectItem value="INCOMPLETE">INCOMPLETE</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Official Receipt No. */}
                                <div className="flex items-center">
                                    <div className="w-[423px]">
                                        <p className="text-sm font-bold text-neutral-950">Official Receipt No.:</p>
                                    </div>
                                    <div className="flex-1 border-b border-neutral-300 px-2 py-2">
                                        <Input
                                            value={formData.officialReceiptNo}
                                            onChange={(e) => handleInputChange("officialReceiptNo", e.target.value)}
                                            className="border-0 text-right"
                                            placeholder="1234567890"
                                        />
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end space-x-4 pt-8 pb-4">
                                    <Button type="button" variant="outline" onClick={onClose} className="bg-orange-500 hover:bg-orange-600 text-white border-orange-500">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
