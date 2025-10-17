// Business Permit Form Data Transformer
// Maps frontend form structure to backend API structure

export interface FrontendFormData {
  // Application Type
  applicationType: string;
  paymentType: string;
  
  // Business Information
  businessType: string;
  dtiSecCdaRegNo: string;
  tin: string;
  businessName: string;
  tradeName: string;
  
  // Business Address
  businessAddress: {
    houseNumber: string;
    buildingName: string;
    lotNumber: string;
    blockNumber: string;
    street: string;
    barangay: string;
    subdivision: string;
    city: string;
    province: string;
    zipCode: string;
  };
  
  // Contact Information
  contactInfo: {
    telephone: string;
    mobile: string;
    email: string;
    website: string;
  };
  
  // Owner Information
  ownerName: {
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string;
  };
  
  // President/Officer Information
  presidentName: {
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string;
  };
  
  // Business Operation
  businessArea: string;
  maleEmployees: string;
  femaleEmployees: string;
  residingEmployees: string;
  vanCount: string;
  truckCount: string;
  motorcycleCount: string;
  businessActivity: string;
  businessDescription: string;
  capitalInvestment: string;
  numberOfEmployees: string;
  businessHours: string;
  businessDays: string;
  
  // Taxpayer Address
  taxpayerAddress: {
    houseNumber: string;
    buildingName: string;
    lotNumber: string;
    blockNumber: string;
    street: string;
    barangay: string;
    subdivision: string;
    city: string;
    province: string;
    zipCode: string;
  };
  
  // Ownership Details
  owned: boolean;
  propertyDescription: string;
  propertyValue: string;
  taxDeclarationNo: string;
  monthlyRental: string;
  lessorName: {
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string;
  };
  
  // Tax Incentives
  taxIncentives: boolean;
  
  // Business Activity Type
  businessActivityType: string;
  otherActivity: string;
  mainOffice: boolean;
  branchOffice: boolean;
  adminOfficeOnly: boolean;
  warehouse: boolean;
  othersActivity: boolean;
  
  // Line of Business
  lineOfBusiness: Array<{
    lineOfBusiness: string;
    psicCode: string;
  }>;
  
  // Location
  locationSearch: string;
  mapCenter: [number, number];

  // Document Uploads
  documents: {
    valid_id: File | null;
    dti_registration: File | null;
    contract_lease: File | null;
    fire_safety_certificate: File | null;
    barangay_clearance: File | null;
    establishment_photo: File | null;
    occupancy_permit: File | null;
    ecc: File | null;
    registration_license: File | null;
    dti_clearance: File | null;
    ntc_clearance: File | null;
    fda_certificate: File | null;
    bsp_certificate: File | null;
    doh_certificate: File | null;
    proof_of_income: File | null;
    proof_of_receipts: File | null;
    affidavit_closure: File | null;
    tax_incentives: File | null;
  };
}

export interface BackendApiData {
  owner: {
    first_name: string;
    last_name: string;
    middle_name: string;
    suffix: string;
    email: string;
    phone: string;
    birth_date: string;
    gender: string;
    nationality: string;
    civil_status: string;
    address: string;
    barangay: string;
    city: string;
    province: string;
    postal_code: string;
    tin_number: string;
    sss_number: string;
    philhealth_number: string;
    pagibig_number: string;
    taxpayer_address: string;
    taxpayer_barangay: string;
    taxpayer_city: string;
    taxpayer_province: string;
    taxpayer_postal_code: string;
  };
  business: {
    business_name: string;
    business_name_arabic: string;
    trade_name: string;
    business_description: string;
    business_activity: string;
    business_address: string;
    business_barangay: string;
    business_city: string;
    business_province: string;
    business_postal_code: string;
    business_phone: string;
    business_email: string;
    business_website: string;
    capital_investment: number;
    number_of_employees: number;
    business_start_date: string;
    business_type_id: string;
    dti_registration_number: string;
    sec_registration_number: string;
    cooperative_registration_number: string;
    house_number: string;
    building_name: string;
    lot_number: string;
    block_number: string;
    street: string;
    subdivision: string;
    male_employees: number;
    female_employees: number;
    residing_employees: number;
    van_count: number;
    truck_count: number;
    motorcycle_count: number;
    business_area: number;
    business_hours: string;
    business_days: string;
    main_office: boolean;
    branch_office: boolean;
    admin_office_only: boolean;
    warehouse: boolean;
    others_activity: boolean;
  };
  permit: {
    permit_type: string;
    valid_from: string;
    valid_until: string;
    remarks: string;
    owned: boolean;
    property_description: string;
    property_value: number;
    tax_declaration_no: string;
    monthly_rental: number;
    lessor_surname: string;
    lessor_given_name: string;
    lessor_middle_name: string;
    lessor_suffix: string;
    tax_incentives: boolean;
    location_latitude: number;
    location_longitude: number;
    location_search: string;
    application_type: string;
    payment_type: string;
  };
  business_lines: Array<{
    line_of_business: string;
    psic_code: string;
  }>;
  documents: Array<{
    document_type: string;
    file: File | null;
    description?: string;
  }>;
}

// Helper function to build full address
function buildAddress(address: FrontendFormData['businessAddress']): string {
  const parts = [
    address.houseNumber,
    address.buildingName,
    address.lotNumber,
    address.blockNumber,
    address.street,
    address.subdivision
  ].filter(Boolean);
  return parts.join(', ');
}

// Helper function to build taxpayer address
function buildTaxpayerAddress(address: FrontendFormData['taxpayerAddress']): string {
  const parts = [
    address.houseNumber,
    address.buildingName,
    address.lotNumber,
    address.blockNumber,
    address.street,
    address.subdivision
  ].filter(Boolean);
  return parts.join(', ');
}

// Helper function to parse numeric values safely
function parseNumeric(value: string, defaultValue: number = 0): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

// Helper function to parse integer values safely
function parseIntValue(value: string, defaultValue: number = 0): number {
  const parsed = parseInt(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function transformFormToBackendApi(formData: FrontendFormData): BackendApiData {
  // Calculate birth date (30 years ago as default)
  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - 30);
  
  return {
    owner: {
      first_name: formData.ownerName.givenName || 'John',
      last_name: formData.ownerName.surname || 'Doe',
      middle_name: formData.ownerName.middleName || '',
      suffix: formData.ownerName.suffix || '',
      email: formData.contactInfo.email || 'test@example.com',
      phone: formData.contactInfo.mobile || formData.contactInfo.telephone || '09123456789',
      birth_date: birthDate.toISOString().split('T')[0], // 30 years ago
      gender: 'male', // Default
      nationality: 'Filipino', // Default
      civil_status: 'Single', // Default
      address: buildAddress(formData.businessAddress) || '123 Main Street',
      barangay: formData.businessAddress.barangay || 'Barangay 1',
      city: formData.businessAddress.city || 'City',
      province: formData.businessAddress.province || 'Province',
      postal_code: formData.businessAddress.zipCode || '1234',
      tin_number: formData.tin || '',
      sss_number: '', // Not in form
      philhealth_number: '', // Not in form
      pagibig_number: '', // Not in form
      taxpayer_address: buildTaxpayerAddress(formData.taxpayerAddress) || buildAddress(formData.businessAddress) || '123 Main Street',
      taxpayer_barangay: formData.taxpayerAddress.barangay || formData.businessAddress.barangay || 'Barangay 1',
      taxpayer_city: formData.taxpayerAddress.city || formData.businessAddress.city || 'City',
      taxpayer_province: formData.taxpayerAddress.province || formData.businessAddress.province || 'Province',
      taxpayer_postal_code: formData.taxpayerAddress.zipCode || formData.businessAddress.zipCode || '1234',
    },
    business: {
      business_name: formData.businessName || 'Test Business',
      business_name_arabic: '', // Not in form
      trade_name: formData.tradeName || '',
      business_description: formData.businessDescription || 'Business description',
      business_activity: formData.businessActivity || 'General business',
      business_address: buildAddress(formData.businessAddress) || '123 Business Street',
      business_barangay: formData.businessAddress.barangay || 'Barangay 1',
      business_city: formData.businessAddress.city || 'City',
      business_province: formData.businessAddress.province || 'Province',
      business_postal_code: formData.businessAddress.zipCode || '1234',
      business_phone: formData.contactInfo.telephone || '09123456789',
      business_email: formData.contactInfo.email || 'business@example.com',
      business_website: formData.contactInfo.website || '',
      capital_investment: parseNumeric(formData.capitalInvestment, 100000),
      number_of_employees: parseIntValue(formData.numberOfEmployees, 1),
      business_start_date: new Date().toISOString().split('T')[0], // Today
      business_type_id: (parseInt(formData.businessType) || 1).toString(), // Convert to string
      dti_registration_number: formData.dtiSecCdaRegNo || '',
      sec_registration_number: '', // Not in form
      cooperative_registration_number: '', // Not in form
      house_number: formData.businessAddress.houseNumber || '',
      building_name: formData.businessAddress.buildingName || '',
      lot_number: formData.businessAddress.lotNumber || '',
      block_number: formData.businessAddress.blockNumber || '',
      street: formData.businessAddress.street || '',
      subdivision: formData.businessAddress.subdivision || '',
      male_employees: parseIntValue(formData.maleEmployees),
      female_employees: parseIntValue(formData.femaleEmployees),
      residing_employees: parseIntValue(formData.residingEmployees),
      van_count: parseIntValue(formData.vanCount),
      truck_count: parseIntValue(formData.truckCount),
      motorcycle_count: parseIntValue(formData.motorcycleCount),
      business_area: parseNumeric(formData.businessArea),
      business_hours: formData.businessHours || '',
      business_days: formData.businessDays || '',
      main_office: formData.mainOffice || false,
      branch_office: formData.branchOffice || false,
      admin_office_only: formData.adminOfficeOnly || false,
      warehouse: formData.warehouse || false,
      others_activity: formData.othersActivity || false,
    },
    permit: {
      permit_type: 'new', // Always 'new' for new applications
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      remarks: formData.otherActivity || '',
      owned: formData.owned || false,
      property_description: formData.propertyDescription || '',
      property_value: parseNumeric(formData.propertyValue),
      tax_declaration_no: formData.taxDeclarationNo || '',
      monthly_rental: parseNumeric(formData.monthlyRental),
      lessor_surname: formData.lessorName.surname || '',
      lessor_given_name: formData.lessorName.givenName || '',
      lessor_middle_name: formData.lessorName.middleName || '',
      lessor_suffix: formData.lessorName.suffix || '',
      tax_incentives: formData.taxIncentives || false,
      location_latitude: formData.mapCenter[0] || 17.0583,
      location_longitude: formData.mapCenter[1] || 121.6019,
      location_search: formData.locationSearch || 'Location description',
      application_type: formData.applicationType || 'new',
      payment_type: formData.paymentType || 'cash',
    },
    business_lines: formData.lineOfBusiness.map(line => ({
      line_of_business: line.lineOfBusiness || '',
      psic_code: line.psicCode || ''
    })),
    documents: Object.entries(formData.documents)
      .filter(([, file]) => file !== null)
      .map(([documentType, file]) => ({
        document_type: documentType,
        file: file,
        description: `Uploaded ${documentType.replace(/_/g, ' ')} document`
      }))
  };
}

// Validation function to check if required fields are present
export function validateFormData(data: FrontendFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required business fields
  if (!data.businessName?.trim()) {
    errors.push('Business Name is required');
  }

  if (!data.contactInfo.telephone?.trim() && !data.contactInfo.mobile?.trim()) {
    errors.push('Telephone or Mobile Number is required');
  }

  if (!data.contactInfo.email?.trim()) {
    errors.push('Email Address is required');
  }

  // Check if at least one business activity is selected
  if (!data.mainOffice && !data.branchOffice && !data.adminOfficeOnly && !data.warehouse && !data.othersActivity) {
    errors.push('At least one Business Activity must be selected');
  }

  if (!data.locationSearch?.trim()) {
    errors.push('Location Plan or Sketch of the Location is required');
  }

  // Owner name validation
  if (!data.ownerName.surname?.trim()) {
    errors.push('Owner Surname is required');
  }

  if (!data.ownerName.givenName?.trim()) {
    errors.push('Owner Given Name is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helper function to get file URL from API
export function getFileUrl(filename: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/files/business-documents/${filename}`;
}
