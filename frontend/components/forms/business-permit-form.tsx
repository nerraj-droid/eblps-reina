"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { businessPermitsApi } from "@/lib/api";
import { transformFrontendToBackend, validateFrontendData } from "@/lib/data-transformer";
import { ArrowLeft, Save, Send } from "lucide-react";

export function BusinessPermitForm() {
  const [formData, setFormData] = useState({
    // Application Type
    type: "",
    payment: "",
    
    // Business Information
    businessType: "",
    businessName: "",
    dtiNumber: "",
    sssNumber: "",
    tinNumber: "",
    businessAddress: {
      houseNumber: "",
      buildingName: "",
      lotNumber: "",
      blockNumber: "",
      street: "",
      barangay: "",
      subdivision: "",
      city: "",
      province: "",
      zipCode: ""
    },
    contactInfo: {
      telephone: "",
      mobile: "",
      email: "",
      website: ""
    },
    
    // Owner Information
    ownerName: {
      surname: "",
      givenName: "",
      middleName: "",
      suffix: ""
    },
    ownerDetails: {
      birthDate: "",
      gender: "",
      nationality: "",
      civilStatus: "",
      philhealthNumber: "",
      pagibigNumber: ""
    },
    
    // Business Operation
    businessActivity: "",
    businessDescription: "",
    capitalInvestment: "",
    numberOfEmployees: "",
    businessHours: "",
    businessDays: "",
    
    // Additional Information
    owned: false,
    lessorName: {
      surname: "",
      givenName: "",
      middleName: "",
      suffix: ""
    },
    taxIncentives: false,
    businessActivityType: "",
    otherActivity: ""
  });

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate frontend data
    const validation = validateFrontendData(formData);
    if (!validation.isValid) {
      alert("Please fill in all required fields:\n" + validation.errors.join('\n'));
      return;
    }

    try {
      // Transform frontend data to backend format
      const backendData = transformFrontendToBackend(formData);
      console.log("Transformed data:", backendData);
      
      const response = await businessPermitsApi.create(backendData);
      console.log("Business Permit Form submitted successfully:", response.data);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Permit Application</h1>
          <p className="text-muted-foreground">
            Unified Application Form for Business Permit
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
              <h1 className="text-xl font-bold">UNIFIED APPLICATION FORM FOR BUSINESS PERMIT</h1>
            </div>
          </CardContent>
        </Card>

        {/* Application Type */}
        <Card>
          <CardHeader>
            <CardTitle>Application Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">TYPE:</Label>
                  <div className="flex space-x-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="new"
                        checked={formData.type === "new"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("type", "new")
                        }
                      />
                      <Label htmlFor="new">NEW</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="renewal"
                        checked={formData.type === "renewal"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("type", "renewal")
                        }
                      />
                      <Label htmlFor="renewal">RENEWAL</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="additional"
                        checked={formData.type === "additional"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("type", "additional")
                        }
                      />
                      <Label htmlFor="additional">ADDITIONAL</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base font-medium">PAYMENT:</Label>
                  <div className="flex space-x-6 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="annually"
                        checked={formData.payment === "annually"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("payment", "annually")
                        }
                      />
                      <Label htmlFor="annually">ANNUALLY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="bi-annually"
                        checked={formData.payment === "bi-annually"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("payment", "bi-annually")
                        }
                      />
                      <Label htmlFor="bi-annually">BI-ANNUALLY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="quarterly"
                        checked={formData.payment === "quarterly"}
                        onCheckedChange={(checked) => 
                          checked && handleInputChange("payment", "quarterly")
                        }
                      />
                      <Label htmlFor="quarterly">QUARTERLY</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="applicationDate">Application Date</Label>
                    <Input 
                      id="applicationDate"
                      type="date"
                      value={new Date().toISOString().split('T')[0]}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label htmlFor="permitNumber">Permit Number</Label>
                    <Input 
                      id="permitNumber"
                      placeholder="Auto-generated"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="referenceNumber">Reference Number</Label>
                  <Input 
                    id="referenceNumber"
                    placeholder="Enter reference number"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>A. BUSINESS INFORMATION AND REGISTRATION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Business Type */}
            <div>
              <Label className="text-base font-medium">Business Type:</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sole-proprietorship"
                    checked={formData.businessType === "sole-proprietorship"}
                    onCheckedChange={(checked) => 
                      checked && handleInputChange("businessType", "sole-proprietorship")
                    }
                  />
                  <Label htmlFor="sole-proprietorship">Sole Proprietorship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="one-person-corp"
                    checked={formData.businessType === "one-person-corp"}
                    onCheckedChange={(checked) => 
                      checked && handleInputChange("businessType", "one-person-corp")
                    }
                  />
                  <Label htmlFor="one-person-corp">One Person Corporation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="partnership"
                    checked={formData.businessType === "partnership"}
                    onCheckedChange={(checked) => 
                      checked && handleInputChange("businessType", "partnership")
                    }
                  />
                  <Label htmlFor="partnership">Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="corporation"
                    checked={formData.businessType === "corporation"}
                    onCheckedChange={(checked) => 
                      checked && handleInputChange("businessType", "corporation")
                    }
                  />
                  <Label htmlFor="corporation">Corporation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cooperative"
                    checked={formData.businessType === "cooperative"}
                    onCheckedChange={(checked) => 
                      checked && handleInputChange("businessType", "cooperative")
                    }
                  />
                  <Label htmlFor="cooperative">Cooperative</Label>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input 
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <Label htmlFor="dtiNumber">DTI Number</Label>
                <Input 
                  id="dtiNumber"
                  value={formData.dtiNumber}
                  onChange={(e) => handleInputChange("dtiNumber", e.target.value)}
                  placeholder="Enter DTI number"
                />
              </div>
              <div>
                <Label htmlFor="sssNumber">SSS Number</Label>
                <Input 
                  id="sssNumber"
                  value={formData.sssNumber}
                  onChange={(e) => handleInputChange("sssNumber", e.target.value)}
                  placeholder="Enter SSS number"
                />
              </div>
              <div>
                <Label htmlFor="tinNumber">TIN Number</Label>
                <Input 
                  id="tinNumber"
                  value={formData.tinNumber}
                  onChange={(e) => handleInputChange("tinNumber", e.target.value)}
                  placeholder="Enter TIN number"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <Label className="text-base font-medium">Business Address</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
                <div>
                  <Label htmlFor="houseNumber">House / Building No.</Label>
                  <Input 
                    id="houseNumber"
                    value={formData.businessAddress.houseNumber}
                    onChange={(e) => handleInputChange("businessAddress.houseNumber", e.target.value)}
                    placeholder="House/Building No."
                  />
                </div>
                <div>
                  <Label htmlFor="buildingName">Name of Building</Label>
                  <Input 
                    id="buildingName"
                    value={formData.businessAddress.buildingName}
                    onChange={(e) => handleInputChange("businessAddress.buildingName", e.target.value)}
                    placeholder="Building name"
                  />
                </div>
                <div>
                  <Label htmlFor="lotNumber">Lot No.</Label>
                  <Input 
                    id="lotNumber"
                    value={formData.businessAddress.lotNumber}
                    onChange={(e) => handleInputChange("businessAddress.lotNumber", e.target.value)}
                    placeholder="Lot No."
                  />
                </div>
                <div>
                  <Label htmlFor="blockNumber">Block No.</Label>
                  <Input 
                    id="blockNumber"
                    value={formData.businessAddress.blockNumber}
                    onChange={(e) => handleInputChange("businessAddress.blockNumber", e.target.value)}
                    placeholder="Block No."
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street</Label>
                  <Input 
                    id="street"
                    value={formData.businessAddress.street}
                    onChange={(e) => handleInputChange("businessAddress.street", e.target.value)}
                    placeholder="Street"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                <div>
                  <Label htmlFor="barangay">Barangay *</Label>
                  <Input 
                    id="barangay"
                    value={formData.businessAddress.barangay}
                    onChange={(e) => handleInputChange("businessAddress.barangay", e.target.value)}
                    placeholder="Barangay"
                  />
                </div>
                <div>
                  <Label htmlFor="subdivision">Subdivision</Label>
                  <Input 
                    id="subdivision"
                    value={formData.businessAddress.subdivision}
                    onChange={(e) => handleInputChange("businessAddress.subdivision", e.target.value)}
                    placeholder="Subdivision"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City / Municipality *</Label>
                  <Input 
                    id="city"
                    value={formData.businessAddress.city}
                    onChange={(e) => handleInputChange("businessAddress.city", e.target.value)}
                    placeholder="City/Municipality"
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province *</Label>
                  <Input 
                    id="province"
                    value={formData.businessAddress.province}
                    onChange={(e) => handleInputChange("businessAddress.province", e.target.value)}
                    placeholder="Province"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode"
                    value={formData.businessAddress.zipCode}
                    onChange={(e) => handleInputChange("businessAddress.zipCode", e.target.value)}
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <Label className="text-base font-medium">Contact Information</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div>
                  <Label htmlFor="telephone">Telephone</Label>
                  <Input 
                    id="telephone"
                    value={formData.contactInfo.telephone}
                    onChange={(e) => handleInputChange("contactInfo.telephone", e.target.value)}
                    placeholder="Telephone number"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input 
                    id="mobile"
                    value={formData.contactInfo.mobile}
                    onChange={(e) => handleInputChange("contactInfo.mobile", e.target.value)}
                    placeholder="Mobile number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleInputChange("contactInfo.email", e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website"
                    value={formData.contactInfo.website}
                    onChange={(e) => handleInputChange("contactInfo.website", e.target.value)}
                    placeholder="Website URL"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card>
          <CardHeader>
            <CardTitle>Owner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Name of Owner</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                <div>
                  <Label htmlFor="surname">Surname</Label>
                  <Input 
                    id="surname"
                    value={formData.ownerName.surname}
                    onChange={(e) => handleInputChange("ownerName.surname", e.target.value)}
                    placeholder="Surname"
                  />
                </div>
                <div>
                  <Label htmlFor="givenName">Given Name</Label>
                  <Input 
                    id="givenName"
                    value={formData.ownerName.givenName}
                    onChange={(e) => handleInputChange("ownerName.givenName", e.target.value)}
                    placeholder="Given Name"
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input 
                    id="middleName"
                    value={formData.ownerName.middleName}
                    onChange={(e) => handleInputChange("ownerName.middleName", e.target.value)}
                    placeholder="Middle Name"
                  />
                </div>
                <div>
                  <Label htmlFor="suffix">Suffix</Label>
                  <Input 
                    id="suffix"
                    value={formData.ownerName.suffix}
                    onChange={(e) => handleInputChange("ownerName.suffix", e.target.value)}
                    placeholder="Suffix"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Operation */}
        <Card>
          <CardHeader>
            <CardTitle>B. BUSINESS OPERATION</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessActivity">Business Activity</Label>
                <Input 
                  id="businessActivity"
                  value={formData.businessActivity}
                  onChange={(e) => handleInputChange("businessActivity", e.target.value)}
                  placeholder="Describe business activity"
                />
              </div>
              <div>
                <Label htmlFor="capitalInvestment">Capital Investment</Label>
                <Input 
                  id="capitalInvestment"
                  value={formData.capitalInvestment}
                  onChange={(e) => handleInputChange("capitalInvestment", e.target.value)}
                  placeholder="Enter capital investment"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea 
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                placeholder="Describe your business in detail"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                <Input 
                  id="numberOfEmployees"
                  type="number"
                  value={formData.numberOfEmployees}
                  onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
                  placeholder="Number of employees"
                />
              </div>
              <div>
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input 
                  id="businessHours"
                  value={formData.businessHours}
                  onChange={(e) => handleInputChange("businessHours", e.target.value)}
                  placeholder="e.g., 8:00 AM - 5:00 PM"
                />
              </div>
              <div>
                <Label htmlFor="businessDays">Business Days</Label>
                <Input 
                  id="businessDays"
                  value={formData.businessDays}
                  onChange={(e) => handleInputChange("businessDays", e.target.value)}
                  placeholder="e.g., Monday - Friday"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Submit Application
          </Button>
        </div>
      </form>
    </div>
  );
}
