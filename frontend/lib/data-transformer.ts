// Data transformation utilities to convert frontend form data to backend API format

// Utility function to format dates in MM/DD/YYYY HH:MM:SS format
export function formatDateTime(dateString: string): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(',', '');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Backend API response interfaces
export interface BackendBusinessPermit {
  id: number;
  business_id: number;
  permit_number: string;
  permit_type: string;
  application_date: string;
  valid_from: string;
  valid_until: string;
  status: string;
  total_fee: string;
  penalty_fee: string;
  total_amount: string;
  remarks: string;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  required_documents: string[];
  submitted_documents: string[];
  created_at: string;
  updated_at: string;
  business: {
    id: number;
    business_owner_id: number;
    business_type_id: number;
    business_name: string;
    business_name_arabic: string | null;
    business_description: string;
    business_activity: string;
    business_address: string;
    business_barangay: string;
    business_city: string;
    business_province: string;
    business_postal_code: string;
    business_phone: string;
    business_email: string;
    business_website: string | null;
    capital_investment: string;
    number_of_employees: number;
    business_start_date: string;
    business_status: string;
    dti_registration_number: string | null;
    sec_registration_number: string | null;
    cooperative_registration_number: string | null;
    created_at: string;
    updated_at: string;
    business_owner: {
      id: number;
      first_name: string;
      last_name: string;
      middle_name: string | null;
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
      tin_number: string | null;
      sss_number: string | null;
      philhealth_number: string | null;
      pagibig_number: string | null;
      created_at: string;
      updated_at: string;
    };
    business_type: {
      id: number;
      name: string;
      description: string;
      fee: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  };
}

// Frontend interface for business permit list
export interface FrontendBusinessPermit {
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

export interface FrontendFormData {
  // Application Type
  type: string;
  payment: string;
  
  // Business Information
  businessType: string;
  businessName: string;
  dtiNumber: string;
  sssNumber: string;
  tinNumber: string;
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
  ownerDetails: {
    birthDate: string;
    gender: string;
    nationality: string;
    civilStatus: string;
    philhealthNumber: string;
    pagibigNumber: string;
  };
  
  // Business Operation
  businessActivity: string;
  businessDescription: string;
  capitalInvestment: string;
  numberOfEmployees: string;
  businessHours: string;
  businessDays: string;
  
  // Additional Information
  owned: boolean;
  lessorName: {
    surname: string;
    givenName: string;
    middleName: string;
    suffix: string;
  };
  taxIncentives: boolean;
  businessActivityType: string;
  otherActivity: string;
}

export interface BackendApiData {
  owner: {
    first_name: string;
    last_name: string;
    middle_name: string;
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
  };
  business: {
    business_name: string;
    business_name_arabic: string;
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
  };
  permit: {
    permit_type: string;
    valid_from: string;
    valid_until: string;
    remarks: string;
  };
}

export function transformFrontendToBackend(frontendData: FrontendFormData): BackendApiData {
  // Helper function to build full address
  const buildAddress = (address: FrontendFormData['businessAddress']): string => {
    const parts = [
      address.houseNumber,
      address.buildingName,
      address.lotNumber,
      address.blockNumber,
      address.street,
      address.subdivision
    ].filter(Boolean);
    return parts.join(', ');
  };

  // Helper function to build full name
  const buildFullName = (name: FrontendFormData['ownerName']): string => {
    const parts = [name.givenName, name.middleName, name.surname, name.suffix].filter(Boolean);
    return parts.join(' ');
  };

  return {
    owner: {
      first_name: frontendData.ownerName.givenName,
      last_name: frontendData.ownerName.surname,
      middle_name: frontendData.ownerName.middleName,
      email: frontendData.contactInfo.email,
      phone: frontendData.contactInfo.mobile || frontendData.contactInfo.telephone,
      birth_date: frontendData.ownerDetails.birthDate,
      gender: frontendData.ownerDetails.gender,
      nationality: frontendData.ownerDetails.nationality,
      civil_status: frontendData.ownerDetails.civilStatus,
      address: buildAddress(frontendData.businessAddress),
      barangay: frontendData.businessAddress.barangay,
      city: frontendData.businessAddress.city,
      province: frontendData.businessAddress.province,
      postal_code: frontendData.businessAddress.zipCode,
      tin_number: frontendData.tinNumber,
      sss_number: frontendData.sssNumber,
      philhealth_number: frontendData.ownerDetails.philhealthNumber,
      pagibig_number: frontendData.ownerDetails.pagibigNumber,
    },
    business: {
      business_name: frontendData.businessName,
      business_name_arabic: '', // This field is missing in frontend - needs to be added
      business_description: frontendData.businessDescription,
      business_activity: frontendData.businessActivity,
      business_address: buildAddress(frontendData.businessAddress),
      business_barangay: frontendData.businessAddress.barangay,
      business_city: frontendData.businessAddress.city,
      business_province: frontendData.businessAddress.province,
      business_postal_code: frontendData.businessAddress.zipCode,
      business_phone: frontendData.contactInfo.telephone,
      business_email: frontendData.contactInfo.email,
      business_website: frontendData.contactInfo.website,
      capital_investment: parseFloat(frontendData.capitalInvestment) || 0,
      number_of_employees: parseInt(frontendData.numberOfEmployees) || 1,
      business_start_date: new Date().toISOString().split('T')[0], // Default to today
      business_type_id: frontendData.businessType,
      dti_registration_number: frontendData.dtiNumber,
      sec_registration_number: '', // This field is missing in frontend - needs to be added
      cooperative_registration_number: '', // This field is missing in frontend - needs to be added
    },
    permit: {
      permit_type: frontendData.type || 'new',
      valid_from: new Date().toISOString().split('T')[0],
      valid_until: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      remarks: frontendData.otherActivity || '',
    }
  };
}

// Validation function to check if required fields are present
export function validateFrontendData(data: FrontendFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required owner fields
  if (!data.ownerName.givenName) errors.push('Owner first name is required');
  if (!data.ownerName.surname) errors.push('Owner last name is required');
  if (!data.contactInfo.email) errors.push('Email is required');
  if (!data.contactInfo.mobile && !data.contactInfo.telephone) errors.push('Phone number is required');
  if (!data.ownerDetails.birthDate) errors.push('Birth date is required');
  if (!data.ownerDetails.gender) errors.push('Gender is required');
  if (!data.ownerDetails.nationality) errors.push('Nationality is required');
  if (!data.ownerDetails.civilStatus) errors.push('Civil status is required');

  // Required business fields
  if (!data.businessName) errors.push('Business name is required');
  if (!data.businessDescription) errors.push('Business description is required');
  if (!data.businessActivity) errors.push('Business activity is required');
  if (!data.businessAddress.barangay) errors.push('Barangay is required');
  if (!data.businessAddress.city) errors.push('City is required');
  if (!data.businessAddress.province) errors.push('Province is required');
  if (!data.businessType) errors.push('Business type is required');

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Transform backend API response to frontend format
export function transformBackendToFrontend(backendPermit: BackendBusinessPermit): FrontendBusinessPermit {
  const owner = backendPermit.business.business_owner;
  const business = backendPermit.business;
  const businessType = backendPermit.business.business_type;
  
  // Build full owner name
  const ownerName = [owner.first_name, owner.middle_name, owner.last_name]
    .filter(Boolean)
    .join(' ');
  
  // Build full address
  const address = [business.business_address, business.business_barangay, business.business_city, business.business_province]
    .filter(Boolean)
    .join(', ');
  
  // Determine payment status based on permit status
  const getPaymentStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'Paid';
      case 'pending':
        return 'Unpaid';
      case 'rejected':
        return 'Unpaid';
      case 'expired':
        return 'Paid';
      case 'cancelled':
        return 'Unpaid';
      default:
        return 'Unpaid';
    }
  };
  
  // Determine status owner
  const statusOwner = backendPermit.approved_by || ownerName;
  
  return {
    id: backendPermit.id.toString(),
    business_id_no: backendPermit.permit_number,
    business_name: business.business_name,
    owner_name: ownerName,
    mobile_no: owner.phone,
    email_address: owner.email,
    latest_status: backendPermit.status.charAt(0).toUpperCase() + backendPermit.status.slice(1),
    latest_status_date: backendPermit.application_date,
    status_owner: statusOwner,
    business_type: businessType.name,
    application_date: backendPermit.application_date,
    expiry_date: backendPermit.valid_until,
    permit_number: backendPermit.permit_number,
    address: address,
    total_fee: parseFloat(backendPermit.total_amount),
    payment_status: getPaymentStatus(backendPermit.status)
  };
}

// Transform array of backend permits to frontend format
export function transformBackendArrayToFrontend(backendPermits: BackendBusinessPermit[]): FrontendBusinessPermit[] {
  return backendPermits.map(transformBackendToFrontend);
}
