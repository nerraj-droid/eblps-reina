@extends('layouts.app')

@section('title', 'Business Permit Application Details')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="fas fa-file-alt me-2"></i>Business Permit Application Details</h2>
    <div>
        <a href="{{ route('business-permits.edit', $businessPermit) }}" class="btn btn-outline-primary me-2">
            <i class="fas fa-edit me-1"></i>Edit
        </a>
        <a href="{{ route('business-permits.index') }}" class="btn btn-outline-secondary">
            <i class="fas fa-arrow-left me-1"></i>Back to Applications
        </a>
    </div>
</div>

<div class="row">
    <div class="col-md-8">
        <!-- Business Owner Information -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-user me-2"></i>Business Owner Information</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Name:</strong> {{ $businessPermit->business->businessOwner->full_name }}</p>
                        <p><strong>Email:</strong> {{ $businessPermit->business->businessOwner->email }}</p>
                        <p><strong>Phone:</strong> {{ $businessPermit->business->businessOwner->phone }}</p>
                        <p><strong>Birth Date:</strong> {{ $businessPermit->business->businessOwner->birth_date->format('M d, Y') }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Gender:</strong> {{ ucfirst($businessPermit->business->businessOwner->gender) }}</p>
                        <p><strong>Nationality:</strong> {{ $businessPermit->business->businessOwner->nationality }}</p>
                        <p><strong>Civil Status:</strong> {{ ucfirst($businessPermit->business->businessOwner->civil_status) }}</p>
                        <p><strong>Address:</strong> {{ $businessPermit->business->businessOwner->address }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Business Information -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-building me-2"></i>Business Information</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <p><strong>Business Name:</strong> {{ $businessPermit->business->business_name }}</p>
                        <p><strong>Business Type:</strong> {{ $businessPermit->business->businessType->name }}</p>
                        <p><strong>Business Activity:</strong> {{ $businessPermit->business->business_activity }}</p>
                        <p><strong>Capital Investment:</strong> ₱{{ number_format($businessPermit->business->capital_investment, 2) }}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Number of Employees:</strong> {{ $businessPermit->business->number_of_employees }}</p>
                        <p><strong>Start Date:</strong> {{ $businessPermit->business->business_start_date->format('M d, Y') }}</p>
                        <p><strong>Business Phone:</strong> {{ $businessPermit->business->business_phone }}</p>
                        <p><strong>Business Email:</strong> {{ $businessPermit->business->business_email }}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <p><strong>Business Description:</strong></p>
                        <p>{{ $businessPermit->business->business_description }}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <p><strong>Business Address:</strong></p>
                        <p>{{ $businessPermit->business->business_address }}, {{ $businessPermit->business->business_barangay }}, {{ $businessPermit->business->business_city }}, {{ $businessPermit->business->business_province }} {{ $businessPermit->business->business_postal_code }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <!-- Permit Status -->
        <div class="card mb-4">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Permit Status</h5>
            </div>
            <div class="card-body">
                @php
                    $statusClasses = [
                        'pending' => 'bg-warning text-dark',
                        'approved' => 'bg-success',
                        'rejected' => 'bg-danger',
                        'expired' => 'bg-secondary',
                        'cancelled' => 'bg-dark'
                    ];
                @endphp
                <div class="text-center mb-3">
                    <span class="badge {{ $statusClasses[$businessPermit->status] ?? 'bg-secondary' }} fs-6">
                        {{ ucfirst($businessPermit->status) }}
                    </span>
                </div>
                
                <p><strong>Permit Number:</strong> {{ $businessPermit->permit_number }}</p>
                <p><strong>Application Date:</strong> {{ $businessPermit->application_date->format('M d, Y') }}</p>
                <p><strong>Valid From:</strong> {{ $businessPermit->valid_from->format('M d, Y') }}</p>
                <p><strong>Valid Until:</strong> {{ $businessPermit->valid_until->format('M d, Y') }}</p>
                <p><strong>Total Fee:</strong> ₱{{ number_format($businessPermit->total_fee, 2) }}</p>
                
                @if($businessPermit->penalty_fee > 0)
                    <p><strong>Penalty Fee:</strong> ₱{{ number_format($businessPermit->penalty_fee, 2) }}</p>
                @endif
                
                <p><strong>Total Amount:</strong> ₱{{ number_format($businessPermit->total_amount, 2) }}</p>
                
                @if($businessPermit->approved_by)
                    <p><strong>Approved By:</strong> {{ $businessPermit->approved_by }}</p>
                    <p><strong>Approved At:</strong> {{ $businessPermit->approved_at->format('M d, Y H:i') }}</p>
                @endif
                
                @if($businessPermit->rejection_reason)
                    <p><strong>Rejection Reason:</strong></p>
                    <p class="text-danger">{{ $businessPermit->rejection_reason }}</p>
                @endif
                
                @if($businessPermit->remarks)
                    <p><strong>Remarks:</strong></p>
                    <p>{{ $businessPermit->remarks }}</p>
                @endif
            </div>
        </div>

        <!-- Actions -->
        @if($businessPermit->status === 'pending')
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-cogs me-2"></i>Actions</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('business-permits.approve', $businessPermit) }}" method="POST" class="mb-3">
                    @csrf
                    <div class="mb-3">
                        <label for="approved_by" class="form-label">Approved By</label>
                        <input type="text" class="form-control" id="approved_by" name="approved_by" required>
                    </div>
                    <div class="mb-3">
                        <label for="remarks" class="form-label">Remarks</label>
                        <textarea class="form-control" id="remarks" name="remarks" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-success w-100">
                        <i class="fas fa-check me-1"></i>Approve
                    </button>
                </form>
                
                <form action="{{ route('business-permits.reject', $businessPermit) }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="rejection_reason" class="form-label">Rejection Reason</label>
                        <textarea class="form-control" id="rejection_reason" name="rejection_reason" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-danger w-100">
                        <i class="fas fa-times me-1"></i>Reject
                    </button>
                </form>
            </div>
        </div>
        @endif
    </div>
</div>
@endsection
