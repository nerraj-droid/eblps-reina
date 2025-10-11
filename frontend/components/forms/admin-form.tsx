"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Save, Send, Plus, Trash2 } from "lucide-react";
import { SimpleLeafletMap } from "@/components/ui/simple-leaflet-map";

// Municipality logo image
const imgReina = "/reina.png";

// Countries data - more efficient than hardcoding in JSX
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
  "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Kenya", "Kiribati", "Kosovo", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
  "Papua New Guinea", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
  "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania", "Thailand", "Timor-Leste",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export function AdminForm() {
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);
  
  const [formData, setFormData] = useState({
    // Application Type
    dateOfReceipt: "09/27/2025",
    trackingNumber: "1234567890",
    businessIdNumber: "0203125-2025-0000669",
    
    // Business Information
    businessType: "corporation", 
    dtiSecCdaRegNo: "2025040199417-12",
    tin: "123-456-789-000",
    businessName: "AXOLUTE TECHNOLOGY OPC",
    tradeName: "AXOLUTE TECHNOLOGY",
    
    // Business Address
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
    
    // Contact Information
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
    
    // President/Officer Information
    presidentName: {
      surname: "",
      givenName: "",
      middleName: "",
      suffix: ""
    },
    
    // Business Operation
    businessArea: "",
    maleEmployees: "",
    femaleEmployees: "",
    residingEmployees: "",
    vanCount: "",
    truckCount: "",
    motorcycleCount: "",
    businessActivity: "",
    businessDescription: "",
    capitalInvestment: "",
    numberOfEmployees: "",
    businessHours: "",
    businessDays: "",
    
    // Taxpayer Address
    taxpayerAddress: {
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
    
    // Ownership Details
    owned: false,
    propertyDescription: "",
    propertyValue: "",
    taxDeclarationNo: "",
    monthlyRental: "",
    lessorName: {
      surname: "",
      givenName: "",
      middleName: "",
      suffix: ""
    },
    
    // Tax Incentives
    taxIncentives: false,
    
    // Business Activity Type
    businessActivityType: "",
    otherActivity: "",
    mainOffice: false,
    branchOffice: false,
    adminOfficeOnly: false,
    warehouse: false,
    othersActivity: false,
    
    // Line of Business
    lineOfBusiness: [
      {
        lineOfBusiness: "Other information technology and computer service activities",
        psicCode: "61902",
        productsServices: "IT SERVICE",
        numberOfUnits: 0,
        totalCapitalization: 100000.00
      }
    ],
    
    // Business Fees
    fees: [
      { description: "Business Permit Fee", amount: 0, quantity: 1, total: 0 },
      { description: "Mayor's Permit Fee", amount: 0, quantity: 1, total: 0 },
      { description: "Sanitary Permit Fee", amount: 0, quantity: 1, total: 0 },
      { description: "Fire Safety Inspection Fee", amount: 0, quantity: 1, total: 0 },
      { description: "Zoning Clearance Fee", amount: 0, quantity: 1, total: 0 }
    ],
    
    // Location Search
    locationSearch: "",
    mapCenter: [17.0583, 121.6019] as [number, number],
    mapZoom: 14,
    isSearchingLocation: false,
    locationSuggestions: [] as Array<{display_name: string, lat: string, lon: string}>,
    showSuggestions: false
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

  const handleCountrySearch = (searchTerm: string) => {
    setCountrySearch(searchTerm);
    const filtered = countries.filter(country => 
      country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  // Predefined Philippine locations
  const predefinedLocations = [
    { display_name: "Isabela, Philippines", lat: "17.0000", lon: "121.5000" },
    { display_name: "Reina Mercedes, Isabela, Philippines", lat: "17.0583", lon: "121.6019" },
    { display_name: "Ilagan, Isabela, Philippines", lat: "17.1485", lon: "121.8892" },
    { display_name: "Santiago, Isabela, Philippines", lat: "16.6881", lon: "121.5487" },
    { display_name: "Cauayan, Isabela, Philippines", lat: "16.9333", lon: "121.7667" },
    { display_name: "Napaccu Grande, Reina Mercedes, Isabela, Philippines", lat: "17.0550", lon: "121.6050" },
    { display_name: "Maharlika Highway, Reina Mercedes, Isabela, Philippines", lat: "17.0520", lon: "121.6080" },
    { display_name: "St. Anthony of Padua Parish Church, Reina Mercedes, Isabela, Philippines", lat: "17.0600", lon: "121.5950" },
    { display_name: "Reina Mercedes Municipal Hall, Isabela, Philippines", lat: "17.0583", lon: "121.6019" },
    { display_name: "Echague, Isabela, Philippines", lat: "16.7050", lon: "121.6800" },
    { display_name: "Alicia, Isabela, Philippines", lat: "16.7833", lon: "121.7000" },
    { display_name: "Roxas, Isabela, Philippines", lat: "17.1167", lon: "121.6167" },
    { display_name: "Tuguegarao, Cagayan, Philippines", lat: "17.6131", lon: "121.7269" },
    { display_name: "Cagayan Valley, Philippines", lat: "17.5000", lon: "121.5000" },
    { display_name: "Nueva Vizcaya, Philippines", lat: "16.5000", lon: "121.1667" },
    { display_name: "Quirino, Philippines", lat: "16.2500", lon: "121.5000" },
    { display_name: "Batanes, Philippines", lat: "20.4500", lon: "121.9667" }
  ];

  // Search for suggestions using predefined locations only
  const searchLocationSuggestions = (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setFormData(prev => ({
        ...prev,
        locationSuggestions: [],
        showSuggestions: false
      }));
      return;
    }

    // Filter predefined locations
    const filteredPredefined = predefinedLocations.filter(location =>
      location.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Show filtered results
    setFormData(prev => ({
      ...prev,
      locationSuggestions: filteredPredefined.slice(0, 5),
      showSuggestions: filteredPredefined.length > 0
    }));
  };

  const handleLocationSearch = (selectedLocation?: {lat: string, lon: string, display_name: string}) => {
    const searchTerm = formData.locationSearch.trim();
    
    if (!searchTerm && !selectedLocation) return;

    // Set loading state
    setFormData(prev => ({
      ...prev,
      isSearchingLocation: true,
      showSuggestions: false
    }));

    let result;
    
    if (selectedLocation) {
      // Use the selected location directly
      result = selectedLocation;
    } else {
      // Find matching predefined location
      const matchingLocation = predefinedLocations.find(location =>
        location.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingLocation) {
        result = matchingLocation;
      } else {
        // Default to Reina Mercedes if no match found
        result = predefinedLocations[1]; // Reina Mercedes, Isabela, Philippines
      }
    }
    
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    
    // Update map center and zoom
    setFormData(prev => ({
      ...prev,
      mapCenter: [lat, lon],
      mapZoom: 16,
      isSearchingLocation: false,
      locationSearch: result.display_name
    }));
  };

  // Debounced effect for location suggestions
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.locationSearch) {
        searchLocationSuggestions(formData.locationSearch);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [formData.locationSearch]);

  // Utility function to safely get form values
  const getFormValue = (value: any): string => {
    return value || "";
  };

  const handleFeeChange = (index: number, field: string, value: any) => {
    const newFees = [...formData.fees];
    newFees[index] = { ...newFees[index], [field]: value };
    
    if (field === 'amount' || field === 'quantity') {
      newFees[index].total = newFees[index].amount * newFees[index].quantity;
    }
    
    setFormData(prev => ({
      ...prev,
      fees: newFees
    }));
  };

  const addFee = () => {
    setFormData(prev => ({
      ...prev,
      fees: [...prev.fees, { description: "", amount: 0, quantity: 1, total: 0 }]
    }));
  };

  const removeFee = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fees: prev.fees.filter((_, i) => i !== index)
    }));
  };

  const handleLineOfBusinessChange = (index: number, field: string, value: any) => {
    const newLineOfBusiness = [...formData.lineOfBusiness];
    newLineOfBusiness[index] = { ...newLineOfBusiness[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      lineOfBusiness: newLineOfBusiness
    }));
  };

  const addLineOfBusiness = () => {
    setFormData(prev => ({
      ...prev,
      lineOfBusiness: [...prev.lineOfBusiness, { 
        lineOfBusiness: "", 
        psicCode: "", 
        productsServices: "", 
        numberOfUnits: 0, 
        totalCapitalization: 0 
      }]
    }));
  };

  const removeLineOfBusiness = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineOfBusiness: prev.lineOfBusiness.filter((_, i) => i !== index)
    }));
  };

  const totalFees = formData.fees.reduce((sum, fee) => sum + fee.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin form submitted:", formData);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin - Business Permit Application</h1>
          <p className="text-muted-foreground">
            Administrative review and processing form
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Single Card containing all sections */}
        <Card>
          <CardContent className="pt-2 space-y-4">
            {/* Header with Logo  */}
            <div className="flex items-center justify-between space-x-8">
            <div className="w-40 h-40 rounded flex items-center justify-center">
                <img 
                  src={imgReina} 
                  alt="Municipality Logo" 
                  className="w-full h-full object-cover rounded ml-60"
                />
              </div>
              {/* center this div */}
              <div className="text-center">
                <h2 className="text-md font-medium">Republic of the Philippines</h2>
                <h3 className="text-xl font-semibold tracking-tight">PROVINCE OF ISABELA</h3>
                <h4 className="text-md font-medium">Reina Mercedes Isabela</h4>
              </div>
              <div></div>

            </div>
            <div className="text-center mt-4 bg-[#3B82F6] h-16 flex items-center justify-center text-white">
              <h1 className="text-lg font-bold">UNIFIED APPLICATION FORM FOR BUSINESS PERMIT</h1>
            </div>

            {/* Application Type  */}
            <div className="flex justify-end">
              <div className="w-[619.5px]">
                <div className="grid grid-cols-2 gap-0 border border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Date of Receipt:</p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium text-neutral-950 text-right">{formData.dateOfReceipt}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0 border-l border-r border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Tracking Number:</p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium text-neutral-950 text-right">{formData.trackingNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0 border-l border-r border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Business ID Number:</p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium text-neutral-950 text-right">{formData.businessIdNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Business Information  */}
            <div>
              <h3 className="text-center text-lg font-semibold mb-2">A. BUSINESS INFORMATION AND REGISTRATION</h3>
              {/* Business Type Checkboxes */}
              <div className="pl-5 mb-4">
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sole-proprietorship"
                      checked={formData.businessType === "sole-proprietorship"}
                      onCheckedChange={(checked) => 
                        checked && handleInputChange("businessType", "sole-proprietorship")
                      }
                    />
                    <Label htmlFor="sole-proprietorship" className="text-sm font-medium">Sole Proprietorship</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="one-person-corp"
                      checked={formData.businessType === "one-person-corp"}
                      onCheckedChange={(checked) => 
                        checked && handleInputChange("businessType", "one-person-corp")
                      }
                    />
                    <Label htmlFor="one-person-corp" className="text-sm font-medium">One Person Corporation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="partnership"
                      checked={formData.businessType === "partnership"}
                      onCheckedChange={(checked) => 
                        checked && handleInputChange("businessType", "partnership")
                      }
                    />
                    <Label htmlFor="partnership" className="text-sm font-medium">Partnership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cooperative"
                      checked={formData.businessType === "cooperative"}
                      onCheckedChange={(checked) => 
                        checked && handleInputChange("businessType", "cooperative")
                      }
                    />
                    <Label htmlFor="cooperative" className="text-sm font-medium">Cooperative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="corporation"
                      checked={formData.businessType === "corporation"}
                      onCheckedChange={(checked) => 
                        checked && handleInputChange("businessType", "corporation")
                      }
                    />
                    <Label htmlFor="corporation" className="text-sm font-medium">Corporation</Label>
                  </div>
                  <div></div>
                </div>
              </div>

              {/* Business Details Table */}
              <div className="border border-neutral-300">
                <div className="grid grid-cols-4 border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">DTI / SEC / CDA Reg. No.:</p>
                  </div>
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-medium text-neutral-950 text-left">{formData.dtiSecCdaRegNo}</p>
                  </div>
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Tax Identification No. (TIN):</p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium text-neutral-950 text-left">{formData.tin}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">
                      Business Name: <span className="text-red-500">*</span>
                    </p>
                  </div>
                  <div className="col-span-3 p-2">
                    <p className="text-sm font-medium text-neutral-950 text-left">{formData.businessName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-4">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Trade Name / Franchise:</p>
                  </div>
                  <div className="col-span-3 p-2">
                    <p className="text-sm font-medium text-neutral-950 text-left">{formData.tradeName}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Business Address Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Business Address</h3>
              <div className="grid grid-cols-5">
                <div>
                  <Input 
                    id="houseNumber"
                    value={getFormValue(formData.businessAddress.houseNumber)}
                    onChange={(e) => handleInputChange("businessAddress.houseNumber", e.target.value)}
                    placeholder="123"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="houseNumber" className="text-xs text-gray-500">(House / Building No.)</Label>
                </div>
                <div>
                  <Input 
                    id="buildingName"
                    value={getFormValue(formData.businessAddress.buildingName)}
                    onChange={(e) => handleInputChange("businessAddress.buildingName", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="buildingName" className="text-xs text-gray-500">(Name of Building)</Label>
                </div>
                <div>
                  <Input 
                    id="lotNumber"
                    value={formData.businessAddress.lotNumber}
                    onChange={(e) => handleInputChange("businessAddress.lotNumber", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="lotNumber" className="text-xs text-gray-500">(Lot No.)</Label>
                </div>
                <div>
                  <Input 
                    id="blockNumber"
                    value={formData.businessAddress.blockNumber}
                    onChange={(e) => handleInputChange("businessAddress.blockNumber", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="blockNumber" className="text-xs text-gray-500">(Block No.)</Label>
                </div>
                <div>
                  <Input 
                    id="street"
                    value={formData.businessAddress.street}
                    onChange={(e) => handleInputChange("businessAddress.street", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="street" className="text-xs text-gray-500">(Street)</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-5 mt-2">
                <div>
                  <Input 
                    id="barangay"
                    value={formData.businessAddress.barangay}
                    onChange={(e) => handleInputChange("businessAddress.barangay", e.target.value)}
                    placeholder="NAPACCU GRANDE"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="barangay" className="text-xs text-gray-500">(Barangay)*</Label>
                </div>
                <div>
                  <Input 
                    id="subdivision"
                    value={formData.businessAddress.subdivision}
                    onChange={(e) => handleInputChange("businessAddress.subdivision", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="subdivision" className="text-xs text-gray-500">(Subdivision)</Label>
                </div>
                <div>
                  <Input 
                    id="city"
                    value={formData.businessAddress.city}
                    onChange={(e) => handleInputChange("businessAddress.city", e.target.value)}
                    placeholder="REINA MERCEDES"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="city" className="text-xs text-gray-500">(City / Municipality)*</Label>
                </div>
                <div>
                  <Input 
                    id="province"
                    value={formData.businessAddress.province}
                    onChange={(e) => handleInputChange("businessAddress.province", e.target.value)}
                    placeholder="ISABELA"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="province" className="text-xs text-gray-500">(Province)*</Label>
                </div>
                <div>
                  <Input 
                    id="zipCode"
                    value={formData.businessAddress.zipCode}
                    onChange={(e) => handleInputChange("businessAddress.zipCode", e.target.value)}
                    placeholder="1234"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="zipCode" className="text-xs text-gray-500">(Zip Code)</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="border">
                <div className="grid grid-cols-4 border-b">
                    <p className="text-sm font-bold text-neutral-950 ml-2">Telephone Number:</p>
                    <Input 
                      id="telephone"
                      value={getFormValue(formData.contactInfo.telephone)}
                      onChange={(e) => handleInputChange("contactInfo.telephone", e.target.value)}
                      placeholder="#000-000-0000"
                      className="rounded-none"
                    />
                    <p className="text-sm font-bold text-neutral-950 ml-2">Mobile Number:</p>
                    <Input 
                      id="mobile"
                      value={getFormValue(formData.contactInfo.mobile)}
                      onChange={(e) => handleInputChange("contactInfo.mobile", e.target.value)}
                      placeholder="+639123456789"
                      className="rounded-none"
                    />
                </div>
                <div className="grid grid-cols-4">
                    <p className="text-sm font-bold text-neutral-950 ml-2">Email Address:</p>
                    <Input 
                      id="email"
                      value={getFormValue(formData.contactInfo.email)}
                      onChange={(e) => handleInputChange("contactInfo.email", e.target.value)}
                      placeholder="info@axolutetech.com"
                      className="rounded-none"
                    />
                </div>
              </div>
            </div>

            <Separator />

            {/* Owner Information - Sole Proprietorship */}
            <div>
              <h3 className="text-lg font-semibold mb-2">FOR SOLE PROPRIETORSHIP</h3>
              <div>
                <Label className="text-base font-medium">Name of Owner</Label>
                <div className="grid grid-cols-4 mt-2">
                  <div>
                    <Input 
                      id="ownerSurname"
                      value={formData.ownerName.surname}
                      onChange={(e) => handleInputChange("ownerName.surname", e.target.value)}
                      placeholder="DELA CRUZ"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="ownerSurname" className="text-xs text-gray-500">(Surname)</Label>
                  </div>
                  <div>
                    <Input 
                      id="ownerGivenName"
                      value={formData.ownerName.givenName}
                      onChange={(e) => handleInputChange("ownerName.givenName", e.target.value)}
                      placeholder="JUAN"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="ownerGivenName" className="text-xs text-gray-500">(Given Name)</Label>
                  </div>
                  <div>
                    <Input 
                      id="ownerMiddleName"
                      value={formData.ownerName.middleName}
                      onChange={(e) => handleInputChange("ownerName.middleName", e.target.value)}
                      placeholder="SANTOS"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="ownerMiddleName" className="text-xs text-gray-500">(Middle Name)</Label>
                  </div>
                  <div>
                    <Input 
                      id="ownerSuffix"
                      value={formData.ownerName.suffix}
                      onChange={(e) => handleInputChange("ownerName.suffix", e.target.value)}
                      placeholder="JR"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="ownerSuffix" className="text-xs text-gray-500">(SUFFIX)</Label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Owner Information - Corporations */}
            <div>
              <h3 className="text-lg font-semibold mb-2">FOR CORPORATIONS / COOPERATIVES / PARTNERSHIPS</h3>
              <div>
                <Label className="text-base font-medium">Name of President / Officer in Charge:</Label>
                <div className="grid grid-cols-4 mt-2">
                  <div>
                    <Input 
                      id="presidentSurname"
                      value={formData.presidentName.surname}
                      onChange={(e) => handleInputChange("presidentName.surname", e.target.value)}
                      placeholder="SANTOS"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="presidentSurname" className="text-xs text-gray-500">(Surname)</Label>
                  </div>
                  <div>
                    <Input 
                      id="presidentGivenName"
                      value={formData.presidentName.givenName}
                      onChange={(e) => handleInputChange("presidentName.givenName", e.target.value)}
                      placeholder="MARIA"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="presidentGivenName" className="text-xs text-gray-500">(Given Name)</Label>
                  </div>
                  <div>
                    <Input 
                      id="presidentMiddleName"
                      value={formData.presidentName.middleName}
                      onChange={(e) => handleInputChange("presidentName.middleName", e.target.value)}
                      placeholder="CRUZ"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="presidentMiddleName" className="text-xs text-gray-500">(Middle Name)</Label>
                  </div>
                  <div>
                    <Input 
                      id="presidentSuffix"
                      value={formData.presidentName.suffix}
                      onChange={(e) => handleInputChange("presidentName.suffix", e.target.value)}
                      placeholder="III"
                      className="mb-1 rounded-none"
                    />
                    <Label htmlFor="presidentSuffix" className="text-xs text-gray-500">(SUFFIX)</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4">
                <Label className="text-base font-medium">For Corporation:</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="filipino" />
                  <Label htmlFor="filipino">Filipino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="foreign" />
                  <Label htmlFor="foreign">Foreign</Label>
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <div className="p-2">
                      <Input 
                        placeholder="Search countries..." 
                        className="h-8"
                        value={countrySearch || ""}
                        onChange={(e) => handleCountrySearch(e.target.value)}
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredCountries.map((country) => (
                        <SelectItem key={country} value={country.toLowerCase().replace(/\s+/g, '-')}>
                          {country}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Business Operation Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">B. BUSINESS OPERATION</h3>
              <div className="border border-neutral-300">
                <div className="grid grid-cols-2 border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Business Area / Total Floor Area (sq. m.):</p>
                  </div>
                    <Input 
                      id="businessArea"
                      value={getFormValue(formData.businessArea)}
                      onChange={(e) => handleInputChange("businessArea", e.target.value)}
                      placeholder="80"
                      className="rounded-none"
                    />
                </div>
                
                <div className="grid grid-cols-2 border-b border-neutral-300">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">Total No. of Employees in Establishment:</p>
                  </div>
                    <div className="grid grid-cols-5">
                      <div className="flex flex-row items-center gap-1 border-r border-neutral-300">
                        <Input 
                          id="maleEmployees"
                          value={getFormValue(formData.maleEmployees)}
                          onChange={(e) => handleInputChange("maleEmployees", e.target.value)}
                          placeholder="1"
                          className="rounded-none border-l border-r text-center flex-1"
                        />
                        <p className="text-sm text-bold flex-1">Male</p>
                      </div>
                      <div className="flex flex-row items-center gap-1 border-r border-neutral-300">
                        <Input 
                          id="femaleEmployees"
                          value={getFormValue(formData.femaleEmployees)}
                          onChange={(e) => handleInputChange("femaleEmployees", e.target.value)}
                          placeholder="0"
                          className="rounded-none border-l border-r text-center flex-1"
                        />
                        <p className="text-sm text-bold flex-1">Female</p>
                      </div>
                      <div className="col-span-3 flex flex-row items-center gap-2 border-r border-neutral-300">
                        <span className="text-sm text-bold flex-1">No. of Employees Residing w/in the Area:</span>
                        <Input 
                          id="residingEmployees"
                          value={getFormValue(formData.residingEmployees)}
                          onChange={(e) => handleInputChange("residingEmployees", e.target.value)}
                          placeholder="0"
                          className="rounded-none border-1 text-center w-48"
                        />
                      </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2">
                  <div className="border-r border-neutral-300 p-2">
                    <p className="text-sm font-bold text-neutral-950">No. of Delivery Vehicles:</p>
                  </div>
                    <div className="grid grid-cols-3">
                      <div className="flex flex-row items-center gap-2 border-r border-neutral-300">
                        <Input 
                          id="vanCount"
                          value={getFormValue(formData.vanCount)}
                          onChange={(e) => handleInputChange("vanCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none border-l border-r text-center flex-1"
                        />
                        <p className="text-sm text-bold flex-1">Van</p>
                      </div>
                      <div className="flex flex-row items-center gap-2 border-r border-neutral-300">
                        <Input 
                          id="truckCount"
                          value={getFormValue(formData.truckCount)}
                          onChange={(e) => handleInputChange("truckCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none border-1 text-center flex-1"
                        />
                        <p className="text-sm text-bold flex-1">Truck</p>
                      </div>
                      <div className="flex flex-row items-center gap-2 border-r border-neutral-300">
                        <Input 
                          id="motorcycleCount"
                          value={getFormValue(formData.motorcycleCount)}
                          onChange={(e) => handleInputChange("motorcycleCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center flex-1"
                        />
                        <p className="text-sm text-bold flex-1">Motorcycle</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Taxpayer Address Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Taxpayer's Address:</h3>
              <div className="grid grid-cols-5 gap-2">
                <div>
                  <Input 
                    id="taxpayerHouseNumber"
                    value={formData.taxpayerAddress.houseNumber}
                    onChange={(e) => handleInputChange("taxpayerAddress.houseNumber", e.target.value)}
                    placeholder="456"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerHouseNumber" className="text-xs text-gray-500">(House / Building No.)</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerBuildingName"
                    value={formData.taxpayerAddress.buildingName}
                    onChange={(e) => handleInputChange("taxpayerAddress.buildingName", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerBuildingName" className="text-xs text-gray-500">(Name of Building)</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerLotNumber"
                    value={formData.taxpayerAddress.lotNumber}
                    onChange={(e) => handleInputChange("taxpayerAddress.lotNumber", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerLotNumber" className="text-xs text-gray-500">(Lot No.)</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerBlockNumber"
                    value={formData.taxpayerAddress.blockNumber}
                    onChange={(e) => handleInputChange("taxpayerAddress.blockNumber", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerBlockNumber" className="text-xs text-gray-500">(Block No.)</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerStreet"
                    value={formData.taxpayerAddress.street}
                    onChange={(e) => handleInputChange("taxpayerAddress.street", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerStreet" className="text-xs text-gray-500">(Street)</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2 mt-2">
                <div>
                  <Input 
                    id="taxpayerBarangay"
                    value={formData.taxpayerAddress.barangay}
                    onChange={(e) => handleInputChange("taxpayerAddress.barangay", e.target.value)}
                    placeholder="NAPACCU GRANDE"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerBarangay" className="text-xs text-gray-500">(Barangay)*</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerSubdivision"
                    value={formData.taxpayerAddress.subdivision}
                    onChange={(e) => handleInputChange("taxpayerAddress.subdivision", e.target.value)}
                    placeholder=""
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerSubdivision" className="text-xs text-gray-500">(Subdivision)</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerCity"
                    value={formData.taxpayerAddress.city}
                    onChange={(e) => handleInputChange("taxpayerAddress.city", e.target.value)}
                    placeholder="REINA MERCEDES"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerCity" className="text-xs text-gray-500">(City / Municipality)*</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerProvince"
                    value={formData.taxpayerAddress.province}
                    onChange={(e) => handleInputChange("taxpayerAddress.province", e.target.value)}
                    placeholder="ISABELA"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerProvince" className="text-xs text-gray-500">(Province)*</Label>
                </div>
                <div>
                  <Input 
                    id="taxpayerZipCode"
                    value={formData.taxpayerAddress.zipCode}
                    onChange={(e) => handleInputChange("taxpayerAddress.zipCode", e.target.value)}
                    placeholder="1234"
                    className="mb-1 rounded-none"
                  />
                  <Label htmlFor="taxpayerZipCode" className="text-xs text-gray-500">(Zip Code)</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ownership Details Section */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Label className="text-base font-medium">Owned:</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ownedYes"
                    checked={formData.owned}
                    onCheckedChange={(checked) => handleInputChange("owned", checked)}
                  />
                  <Label htmlFor="ownedYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ownedNo"
                    checked={!formData.owned}
                    onCheckedChange={(checked) => handleInputChange("owned", !checked)}
                  />
                  <Label htmlFor="ownedNo">No</Label>
                </div>
              </div>
              
                <div className="grid grid-cols-3 border-b border-neutral-300">
                  <div className="p-2">
                    <p className="text-sm font-bold text-neutral-950 col-span-1">If Yes, Tax Declaration No. / Property Identification No.:</p>
                  </div>
                  <div className="p-2">
                    <Input 
                      id="taxDeclarationNo"
                      value={formData.taxDeclarationNo}
                      onChange={(e) => handleInputChange("taxDeclarationNo", e.target.value)}
                      placeholder="24-23-0011-00001"
                      className="rounded-none border-none outline-none p-0 h-auto text-sm font-medium text-neutral-950 col-span-2"
                    />
                  </div>
                </div>
              
              <div className="mt-4">
                <Label className="text-base font-medium">If No, Lessor Name:</Label>
                <div className="grid grid-cols-4 gap-0 mt-2">
                  <div>
                    <Input 
                      id="lessorSurname"
                      value={formData.lessorName.surname}
                      onChange={(e) => handleInputChange("lessorName.surname", e.target.value)}
                      placeholder="ROTOR"
                      className="border rounded-none p-2 text-sm font-medium text-neutral-950"
                    />
                    <p className="text-xs text-neutral-500 text-start p-1">(Surname)</p>
                  </div>
                  <div>
                    <Input 
                      id="lessorGivenName"
                      value={formData.lessorName.givenName}
                      onChange={(e) => handleInputChange("lessorName.givenName", e.target.value)}
                      placeholder="KRISTOFER DAN"
                      className="border rounded-none p-2 text-sm font-medium text-neutral-950"
                    />
                    <p className="text-xs text-neutral-500 text-start p-1">(Given Name)</p>
                  </div>
                  <div>
                    <Input 
                      id="lessorMiddleName"
                      value={formData.lessorName.middleName}
                      onChange={(e) => handleInputChange("lessorName.middleName", e.target.value)}
                      placeholder="LLANETA"
                      className="border rounded-none p-2 text-sm font-medium text-neutral-950"
                    />
                    <p className="text-xs text-neutral-500 text-start p-1">(Middle Name)</p>
                  </div>
                  <div>
                    <Input 
                      id="lessorSuffix"
                      value={formData.lessorName.suffix}
                      onChange={(e) => handleInputChange("lessorName.suffix", e.target.value)}
                      placeholder="SUFFIX"
                      className="border rounded-none p-2 text-sm font-medium text-neutral-950"
                    />
                    <p className="text-xs text-neutral-500 text-start p-1">(SUFFIX)</p>
                  </div>
                </div>
              </div>
            </div>
              <Separator />

            {/* Monthly Rental Section */}
            <div className="border border-neutral-300">
              <div className="flex">
                <div className="border-r border-neutral-300 p-2">
                  <p className="text-sm font-bold text-neutral-950 flex-none">Monthly Rental:</p>
                </div>
                <div className="p-2">
                  <Input 
                    id="monthlyRental"
                    value={formData.monthlyRental}
                    onChange={(e) => handleInputChange("monthlyRental", e.target.value)}
                    placeholder="24 - 23 - 0011 - 00001"
                    className="rounded-none border-none outline-none p-0 h-auto text-sm font-medium text-neutral-950 flex-1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Tax Incentives Section */}
            <div>
              <div className="flex items-center space-x-4">
                <Label className="text-base font-medium">Do you have tax incentives from any Government Entity?</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="taxIncentivesYes"
                    checked={formData.taxIncentives}
                    onCheckedChange={(checked) => handleInputChange("taxIncentives", checked)}
                  />
                  <Label htmlFor="taxIncentivesYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="taxIncentivesNo"
                    checked={!formData.taxIncentives}
                    onCheckedChange={(checked) => handleInputChange("taxIncentives", !checked)}
                  />
                  <Label htmlFor="taxIncentivesNo">No</Label>
                </div>
                <div className="flex-1">
                  <Input type="file" className="max-w-xs" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Business Activity Section */}
            <div>
              <div className="flex items-start space-x-4">
                <Label className="text-base font-medium">Business Activity:</Label>
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mainOffice"
                        checked={formData.mainOffice}
                        onCheckedChange={(checked) => handleInputChange("mainOffice", checked)}
                      />
                      <Label htmlFor="mainOffice">Main Office</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="branchOffice"
                        checked={formData.branchOffice}
                        onCheckedChange={(checked) => handleInputChange("branchOffice", checked)}
                      />
                      <Label htmlFor="branchOffice">Branch Office</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="adminOfficeOnly"
                        checked={formData.adminOfficeOnly}
                        onCheckedChange={(checked) => handleInputChange("adminOfficeOnly", checked)}
                      />
                      <Label htmlFor="adminOfficeOnly">Admin Office Only</Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="warehouse"
                        checked={formData.warehouse}
                        onCheckedChange={(checked) => handleInputChange("warehouse", checked)}
                      />
                      <Label htmlFor="warehouse">Warehouse</Label>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <Checkbox 
                        id="othersActivity"
                        checked={formData.branchOffice}
                        onCheckedChange={(checked) => handleInputChange("branchOffice", checked)}
                      />
                      <Label htmlFor="othersActivity">Others (Specify) </Label>
                      <Input 
                        placeholder="SPECIFY" 
                        value={formData.otherActivity}
                        onChange={(e) => handleInputChange("otherActivity", e.target.value)}
                        className="border-0 border-b border-neutral-300 rounded-none p-0 flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Line of Business Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Line of Business</h3>
                <Button type="button" onClick={addLineOfBusiness} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Line of Business
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Line of Business</TableHead>
                      <TableHead>Philippine Standard Industrial Code</TableHead>
                      <TableHead>Products / Services</TableHead>
                      <TableHead>No. of Units</TableHead>
                      <TableHead>Total Capitalization</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.lineOfBusiness.map((business, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Select 
                            value={business.lineOfBusiness}
                            onValueChange={(value) => handleLineOfBusinessChange(index, 'lineOfBusiness', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select line of business" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Other information technology and computer service activities">
                                Other information technology and computer service activities
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={business.psicCode}
                            onChange={(e) => handleLineOfBusinessChange(index, 'psicCode', e.target.value)}
                            placeholder="61902"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={business.productsServices}
                            onChange={(e) => handleLineOfBusinessChange(index, 'productsServices', e.target.value)}
                            placeholder="IT SERVICE"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={business.numberOfUnits}
                            onChange={(e) => handleLineOfBusinessChange(index, 'numberOfUnits', parseInt(e.target.value) || 0)}
                            placeholder="0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={business.totalCapitalization}
                            onChange={(e) => handleLineOfBusinessChange(index, 'totalCapitalization', parseFloat(e.target.value) || 0)}
                            placeholder="100,000.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLineOfBusiness(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            {/* Location Map Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Location Plan or Sketch of the Location</h3>
                <div className="flex items-center gap-2 relative">
                  <div className="relative">
                    <Input
                      id="locationSearch"
                      placeholder="Search location (e.g., Reina Mercedes, Isabela)..."
                      value={formData.locationSearch || ""}
                      onChange={(e) => handleInputChange("locationSearch", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleLocationSearch();
                        }
                        if (e.key === 'Escape') {
                          setFormData(prev => ({ ...prev, showSuggestions: false }));
                        }
                      }}
                      onFocus={() => {
                        if (formData.locationSuggestions.length > 0) {
                          setFormData(prev => ({ ...prev, showSuggestions: true }));
                        }
                      }}
                      onBlur={() => {
                        // Delay hiding suggestions to allow clicking on them
                        setTimeout(() => {
                          setFormData(prev => ({ ...prev, showSuggestions: false }));
                        }, 200);
                      }}
                      className="w-64 h-8 text-sm pr-8"
                    />
                    
                    {/* Clear button inside input */}
                    {formData.locationSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            locationSearch: "",
                            locationSuggestions: [],
                            showSuggestions: false,
                            mapCenter: [17.0583, 121.6019],
                            mapZoom: 14
                          }));
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Suggestions Dropdown */}
                    {formData.showSuggestions && formData.locationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                        {formData.locationSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              handleLocationSearch(suggestion);
                            }}
                          >
                            <div className="font-medium text-gray-900">
                              {suggestion.display_name.split(',')[0]}
                            </div>
                            <div className="text-xs text-gray-500">
                              {suggestion.display_name.split(',').slice(1).join(',').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleLocationSearch()}
                    disabled={formData.isSearchingLocation}
                    className="h-8 px-3"
                  >
                    {formData.isSearchingLocation ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Interactive map showing the business location and surrounding area in Reina Mercedes, Isabela
                </p>
                <SimpleLeafletMap 
                  center={formData.mapCenter}
                  zoom={formData.mapZoom}
                  height="700px"
                />
              </div>
              <div className="text-xs text-gray-500">
                <p>Map data © Esri, satellite imagery © Esri</p>
              </div>
            </div>

            <Separator />

            {/* Document Upload Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>Barangay Clearance</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>DTI Registration</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>BIR Registration</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SSS Registration</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>PhilHealth Registration</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Pag-IBIG Registration</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Fire Safety Certificate</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Sanitary Permit</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Zoning Clearance</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Environmental Clearance</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Business Plan</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Financial Statement</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Other Documents</Label>
                  <Input type="file" className="max-w-xs" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Declaration Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Declaration</h3>
              <div className="space-y-2">
                <p className="text-sm leading-relaxed">
                  I DECLARE UNDER PENALTY OF PERJURY that all information in this application are true and correct based on my personal knowledge and submitted authentic documents online to the BUREAU OF PERMITS. Any false or misleading information supplied, or production of fake/falsified documents shall be grounds for appropriate legal action against me and AUTOMATICALLY REVOKES THE PERMIT. I hereby agree that all personal data (as defined under the Data Privacy Law of 2012 and its Implementing Rules and Regulations) and account transaction information or records with the City / Municipal Government may be processed, profiled or shared to requesting parties or for the purpose of any court, legal process, examination, inquiry and audit or investigation of any authority.
                </p>
                
                <div className="flex justify-center">
                  <div className="w-96 text-center">
                    <div className="border-b border-gray-400 pb-1 mb-1">
                      <Input placeholder="KRISTOFER DAN LLANETA ROTOR" className="border-0 text-center" />
                    </div>
                    <p className="text-sm text-gray-600">SIGNATURE OF APPLICANT / OWNER OVER PRINTED NAME</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-64 text-center">
                    <div className="border-b border-gray-400 pb-1 mb-1">
                      <Input placeholder="PRESIDENT" className="border-0 text-center" />
                    </div>
                    <p className="text-sm text-gray-600">DESIGNATION / POSITION / TITLE</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Business Fees Section - Admin Only */}
            <div>
              <h3 className="text-lg font-semibold mb-2">C. BUSINESS FEES</h3>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Fee Structure</h3>
                <Button type="button" onClick={addFee} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Fee
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.fees.map((fee, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            value={fee.description}
                            onChange={(e) => handleFeeChange(index, 'description', e.target.value)}
                            placeholder="Fee description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={fee.amount}
                            onChange={(e) => handleFeeChange(index, 'amount', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={fee.quantity}
                            onChange={(e) => handleFeeChange(index, 'quantity', parseInt(e.target.value) || 1)}
                            placeholder="1"
                          />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">₱{fee.total.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFee(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    Total: ₱{totalFees.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Process Application
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}