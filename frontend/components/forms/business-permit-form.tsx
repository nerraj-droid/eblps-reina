"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { BusinessLocationMap } from "@/components/ui/businesslocation-map";
import { usePsic, PsicCode } from "@/lib/hooks/usePsic";
import NextImage from "next/image";
import { TaxOrderPaymentForm } from "./tax-order-payment-form";

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

// Business types data for Line of Business dropdown
const businessTypes = [
  "Agriculture, Forestry and Fishing",
  "Mining and Quarrying",
  "Manufacturing",
  "Electricity, Gas, Steam and Air Conditioning Supply",
  "Water Supply; Sewerage, Waste Management and Remediation Activities",
  "Construction",
  "Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles",
  "Transportation and Storage",
  "Accommodation and Food Service Activities",
  "Information and Communication",
  "Financial and Insurance Activities",
  "Real Estate Activities",
  "Professional, Scientific and Technical Activities",
  "Administrative and Support Service Activities",
  "Public Administration and Defence; Compulsory Social Security",
  "Education",
  "Human Health and Social Work Activities",
  "Arts, Entertainment and Recreation",
  "Other Service Activities",
  "Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use",
  "Activities of Extraterritorial Organizations and Bodies"
];

// Mapping between business types and PSIC codes
const businessTypeToPsicCode: Record<string, string> = {
  "Agriculture, Forestry and Fishing": "01111",
  "Mining and Quarrying": "05101",
  "Manufacturing": "10110",
  "Electricity, Gas, Steam and Air Conditioning Supply": "35101",
  "Water Supply; Sewerage, Waste Management and Remediation Activities": "37001",
  "Construction": "41101",
  "Wholesale and Retail Trade; Repair of Motor Vehicles and Motorcycles": "45111",
  "Transportation and Storage": "49101",
  "Accommodation and Food Service Activities": "55101",
  "Information and Communication": "58110",
  "Financial and Insurance Activities": "64110",
  "Real Estate Activities": "68101",
  "Professional, Scientific and Technical Activities": "69101",
  "Administrative and Support Service Activities": "77101",
  "Public Administration and Defence; Compulsory Social Security": "84110",
  "Education": "85101",
  "Human Health and Social Work Activities": "86101",
  "Arts, Entertainment and Recreation": "90001",
  "Other Service Activities": "96001",
  "Activities of Households as Employers; Undifferentiated Goods- and Services-Producing Activities of Households for Own Use": "97001",
  "Activities of Extraterritorial Organizations and Bodies": "99001"
};

interface BusinessPermitFormProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onSubmit: (formData: any) => void;
  onCancel?: () => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  showApplicationType?: boolean;
  showBusinessFees?: boolean;
  showTypeAndPayment?: boolean;
  isReadOnly?: boolean;
}

export function BusinessPermitForm({
  title,
  subtitle,
  showBackButton = true,
  onBack,
  onSubmit,
  onCancel,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  showApplicationType = false,
  showBusinessFees = false,
  showTypeAndPayment = false,
  isReadOnly = false
}: BusinessPermitFormProps) {
  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  // PSIC data management
  const { psicCodes, searchPsicCodes, loading: psicLoading, error: psicError } = usePsic();
  const [psicSearchQuery, setPsicSearchQuery] = useState("");
  const [filteredPsicCodes, setFilteredPsicCodes] = useState<PsicCode[]>([]);

  // Line of Business search state
  const [lineOfBusinessSearch, setLineOfBusinessSearch] = useState("");
  const [filteredBusinessTypes, setFilteredBusinessTypes] = useState<string[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Tax Order Payment Dialog state
  const [showTaxOrderPaymentDialog, setShowTaxOrderPaymentDialog] = useState(false);

  const [formData, setFormData] = useState({
    // Application Type - System Generated
    dateOfReceipt: new Date().toLocaleDateString('en-US'),
    trackingNumber: "", // Will be generated by system
    businessIdNumber: "", // Will be generated by system

    // Business Information
    businessType: "",
    dtiSecCdaRegNo: "",
    tin: "",
    businessName: "", // Required field
    tradeName: "",

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

    // Contact Information - Required fields
    contactInfo: {
      telephone: "", // Required
      mobile: "", // Required
      email: "", // Required
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

    // Type and Payment (for client application form)
    applicationType: "",
    paymentType: "",

    // Line of Business
    lineOfBusiness: [
      {
        lineOfBusiness: "",
        psicCode: ""
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
    locationSuggestions: [] as Array<{ display_name: string, lat: string, lon: string }>,
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

  const handlePsicSearch = (searchTerm: string) => {
    setPsicSearchQuery(searchTerm);
    if (searchTerm.length < 2) {
      setFilteredPsicCodes(psicCodes);
      return;
    }

    const filtered = psicCodes.filter(psic =>
      psic.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psic.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPsicCodes(filtered);
  };

  // Tax Order Payment Dialog handlers
  const handleOpenTaxOrderPaymentDialog = () => {
    setShowTaxOrderPaymentDialog(true);
  };

  const handleCloseTaxOrderPaymentDialog = () => {
    setShowTaxOrderPaymentDialog(false);
  };

  const handleTaxOrderPaymentSubmit = (formData: any) => {
    // Handle the tax order payment form submission
    console.log("Tax Order Payment submitted:", formData);
    // You can add logic here to save the data or update the parent form
  };

  // Line of Business search functionality with debouncing
  const handleLineOfBusinessSearch = (searchTerm: string) => {
    try {
      setLineOfBusinessSearch(searchTerm);

      // Clear existing timeout
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }

      // Set new timeout for debounced search
      const timeout = setTimeout(() => {
        try {
          if (searchTerm.length < 2) {
            setFilteredBusinessTypes(businessTypes);
            return;
          }

          const filtered = businessTypes.filter(businessType =>
            businessType.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredBusinessTypes(filtered);
        } catch (error) {
          console.error('Error in debounced search:', error);
          setFilteredBusinessTypes(businessTypes);
        }
      }, 300); // 300ms delay

      setSearchTimeout(timeout);
    } catch (error) {
      console.error('Error in line of business search:', error);
      setFilteredBusinessTypes(businessTypes);
    }
  };

  // Update filtered PSIC codes when psicCodes changes
  useEffect(() => {
    setFilteredPsicCodes(psicCodes);
  }, [psicCodes]);

  // Initialize filtered business types
  useEffect(() => {
    setFilteredBusinessTypes(businessTypes);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);


  // Search for suggestions using OpenStreetMap Nominatim API
  const searchLocationSuggestions = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setFormData(prev => ({
        ...prev,
        locationSuggestions: [],
        showSuggestions: false
      }));
      return;
    }

    try {
      // Use OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&countrycodes=ph&limit=5&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }

      const data = await response.json();

      // Transform the response to match our expected format
      const suggestions = data.map((item: any) => ({
        display_name: item.display_name,
        lat: item.lat,
        lon: item.lon
      }));

      setFormData(prev => ({
        ...prev,
        locationSuggestions: suggestions,
        showSuggestions: suggestions.length > 0
      }));
    } catch (error) {
      console.error('Geocoding error:', error);
      setFormData(prev => ({
        ...prev,
        locationSuggestions: [],
        showSuggestions: false
      }));
    }
  };

  const handleLocationSearch = async (selectedLocation?: { lat: string, lon: string, display_name: string }) => {
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
      try {
        // Use OpenStreetMap Nominatim API for geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}&countrycodes=ph&limit=1&addressdetails=1`
        );

        if (!response.ok) {
          throw new Error('Geocoding request failed');
        }

        const data = await response.json();

        if (data.length > 0) {
          result = {
            display_name: data[0].display_name,
            lat: data[0].lat,
            lon: data[0].lon
          };
        } else {
          // Default to Reina Mercedes if no results found
          result = {
            display_name: "Reina Mercedes, Isabela, Philippines",
            lat: "17.0583",
            lon: "121.6019"
          };
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        // Default to Reina Mercedes on error
        result = {
          display_name: "Reina Mercedes, Isabela, Philippines",
          lat: "17.0583",
          lon: "121.6019"
        };
      }
    }

    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    // Update map center and zoom with smooth animation
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        mapCenter: [lat, lon],
        mapZoom: 14,
        isSearchingLocation: false,
        locationSearch: result.display_name
      }));
    }, 100);
  };

  // Debounced effect for location suggestions
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.locationSearch) {
        await searchLocationSuggestions(formData.locationSearch);
      }
    }, 500); // 500ms delay for API calls

    return () => clearTimeout(timeoutId);
  }, [formData.locationSearch]);

  // Utility function to safely get form values
  const getFormValue = (value: any): string => {
    return value || "";
  };

  const handleLineOfBusinessChange = (index: number, field: string, value: any) => {
    const newLineOfBusiness = [...formData.lineOfBusiness];
    newLineOfBusiness[index] = { ...newLineOfBusiness[index], [field]: value };

    // Auto-populate PSIC code when line of business is selected
    if (field === 'lineOfBusiness' && value) {
      const psicCode = businessTypeToPsicCode[value];
      if (psicCode) {
        newLineOfBusiness[index].psicCode = psicCode;
      }
    }

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
        psicCode: ""
      }]
    }));
  };

  const removeLineOfBusiness = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineOfBusiness: prev.lineOfBusiness.filter((_, i) => i !== index)
    }));
  };


  const validateRequiredFields = () => {
    const errors = [];

    if (!formData.businessName.trim()) {
      errors.push("Business Name is required");
    }

    if (!formData.contactInfo.telephone.trim()) {
      errors.push("Telephone Number is required");
    }

    if (!formData.contactInfo.mobile.trim()) {
      errors.push("Mobile Number is required");
    }

    if (!formData.contactInfo.email.trim()) {
      errors.push("Email Address is required");
    }

    if (!formData.mainOffice && !formData.branchOffice && !formData.adminOfficeOnly && !formData.warehouse && !formData.othersActivity) {
      errors.push("At least one Business Activity must be selected");
    }

    if (!formData.locationSearch.trim()) {
      errors.push("Location Plan or Sketch of the Location is required");
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRequiredFields();
    if (validationErrors.length > 0) {
      alert("Please fill in all required fields:\n" + validationErrors.join("\n"));
      return;
    }

    onSubmit(formData);
  };

  return (
    <div>
      <div>
        <div className="flex items-start space-x-4 pb-4">
          {/* {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )} */}
          <div>
            {/* <h1 className="text-3xl font-bold tracking-tight">{title}</h1> */}
            {subtitle && (
              <p className="text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-2">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Single Card containing all sections */}
          <Card className="rounded-none">
            <CardContent className="pt-2 space-y-4">
              {/* Header with Logo  */}
              <div className="flex items-center justify-center pb-0 pt-[26px] px-0 relative w-full">
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
              <div className="text-center mt-4 bg-[#3B82F6] h-16 flex items-center justify-center text-white">
                <h1 className="text-lg font-bold">UNIFIED APPLICATION FORM FOR BUSINESS PERMIT</h1>
              </div>

              {/* Application Details Section - Always Visible */}
              <div className="mt-4">
                <div className="flex gap-4 items-start">
                  {/* Left Column - Type and Payment (Conditional) */}
                  {showTypeAndPayment && (
                    <div className="flex flex-col gap-3 flex-1">
                      {/* TYPE Section */}
                      <div className="flex items-center">
                        {/* Label */}
                        <p className="font-semibold text-[16px] text-neutral-950 whitespace-nowrap w-20">
                          TYPE:
                        </p>

                        {/* Radio Group */}
                        <RadioGroup
                          value={formData.applicationType}
                          onValueChange={(value: string) => handleInputChange("applicationType", value)}
                          disabled={isReadOnly}
                          className="flex gap-8 items-center"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="new" id="new-application" />
                            <Label htmlFor="new-application" className="text-[16px] text-neutral-950">NEW</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="renewal" id="renewal-application" />
                            <Label htmlFor="renewal-application" className="text-[16px] text-neutral-950">RENEWAL</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="additional" id="additional-application" />
                            <Label htmlFor="additional-application" className="text-[16px] text-neutral-950">ADDITIONAL</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* PAYMENT Section */}
                      <div className="flex items-center">
                        {/* Label */}
                        <p className="font-semibold text-[16px] text-neutral-950 whitespace-nowrap w-20">
                          PAYMENT:
                        </p>

                        {/* Radio Group */}
                        <RadioGroup
                          value={formData.paymentType}
                          onValueChange={(value: string) => handleInputChange("paymentType", value)}
                          disabled={isReadOnly}
                          className="flex gap-8 items-center"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="annually" id="annually-payment" />
                            <Label htmlFor="annually-payment" className="text-[16px] text-neutral-950">ANNUALLY</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="biannually" id="biannually-payment" />
                            <Label htmlFor="biannually-payment" className="text-[16px] text-neutral-950">BI-ANNUALLY</Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="quarterly" id="quarterly-payment" />
                            <Label htmlFor="quarterly-payment" className="text-[16px] text-neutral-950">QUARTERLY</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex flex-col border border-neutral-300">
                      <div className="flex">
                        <div className="border-r border-neutral-300 px-3 py-2 w-[200px]">
                          <p className="font-bold text-[14px] text-neutral-950">Date of Receipt:</p>
                        </div>
                        <div className="px-3 py-2 flex-1">
                          <p className="font-medium text-[14px] text-neutral-950 text-right">09/27/2025</p>
                        </div>
                      </div>
                      <div className="flex border-t border-neutral-300">
                        <div className="border-r border-neutral-300 px-3 py-2 w-[200px]">
                          <p className="font-bold text-[14px] text-neutral-950">Tracking Number:</p>
                        </div>
                        <div className="px-3 py-2 flex-1">
                          <p className="font-medium text-[14px] text-neutral-950 text-right">1234567890</p>
                        </div>
                      </div>
                      <div className="flex border-t border-neutral-300">
                        <div className="border-r border-neutral-300 px-3 py-2 w-[200px]">
                          <p className="font-bold text-[14px] text-neutral-950">Business ID Number:</p>
                        </div>
                        <div className="px-3 py-2 flex-1">
                          <p className="font-medium text-[14px] text-neutral-950 text-right">0203125-2025-0000669</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />

              {/* Application Type  */}
              {/* {showApplicationType && (
                <>
                  <div className="flex justify-end">
                    <div className="w-[619.5px]">
                      <div className="grid grid-cols-2 gap-0 border border-neutral-300">
                        <div className="border-r border-neutral-300 p-2">
                          <p className="text-sm font-bold text-neutral-950">Application Type:</p>
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium text-neutral-950 text-right">New Application</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </>
              )} */}

              {/* Business Information  */}
              <div>
                <h3 className="text-start text-lg font-semibold mb-2">A. BUSINESS INFORMATION AND REGISTRATION</h3>
                {/* Business Type Checkboxes */}
                <div className="pl-5 mb-4">
                  <div className="grid grid-cols-3 gap-2">
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
                      {isReadOnly ? (
                        <p className="text-sm font-medium text-neutral-950 text-left">{formData.dtiSecCdaRegNo}</p>
                      ) : (
                        <Input
                          value={getFormValue(formData.dtiSecCdaRegNo)}
                          onChange={(e) => handleInputChange("dtiSecCdaRegNo", e.target.value)}
                          placeholder="2025040199417-12"
                          className="border-0 border-none outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none rounded-none p-0 h-auto text-sm font-medium text-neutral-950"
                        />
                      )}
                    </div>
                    <div className="border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950">Tax Identification No. (TIN):</p>
                    </div>
                    <div className="p-2">
                      {isReadOnly ? (
                        <p className="text-sm font-medium text-neutral-950 text-left">{formData.tin}</p>
                      ) : (
                        <Input
                          value={getFormValue(formData.tin)}
                          onChange={(e) => handleInputChange("tin", e.target.value)}
                          placeholder="123-456-789-000"
                          className="border-0 border-none outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none rounded-none p-0 h-auto text-sm font-medium text-neutral-950"
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-b border-neutral-300">
                    <div className="border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950">
                        Business Name: <span className="text-red-500">*</span>
                      </p>
                    </div>
                    <div className="col-span-3 p-2">
                      {isReadOnly ? (
                        <p className="text-sm font-medium text-neutral-950 text-left">{formData.businessName}</p>
                      ) : (
                        <Input
                          value={getFormValue(formData.businessName)}
                          onChange={(e) => handleInputChange("businessName", e.target.value)}
                          placeholder="AXOLUTE TECHNOLOGY OPC"
                          className="border-0 border-none outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none rounded-none p-0 h-auto text-sm font-medium text-neutral-950"
                          required
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4">
                    <div className="border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950">Trade Name / Franchise:</p>
                    </div>
                    <div className="col-span-3 p-2">
                      {isReadOnly ? (
                        <p className="text-sm font-medium text-neutral-950 text-left">{formData.tradeName}</p>
                      ) : (
                        <Input
                          value={getFormValue(formData.tradeName)}
                          onChange={(e) => handleInputChange("tradeName", e.target.value)}
                          placeholder="AXOLUTE TECHNOLOGY"
                          className="border-0 border-none outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none rounded-none p-0 h-auto text-sm font-medium text-neutral-950"
                        />
                      )}
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
                      className="mb-1 rounded-none outline-none"
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                    <p className="text-sm font-bold text-neutral-950 ml-2">
                      Telephone Number: <span className="text-red-500">*</span>
                    </p>
                    <Input
                      id="telephone"
                      value={getFormValue(formData.contactInfo.telephone)}
                      onChange={(e) => handleInputChange("contactInfo.telephone", e.target.value)}
                      placeholder="#000-000-0000"
                      className="rounded-none"
                      required
                      disabled={isReadOnly}
                    />
                    <p className="text-sm font-bold text-neutral-950 ml-2">
                      Mobile Number: <span className="text-red-500">*</span>
                    </p>
                    <Input
                      id="mobile"
                      value={getFormValue(formData.contactInfo.mobile)}
                      onChange={(e) => handleInputChange("contactInfo.mobile", e.target.value)}
                      placeholder="+639123456789"
                      className="rounded-none"
                      required
                      disabled={isReadOnly}
                    />
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="text-sm font-bold text-neutral-950 ml-2">
                      Email Address: <span className="text-red-500">*</span>
                    </p>
                    <Input
                      id="email"
                      value={getFormValue(formData.contactInfo.email)}
                      onChange={(e) => handleInputChange("contactInfo.email", e.target.value)}
                      placeholder="info@axolutetech.com"
                      className="rounded-none"
                      type="email"
                      required
                      disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                        disabled={isReadOnly}
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
                  <div className="flex border-b border-neutral-300 items-center">
                    <div className="flex-shrink-0 border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950 whitespace-nowrap">
                        Business Area / Total Floor Area (sq. m.):
                      </p>
                    </div>
                    <Input
                      id="businessArea"
                      value={getFormValue(formData.businessArea)}
                      onChange={(e) => handleInputChange("businessArea", e.target.value)}
                      placeholder="80"
                      className="rounded-none flex-grow outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none"
                      disabled={isReadOnly}
                    />
                  </div>

                  <div className="flex border-b border-neutral-300 items-stretch">
                    {/* Label Section */}
                    <div className="flex-shrink-0 border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950 whitespace-nowrap">
                        Total No. of Employees in Establishment:
                      </p>
                    </div>

                    {/* Inputs Section */}
                    <div className="flex flex-1">
                      {/* Male Employees */}
                      <div className="flex items-center gap-1 border-r border-neutral-300 flex-1">
                        <Input
                          id="maleEmployees"
                          value={getFormValue(formData.maleEmployees)}
                          onChange={(e) => handleInputChange("maleEmployees", e.target.value)}
                          placeholder="1"
                          className="rounded-none text-center flex-1"
                          disabled={isReadOnly}
                        />
                        <p className="text-sm font-bold whitespace-nowrap p-2 outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none">Male</p>
                      </div>

                      {/* Female Employees */}
                      <div className="flex items-center gap-1 border-r border-neutral-300  flex-1">
                        <Input
                          id="femaleEmployees"
                          value={getFormValue(formData.femaleEmployees)}
                          onChange={(e) => handleInputChange("femaleEmployees", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center flex-1"
                          disabled={isReadOnly}
                        />
                        <p className="text-sm font-bold whitespace-nowrap p-2 outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none">Female</p>
                      </div>

                      {/* Residing Employees */}
                      <div className="flex items-center gap-2 flex-[1.5]">
                        <span className="text-sm font-bold whitespace-nowrap p-2">
                          No. of Employees Residing w/in the Area:
                        </span>
                        <Input
                          id="residingEmployees"
                          value={getFormValue(formData.residingEmployees)}
                          onChange={(e) => handleInputChange("residingEmployees", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center w-32"
                          disabled={isReadOnly}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex border-b border-neutral-300 items-stretch">
                    {/* Label Section */}
                    <div className="flex-shrink-0 border-r border-neutral-300 p-2">
                      <p className="text-sm font-bold text-neutral-950 whitespace-nowrap">
                        No. of Delivery Vehicles:
                      </p>
                    </div>

                    {/* Inputs Section */}
                    <div className="flex flex-1">
                      {/* Van */}
                      <div className="flex items-center gap-2 border-r border-neutral-300 flex-1">
                        <Input
                          id="vanCount"
                          value={getFormValue(formData.vanCount)}
                          onChange={(e) => handleInputChange("vanCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center flex-1 outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none"
                          disabled={isReadOnly}
                        />
                        <p className="text-sm font-bold whitespace-nowrap p-2">Van</p>
                      </div>

                      {/* Truck */}
                      <div className="flex items-center gap-2 border-r border-neutral-300 flex-1">
                        <Input
                          id="truckCount"
                          value={getFormValue(formData.truckCount)}
                          onChange={(e) => handleInputChange("truckCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center flex-1 outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none"
                          disabled={isReadOnly}
                        />
                        <p className="text-sm font-bold whitespace-nowrap p-2">Truck</p>
                      </div>

                      {/* Motorcycle */}
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          id="motorcycleCount"
                          value={getFormValue(formData.motorcycleCount)}
                          onChange={(e) => handleInputChange("motorcycleCount", e.target.value)}
                          placeholder="0"
                          className="rounded-none text-center flex-1"
                          disabled={isReadOnly}
                        />
                        <p className="text-sm font-bold whitespace-nowrap p-2">Motorcycle</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <Separator />

              {/* Taxpayer Address Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Taxpayer's Address:</h3>
                <div className="grid grid-cols-5">
                  <div>
                    <Input
                      id="taxpayerHouseNumber"
                      value={formData.taxpayerAddress.houseNumber}
                      onChange={(e) => handleInputChange("taxpayerAddress.houseNumber", e.target.value)}
                      placeholder="456"
                      className="mb-1 rounded-none"
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
                    />
                    <Label htmlFor="taxpayerStreet" className="text-xs text-gray-500">(Street)</Label>
                  </div>
                </div>

                <div className="grid grid-cols-5 mt-2">
                  <div>
                    <Input
                      id="taxpayerBarangay"
                      value={formData.taxpayerAddress.barangay}
                      onChange={(e) => handleInputChange("taxpayerAddress.barangay", e.target.value)}
                      placeholder="NAPACCU GRANDE"
                      className="mb-1 rounded-none"
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      disabled={isReadOnly}
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
                      className="rounded-none border-none outline-none p-0 h-auto text-sm font-medium text-neutral-950 flex-1 outline-none focus:ring-0 focus:border-none focus:outline-none shadow-none"
                      disabled={isReadOnly}
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
                  <Label className="text-base font-medium">
                    Business Activity: <span className="text-red-500">*</span>
                  </Label>
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
                <div className="flex items-start mb-2">
                  <h3 className="text-lg font-semibold">Line of Business</h3>
                </div>

                <div className="border border-neutral-300 overflow-hidden">
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      {/* Table Header */}
                      <div className="flex border-b border-neutral-300">
                        <div className="flex-[2] min-w-[400px] border-r border-neutral-300 px-2 py-2">
                          <p className="font-bold text-[14px] text-neutral-950">Line of Business</p>
                        </div>
                        <div className="flex-1 min-w-[200px] border-r border-neutral-300 px-2 py-2">
                          <p className="font-bold text-[14px] text-neutral-950">Philippine Standard Industrial Code</p>
                        </div>
                        <div className="w-12 px-2 py-2">
                          {/* Empty header for actions column */}
                        </div>
                      </div>

                      {/* Table Body */}
                      {formData.lineOfBusiness.map((business, index) => (
                        <div key={index} className="flex border-b border-neutral-300 last:border-b-0">
                          <div className="flex-[2] min-w-[400px] border-r border-neutral-300 px-2 py-2 overflow-hidden">
                            <Select
                              value={business.lineOfBusiness}
                              onValueChange={(value) => handleLineOfBusinessChange(index, 'lineOfBusiness', value)}
                            >
                              <SelectTrigger className="w-full border-0 shadow-none p-0 h-auto">
                                <SelectValue placeholder="Select line of business" className="text-[14px] text-neutral-950 truncate" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                <div className="p-2">
                                  <Input
                                    ref={searchInputRef}
                                    placeholder="Search line of business..."
                                    className="h-8"
                                    value={lineOfBusinessSearch}
                                    onChange={(e) => handleLineOfBusinessSearch(e.target.value)}
                                  />
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                  {filteredBusinessTypes.length === 0 ? (
                                    <SelectItem value="no-results" disabled>
                                      No business types found
                                    </SelectItem>
                                  ) : (
                                    filteredBusinessTypes.map((businessType, index) => (
                                      <SelectItem key={index} value={businessType}>
                                        <div className="flex flex-col w-full">
                                          <span className="text-sm text-gray-700 leading-tight">
                                            {businessType}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))
                                  )}
                                </div>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex-1 min-w-[200px] border-r border-neutral-300 px-2 py-2">
                            <Input
                              value={business.psicCode}
                              placeholder="Auto-generated"
                              className="w-full text-center font-mono text-[14px] text-neutral-950 border-0 shadow-none p-0 h-auto bg-gray-50"
                              readOnly
                              disabled={isReadOnly}
                              title="PSIC code is automatically generated based on the selected line of business"
                            />
                          </div>
                          <div className="w-12 px-2 py-2 flex items-center justify-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLineOfBusiness(index)}
                              className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Button type="button" onClick={addLineOfBusiness} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Line of Business
              </Button>
              <Separator />

              {/* Location Map Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    Location Plan or Sketch of the Location: <span className="text-red-500">*</span>
                  </h3>
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
                        disabled={isReadOnly}
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
                  <BusinessLocationMap
                    center={formData.mapCenter}
                    zoom={formData.mapZoom}
                    height="700px"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  <p>Map data © MapTiler © OpenStreetMap contributors, satellite imagery © Esri</p>
                </div>
              </div>

              <Separator />

              {/* Document Upload Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">
                      Valid ID: <span className="text-red-500">*</span>
                    </Label>
                    <Input type="file" className="w-[320px]" required />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">
                      DTI / SEC / CDA Registration: <span className="text-red-500">*</span>
                    </Label>
                    <Input type="file" className="w-[320px]" required />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">
                      Contract of Lease / Tax Clearance: <span className="text-red-500">*</span>
                    </Label>
                    <Input type="file" className="w-[320px]" required />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">
                      Fire Safety Inspection Certificate for Occupancy: <span className="text-red-500">*</span>
                    </Label>
                    <Input type="file" className="w-[320px]" required />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Barangay Business Clearance:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Photo of Establishment:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Occupancy Permit:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Environment Compliance Certificate (ECC):</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Certificate of Registration / License to Operate:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">DTI Clearance:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">NTC Clearance:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">FDA Certificate:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">BSP Certificate:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">DOH Certificate:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Proof of Income:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Proof of Annual Gross Receipts:</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="w-[423px] text-sm font-medium">Affidavit of Business Closure</Label>
                    <Input type="file" className="w-[320px]" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Declaration Section */}
              <div>
                <div className="space-y-2">
                  <p className="text-sm leading-relaxed text-center">
                    I DECLARE UNDER PENALTY OF PERJURY that all information in this application are true and correct based on my personal knowledge and submitted authentic documents online to the BUREAU OF PERMITS. Any false or misleading information supplied, or production of fake/falsified documents shall be grounds for appropriate legal action against me and AUTOMATICALLY REVOKES THE PERMIT. I hereby agree that all personal data (as defined under the Data Privacy Law of 2012 and its Implementing Rules and Regulations) and account transaction information or records with the City / Municipal Government may be processed, profiled or shared to requesting parties or for the purpose of any court, legal process, examination, inquiry and audit or investigation of any authority.
                  </p>

                  <div className="flex justify-center">
                    <div className="w-96 text-center">
                      <div className="border-b border-gray-400 pb-1 mb-1">
                        <Input placeholder="KRISTOFER DAN LLANETA ROTOR" className="border-0 text-center" disabled={isReadOnly} />
                      </div>
                      <p className="text-sm text-gray-600">SIGNATURE OF APPLICANT / OWNER OVER PRINTED NAME</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-64 text-center">
                      <div className="border-b border-gray-400 pb-1 mb-1">
                        <Input placeholder="PRESIDENT" className="border-0 text-center" disabled={isReadOnly} />
                      </div>
                      <p className="text-sm text-gray-600">DESIGNATION / POSITION / TITLE</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Business Fees Section - Admin Only */}
              {showBusinessFees && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">C. BUSINESS FEES</h3>

                    {/* Tax Order Payment Section */}
                    <div className="border border-neutral-300 mb-4">
                      <div className="flex">
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Date Created</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">9/27/2025 10:00:00</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Tax Order Payment For</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">NEW BUSINESS</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Total Amount</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">5,000.00</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Status</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-center">COMPLETE</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Official Receipt No.</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">1234567890</p>
                          </div>
                        </div>
                        <div className="w-24">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Actions</p>
                          </div>
                          <div className="px-2 py-2 flex gap-1 justify-center">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white mb-4 h-9 px-4"
                      onClick={handleOpenTaxOrderPaymentDialog}
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Add Tax Order Payment
                    </Button>

                    {/* Status Tracking Section */}
                    <div className="border border-neutral-300">
                      <div className="flex">
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Status Date</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">9/27/2025 10:00:00</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Status Owner</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">ROTOR, KRISTOFER DAN LLANETA</p>
                          </div>
                        </div>
                        <div className="flex-1 border-r border-neutral-300">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Status</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">NEW SUBMISSION</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="border-b border-neutral-300 px-2 py-2">
                            <p className="text-sm font-bold text-neutral-950 text-center">Remarks</p>
                          </div>
                          <div className="px-2 py-2">
                            <p className="text-sm text-neutral-950 text-right">REMARKS</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-white mt-4 h-9 px-4">
                      <Plus className="mr-2 h-3 w-3" />
                      Add Status
                    </Button>
                  </div>

                  <Separator />
                </>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  {cancelButtonText}
                </Button>
                <Button type="submit">
                  {submitButtonText}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Tax Order Payment Dialog - Rendered outside main container */}
      {showTaxOrderPaymentDialog && (
        <TaxOrderPaymentForm
          onClose={handleCloseTaxOrderPaymentDialog}
          onSubmit={handleTaxOrderPaymentSubmit}
        />
      )}
    </div>
  );
}
