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
            'owner.email' => 'required|email|unique:business_owners,email',
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

            // Business Information
            'business.business_name' => 'required|string|max:255',
            'business.business_name_arabic' => 'nullable|string|max:255',
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

            // Permit Information
            'permit.permit_type' => 'required|in:new,renewal,amendment',
            'permit.valid_from' => 'required|date|after_or_equal:today',
            'permit.valid_until' => 'required|date|after:permit.valid_from',
            'permit.remarks' => 'nullable|string|max:1000',
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
