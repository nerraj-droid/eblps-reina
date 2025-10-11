# Frontend-Backend Field Mapping

## Overview
This document shows how frontend form fields map to backend API fields for the Business Permit Application.

## Field Mapping

### Owner Information
| Frontend Field | Backend Field | Required | Notes |
|---|---|---|---|
| `ownerName.givenName` | `owner.first_name` | ✅ | Owner's first name |
| `ownerName.surname` | `owner.last_name` | ✅ | Owner's last name |
| `ownerName.middleName` | `owner.middle_name` | ❌ | Owner's middle name |
| `ownerName.suffix` | - | ❌ | Not used in backend |
| `ownerDetails.birthDate` | `owner.birth_date` | ✅ | Owner's birth date |
| `ownerDetails.gender` | `owner.gender` | ✅ | Owner's gender |
| `ownerDetails.nationality` | `owner.nationality` | ✅ | Owner's nationality |
| `ownerDetails.civilStatus` | `owner.civil_status` | ✅ | Owner's civil status |
| `contactInfo.email` | `owner.email` | ✅ | Owner's email |
| `contactInfo.mobile` | `owner.phone` | ✅ | Owner's phone (mobile preferred) |
| `contactInfo.telephone` | `owner.phone` | ✅ | Fallback if mobile not provided |
| `tinNumber` | `owner.tin_number` | ❌ | TIN number |
| `sssNumber` | `owner.sss_number` | ❌ | SSS number |
| `ownerDetails.philhealthNumber` | `owner.philhealth_number` | ❌ | PhilHealth number |
| `ownerDetails.pagibigNumber` | `owner.pagibig_number` | ❌ | Pag-IBIG number |
| `businessAddress.*` | `owner.address` | ✅ | Combined address string |
| `businessAddress.barangay` | `owner.barangay` | ✅ | Barangay |
| `businessAddress.city` | `owner.city` | ✅ | City |
| `businessAddress.province` | `owner.province` | ✅ | Province |
| `businessAddress.zipCode` | `owner.postal_code` | ✅ | Postal code |

### Business Information
| Frontend Field | Backend Field | Required | Notes |
|---|---|---|---|
| `businessName` | `business.business_name` | ✅ | Business name |
| - | `business.business_name_arabic` | ❌ | Arabic business name (not in frontend) |
| `businessDescription` | `business.business_description` | ✅ | Business description |
| `businessActivity` | `business.business_activity` | ✅ | Business activity |
| `businessAddress.*` | `business.business_address` | ✅ | Combined address string |
| `businessAddress.barangay` | `business.business_barangay` | ✅ | Business barangay |
| `businessAddress.city` | `business.business_city` | ✅ | Business city |
| `businessAddress.province` | `business.business_province` | ✅ | Business province |
| `businessAddress.zipCode` | `business.business_postal_code` | ✅ | Business postal code |
| `contactInfo.telephone` | `business.business_phone` | ✅ | Business phone |
| `contactInfo.email` | `business.business_email` | ✅ | Business email |
| `contactInfo.website` | `business.business_website` | ❌ | Business website |
| `capitalInvestment` | `business.capital_investment` | ✅ | Capital investment amount |
| `numberOfEmployees` | `business.number_of_employees` | ✅ | Number of employees |
| - | `business.business_start_date` | ✅ | Auto-generated (today's date) |
| `businessType` | `business.business_type_id` | ✅ | Business type ID |
| `dtiNumber` | `business.dti_registration_number` | ❌ | DTI registration number |
| - | `business.sec_registration_number` | ❌ | SEC registration (not in frontend) |
| - | `business.cooperative_registration_number` | ❌ | Cooperative registration (not in frontend) |

### Permit Information
| Frontend Field | Backend Field | Required | Notes |
|---|---|---|---|
| `type` | `permit.permit_type` | ✅ | Permit type (new/renewal/amendment) |
| - | `permit.valid_from` | ✅ | Auto-generated (today's date) |
| - | `permit.valid_until` | ✅ | Auto-generated (1 year from today) |
| `otherActivity` | `permit.remarks` | ❌ | Additional remarks |

## Missing Fields in Frontend
The following backend fields are not currently in the frontend form and need to be added:

### Owner Details
- Birth Date (date picker)
- Gender (select: male/female/other)
- Nationality (text input)
- Civil Status (select: single/married/widowed/divorced)
- PhilHealth Number (text input)
- Pag-IBIG Number (text input)

### Business Details
- Arabic Business Name (text input)
- Business Start Date (date picker)
- SEC Registration Number (text input)
- Cooperative Registration Number (text input)

## Data Transformation
The `transformFrontendToBackend()` function in `frontend/lib/data-transformer.ts` handles the conversion from frontend form structure to backend API format.

## Validation
The `validateFrontendData()` function ensures all required fields are filled before submission.
