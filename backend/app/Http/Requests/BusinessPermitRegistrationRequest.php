<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusinessPermitRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Business Owner Information
            'owner.first_name' => 'required|string|max:255',
            'owner.last_name' => 'required|string|max:255',
            'owner.middle_name' => 'nullable|string|max:255',
            'owner.suffix' => 'nullable|string|max:10',
            'owner.email' => 'required|email',
            'owner.phone' => 'required|string|max:20',
            'owner.birth_date' => 'required|date|before:today',
            'owner.gender' => 'required|in:male,female,other',
            'owner.nationality' => 'required|string|max:100',
            'owner.civil_status' => 'required|string|max:50',
            'owner.address' => 'required|string|max:500',
            'owner.barangay' => 'required|string|max:100',
            'owner.city' => 'required|string|max:100',
            'owner.province' => 'required|string|max:100',
            'owner.postal_code' => 'required|string|max:10',
            'owner.tin_number' => 'nullable|string|max:20',
            'owner.sss_number' => 'nullable|string|max:20',
            'owner.philhealth_number' => 'nullable|string|max:20',
            'owner.pagibig_number' => 'nullable|string|max:20',
            // Taxpayer address
            'owner.taxpayer_address' => 'nullable|string|max:500',
            'owner.taxpayer_barangay' => 'nullable|string|max:100',
            'owner.taxpayer_city' => 'nullable|string|max:100',
            'owner.taxpayer_province' => 'nullable|string|max:100',
            'owner.taxpayer_postal_code' => 'nullable|string|max:10',

            // Business Information
            'business.business_name' => 'required|string|max:255',
            'business.business_name_arabic' => 'nullable|string|max:255',
            'business.trade_name' => 'nullable|string|max:255',
            'business.business_description' => 'required|string|max:1000',
            'business.business_activity' => 'required|string|max:255',
            'business.business_address' => 'required|string|max:500',
            'business.business_barangay' => 'required|string|max:100',
            'business.business_city' => 'required|string|max:100',
            'business.business_province' => 'required|string|max:100',
            'business.business_postal_code' => 'required|string|max:10',
            'business.business_phone' => 'required|string|max:20',
            'business.business_email' => 'required|email|max:255',
            'business.business_website' => 'nullable|url|max:255',
            'business.capital_investment' => 'required|numeric|min:0',
            'business.number_of_employees' => 'required|integer|min:1',
            'business.business_start_date' => 'required|date',
            'business.business_type_id' => 'required|exists:business_types,id',
            'business.dti_registration_number' => 'nullable|string|max:50',
            'business.sec_registration_number' => 'nullable|string|max:50',
            'business.cooperative_registration_number' => 'nullable|string|max:50',
            // Business address details
            'business.house_number' => 'nullable|string|max:50',
            'business.building_name' => 'nullable|string|max:255',
            'business.lot_number' => 'nullable|string|max:50',
            'business.block_number' => 'nullable|string|max:50',
            'business.street' => 'nullable|string|max:255',
            'business.subdivision' => 'nullable|string|max:255',
            // Employee details
            'business.male_employees' => 'nullable|integer|min:0',
            'business.female_employees' => 'nullable|integer|min:0',
            'business.residing_employees' => 'nullable|integer|min:0',
            // Vehicle counts
            'business.van_count' => 'nullable|integer|min:0',
            'business.truck_count' => 'nullable|integer|min:0',
            'business.motorcycle_count' => 'nullable|integer|min:0',
            // Business area and hours
            'business.business_area' => 'nullable|numeric|min:0',
            'business.business_hours' => 'nullable|string|max:255',
            'business.business_days' => 'nullable|string|max:255',
            // Business activity flags
            'business.main_office' => 'nullable|boolean',
            'business.branch_office' => 'nullable|boolean',
            'business.admin_office_only' => 'nullable|boolean',
            'business.warehouse' => 'nullable|boolean',
            'business.others_activity' => 'nullable|boolean',

            // Permit Information
            'permit.permit_type' => 'required|in:new,renewal,amendment',
            'permit.valid_from' => 'required|date|after_or_equal:today',
            'permit.valid_until' => 'required|date|after:permit.valid_from',
            'permit.remarks' => 'nullable|string|max:1000',
            // Additional permit fields
            'permit.owned' => 'nullable|boolean',
            'permit.property_description' => 'nullable|string|max:1000',
            'permit.property_value' => 'nullable|numeric|min:0',
            'permit.tax_declaration_no' => 'nullable|string|max:100',
            'permit.monthly_rental' => 'nullable|numeric|min:0',
            'permit.lessor_surname' => 'nullable|string|max:255',
            'permit.lessor_given_name' => 'nullable|string|max:255',
            'permit.lessor_middle_name' => 'nullable|string|max:255',
            'permit.lessor_suffix' => 'nullable|string|max:10',
            'permit.tax_incentives' => 'nullable|boolean',
            'permit.location_latitude' => 'nullable|numeric|between:-90,90',
            'permit.location_longitude' => 'nullable|numeric|between:-180,180',
            'permit.location_search' => 'nullable|string|max:500',
            'permit.application_type' => 'nullable|string|max:50',
            'permit.payment_type' => 'nullable|string|max:50',
            // Business lines (optional array)
            'business_lines' => 'nullable|array',
            'business_lines.*.line_of_business' => 'nullable|string|max:255',
            'business_lines.*.psic_code' => 'nullable|string|max:20',
            // Document uploads (optional array)
            'documents' => 'nullable|array',
            'documents.*.document_type' => 'required|string|max:100',
            'documents.*.file' => 'nullable|file|mimes:pdf,jpg,jpeg,png,doc,docx|max:10240', // 10MB max
            'documents.*.description' => 'nullable|string|max:500',
        ];
    }

    public function messages(): array
    {
        return [
            'owner.email.unique' => 'This email address is already registered.',
            'business.business_type_id.exists' => 'The selected business type is invalid.',
            'permit.valid_until.after' => 'The valid until date must be after the valid from date.',
        ];
    }
}
