@extends('layouts.app')

@section('title', 'Business Permit Applications')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h2><i class="fas fa-building me-2"></i>Business Permit Applications</h2>
    <a href="{{ route('business-permits.create') }}" class="btn btn-primary">
        <i class="fas fa-plus me-1"></i>New Application
    </a>
</div>

<div class="card">
    <div class="card-body">
        @if($businessPermits->count() > 0)
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Permit Number</th>
                            <th>Business Name</th>
                            <th>Owner</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Application Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($businessPermits as $permit)
                        <tr>
                            <td>
                                <strong>{{ $permit->permit_number }}</strong>
                            </td>
                            <td>{{ $permit->business->business_name }}</td>
                            <td>{{ $permit->business->businessOwner->full_name }}</td>
                            <td>{{ $permit->business->businessType->name }}</td>
                            <td>
                                @php
                                    $statusClasses = [
                                        'pending' => 'bg-warning text-dark',
                                        'approved' => 'bg-success',
                                        'rejected' => 'bg-danger',
                                        'expired' => 'bg-secondary',
                                        'cancelled' => 'bg-dark'
                                    ];
                                @endphp
                                <span class="badge {{ $statusClasses[$permit->status] ?? 'bg-secondary' }}">
                                    {{ ucfirst($permit->status) }}
                                </span>
                            </td>
                            <td>{{ $permit->application_date->format('M d, Y') }}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('business-permits.show', $permit) }}" class="btn btn-sm btn-outline-primary">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="{{ route('business-permits.edit', $permit) }}" class="btn btn-sm btn-outline-secondary">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    @if($permit->status === 'pending')
                                        <form action="{{ route('business-permits.destroy', $permit) }}" method="POST" class="d-inline" onsubmit="return confirm('Are you sure you want to delete this application?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-sm btn-outline-danger">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    @endif
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            
            <div class="d-flex justify-content-center">
                {{ $businessPermits->links() }}
            </div>
        @else
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No business permit applications found</h5>
                <p class="text-muted">Start by creating a new business permit application.</p>
                <a href="{{ route('business-permits.create') }}" class="btn btn-primary">
                    <i class="fas fa-plus me-1"></i>Create New Application
                </a>
            </div>
        @endif
    </div>
</div>
@endsection
