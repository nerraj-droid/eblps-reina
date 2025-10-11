@extends('layouts.app')

@section('title', 'New Business Permit Application')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="fas fa-plus me-2"></i>New Business Permit Application</h2>
    <a href="{{ route('business-permits.index') }}" class="btn btn-outline-secondary">
        <i class="fas fa-arrow-left me-1"></i>Back to Applications
    </a>
</div>

<form action="{{ route('business-permits.store') }}" method="POST" id="businessPermitForm">
    @csrf
    
    <!-- Business Owner Information -->
    <div class="form-section">
        <h5><i class="fas fa-user me-2"></i>Business Owner Information</h5>
        <div class="row">
            <div class="col-md-4">
                <label for="owner_first_name" class="form-label">First Name *</label>
                <input type="text" class="form-control @error('owner.first_name') is-invalid @enderror" 
                       id="owner_first_name" name="owner[first_name]" value="{{ old('owner.first_name') }}" required>
                @error('owner.first_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="owner_last_name" class="form-label">Last Name *</label>
                <input type="text" class="form-control @error('owner.last_name') is-invalid @enderror" 
                       id="owner_last_name" name="owner[last_name]" value="{{ old('owner.last_name') }}" required>
                @error('owner.last_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="owner_middle_name" class="form-label">Middle Name</label>
                <input type="text" class="form-control @error('owner.middle_name') is-invalid @enderror" 
                       id="owner_middle_name" name="owner[middle_name]" value="{{ old('owner.middle_name') }}">
                @error('owner.middle_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-6">
                <label for="owner_email" class="form-label">Email Address *</label>
                <input type="email" class="form-control @error('owner.email') is-invalid @enderror" 
                       id="owner_email" name="owner[email]" value="{{ old('owner.email') }}" required>
                @error('owner.email')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6">
                <label for="owner_phone" class="form-label">Phone Number *</label>
                <input type="tel" class="form-control @error('owner.phone') is-invalid @enderror" 
                       id="owner_phone" name="owner[phone]" value="{{ old('owner.phone') }}" required>
                @error('owner.phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-3">
                <label for="owner_birth_date" class="form-label">Birth Date *</label>
                <input type="date" class="form-control @error('owner.birth_date') is-invalid @enderror" 
                       id="owner_birth_date" name="owner[birth_date]" value="{{ old('owner.birth_date') }}" required>
                @error('owner.birth_date')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_gender" class="form-label">Gender *</label>
                <select class="form-select @error('owner.gender') is-invalid @enderror" 
                        id="owner_gender" name="owner[gender]" required>
                    <option value="">Select Gender</option>
                    <option value="male" {{ old('owner.gender') == 'male' ? 'selected' : '' }}>Male</option>
                    <option value="female" {{ old('owner.gender') == 'female' ? 'selected' : '' }}>Female</option>
                    <option value="other" {{ old('owner.gender') == 'other' ? 'selected' : '' }}>Other</option>
                </select>
                @error('owner.gender')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_nationality" class="form-label">Nationality *</label>
                <input type="text" class="form-control @error('owner.nationality') is-invalid @enderror" 
                       id="owner_nationality" name="owner[nationality]" value="{{ old('owner.nationality', 'Filipino') }}" required>
                @error('owner.nationality')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_civil_status" class="form-label">Civil Status *</label>
                <select class="form-select @error('owner.civil_status') is-invalid @enderror" 
                        id="owner_civil_status" name="owner[civil_status]" required>
                    <option value="">Select Civil Status</option>
                    <option value="single" {{ old('owner.civil_status') == 'single' ? 'selected' : '' }}>Single</option>
                    <option value="married" {{ old('owner.civil_status') == 'married' ? 'selected' : '' }}>Married</option>
                    <option value="widowed" {{ old('owner.civil_status') == 'widowed' ? 'selected' : '' }}>Widowed</option>
                    <option value="divorced" {{ old('owner.civil_status') == 'divorced' ? 'selected' : '' }}>Divorced</option>
                </select>
                @error('owner.civil_status')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-12">
                <label for="owner_address" class="form-label">Complete Address *</label>
                <textarea class="form-control @error('owner.address') is-invalid @enderror" 
                          id="owner_address" name="owner[address]" rows="2" required>{{ old('owner.address') }}</textarea>
                @error('owner.address')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-3">
                <label for="owner_barangay" class="form-label">Barangay *</label>
                <input type="text" class="form-control @error('owner.barangay') is-invalid @enderror" 
                       id="owner_barangay" name="owner[barangay]" value="{{ old('owner.barangay') }}" required>
                @error('owner.barangay')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_city" class="form-label">City *</label>
                <input type="text" class="form-control @error('owner.city') is-invalid @enderror" 
                       id="owner_city" name="owner[city]" value="{{ old('owner.city') }}" required>
                @error('owner.city')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_province" class="form-label">Province *</label>
                <input type="text" class="form-control @error('owner.province') is-invalid @enderror" 
                       id="owner_province" name="owner[province]" value="{{ old('owner.province') }}" required>
                @error('owner.province')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="owner_postal_code" class="form-label">Postal Code *</label>
                <input type="text" class="form-control @error('owner.postal_code') is-invalid @enderror" 
                       id="owner_postal_code" name="owner[postal_code]" value="{{ old('owner.postal_code') }}" required>
                @error('owner.postal_code')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>

    <!-- Business Information -->
    <div class="form-section">
        <h5><i class="fas fa-building me-2"></i>Business Information</h5>
        <div class="row">
            <div class="col-md-8">
                <label for="business_name" class="form-label">Business Name *</label>
                <input type="text" class="form-control @error('business.business_name') is-invalid @enderror" 
                       id="business_name" name="business[business_name]" value="{{ old('business.business_name') }}" required>
                @error('business.business_name')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="business_type_id" class="form-label">Business Type *</label>
                <select class="form-select @error('business.business_type_id') is-invalid @enderror" 
                        id="business_type_id" name="business[business_type_id]" required>
                    <option value="">Select Business Type</option>
                    @foreach($businessTypes as $type)
                        <option value="{{ $type->id }}" {{ old('business.business_type_id') == $type->id ? 'selected' : '' }}>
                            {{ $type->name }} - ₱{{ number_format($type->fee, 2) }}
                        </option>
                    @endforeach
                </select>
                @error('business.business_type_id')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-6">
                <label for="business_activity" class="form-label">Business Activity *</label>
                <input type="text" class="form-control @error('business.business_activity') is-invalid @enderror" 
                       id="business_activity" name="business[business_activity]" value="{{ old('business.business_activity') }}" required>
                @error('business.business_activity')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6">
                <label for="business_start_date" class="form-label">Business Start Date *</label>
                <input type="date" class="form-control @error('business.business_start_date') is-invalid @enderror" 
                       id="business_start_date" name="business[business_start_date]" value="{{ old('business.business_start_date') }}" required>
                @error('business.business_start_date')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-12">
                <label for="business_description" class="form-label">Business Description *</label>
                <textarea class="form-control @error('business.business_description') is-invalid @enderror" 
                          id="business_description" name="business[business_description]" rows="3" required>{{ old('business.business_description') }}</textarea>
                @error('business.business_description')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-12">
                <label for="business_address" class="form-label">Business Address *</label>
                <textarea class="form-control @error('business.business_address') is-invalid @enderror" 
                          id="business_address" name="business[business_address]" rows="2" required>{{ old('business.business_address') }}</textarea>
                @error('business.business_address')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-3">
                <label for="business_barangay" class="form-label">Barangay *</label>
                <input type="text" class="form-control @error('business.business_barangay') is-invalid @enderror" 
                       id="business_barangay" name="business[business_barangay]" value="{{ old('business.business_barangay') }}" required>
                @error('business.business_barangay')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="business_city" class="form-label">City *</label>
                <input type="text" class="form-control @error('business.business_city') is-invalid @enderror" 
                       id="business_city" name="business[business_city]" value="{{ old('business.business_city') }}" required>
                @error('business.business_city')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="business_province" class="form-label">Province *</label>
                <input type="text" class="form-control @error('business.business_province') is-invalid @enderror" 
                       id="business_province" name="business[business_province]" value="{{ old('business.business_province') }}" required>
                @error('business.business_province')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-3">
                <label for="business_postal_code" class="form-label">Postal Code *</label>
                <input type="text" class="form-control @error('business.business_postal_code') is-invalid @enderror" 
                       id="business_postal_code" name="business[business_postal_code]" value="{{ old('business.business_postal_code') }}" required>
                @error('business.business_postal_code')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-4">
                <label for="business_phone" class="form-label">Business Phone *</label>
                <input type="tel" class="form-control @error('business.business_phone') is-invalid @enderror" 
                       id="business_phone" name="business[business_phone]" value="{{ old('business.business_phone') }}" required>
                @error('business.business_phone')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="business_email" class="form-label">Business Email *</label>
                <input type="email" class="form-control @error('business.business_email') is-invalid @enderror" 
                       id="business_email" name="business[business_email]" value="{{ old('business.business_email') }}" required>
                @error('business.business_email')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="business_website" class="form-label">Business Website</label>
                <input type="url" class="form-control @error('business.business_website') is-invalid @enderror" 
                       id="business_website" name="business[business_website]" value="{{ old('business.business_website') }}">
                @error('business.business_website')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-4">
                <label for="capital_investment" class="form-label">Capital Investment (₱) *</label>
                <input type="number" step="0.01" class="form-control @error('business.capital_investment') is-invalid @enderror" 
                       id="capital_investment" name="business[capital_investment]" value="{{ old('business.capital_investment') }}" required>
                @error('business.capital_investment')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="number_of_employees" class="form-label">Number of Employees *</label>
                <input type="number" class="form-control @error('business.number_of_employees') is-invalid @enderror" 
                       id="number_of_employees" name="business[number_of_employees]" value="{{ old('business.number_of_employees') }}" required>
                @error('business.number_of_employees')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-4">
                <label for="permit_type" class="form-label">Permit Type *</label>
                <select class="form-select @error('permit.permit_type') is-invalid @enderror" 
                        id="permit_type" name="permit[permit_type]" required>
                    <option value="">Select Permit Type</option>
                    <option value="new" {{ old('permit.permit_type') == 'new' ? 'selected' : '' }}>New</option>
                    <option value="renewal" {{ old('permit.permit_type') == 'renewal' ? 'selected' : '' }}>Renewal</option>
                    <option value="amendment" {{ old('permit.permit_type') == 'amendment' ? 'selected' : '' }}>Amendment</option>
                </select>
                @error('permit.permit_type')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>

    <!-- Permit Information -->
    <div class="form-section">
        <h5><i class="fas fa-file-alt me-2"></i>Permit Information</h5>
        <div class="row">
            <div class="col-md-6">
                <label for="valid_from" class="form-label">Valid From *</label>
                <input type="date" class="form-control @error('permit.valid_from') is-invalid @enderror" 
                       id="valid_from" name="permit[valid_from]" value="{{ old('permit.valid_from') }}" required>
                @error('permit.valid_from')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
            <div class="col-md-6">
                <label for="valid_until" class="form-label">Valid Until *</label>
                <input type="date" class="form-control @error('permit.valid_until') is-invalid @enderror" 
                       id="valid_until" name="permit[valid_until]" value="{{ old('permit.valid_until') }}" required>
                @error('permit.valid_until')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-12">
                <label for="remarks" class="form-label">Remarks</label>
                <textarea class="form-control @error('permit.remarks') is-invalid @enderror" 
                          id="remarks" name="permit[remarks]" rows="3">{{ old('permit.remarks') }}</textarea>
                @error('permit.remarks')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-end gap-2">
        <a href="{{ route('business-permits.index') }}" class="btn btn-secondary">Cancel</a>
        <button type="submit" class="btn btn-primary">
            <i class="fas fa-save me-1"></i>Submit Application
        </button>
    </div>
</form>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const validFromInput = document.getElementById('valid_from');
    const validUntilInput = document.getElementById('valid_until');
    
    validFromInput.addEventListener('change', function() {
        if (this.value) {
            validUntilInput.min = this.value;
        }
    });
    
    validUntilInput.addEventListener('change', function() {
        if (this.value && validFromInput.value && this.value <= validFromInput.value) {
            this.setCustomValidity('Valid until date must be after valid from date');
        } else {
            this.setCustomValidity('');
        }
    });
});
</script>
@endsection
