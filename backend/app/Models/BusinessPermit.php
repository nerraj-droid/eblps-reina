<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessPermit extends Model
{
    protected $fillable = [
        'business_id',
        'permit_number',
        'permit_type',
        'application_date',
        'valid_from',
        'valid_until',
        'status',
        'total_fee',
        'penalty_fee',
        'total_amount',
        'remarks',
        'approved_by',
        'approved_at',
        'rejection_reason',
        'required_documents',
        'submitted_documents',
        // Additional fields from migration
        'owned',
        'property_description',
        'property_value',
        'tax_declaration_no',
        'monthly_rental',
        'lessor_surname',
        'lessor_given_name',
        'lessor_middle_name',
        'lessor_suffix',
        'tax_incentives',
        'location_latitude',
        'location_longitude',
        'location_search',
        'application_type',
        'payment_type'
    ];

    protected $casts = [
        'application_date' => 'date',
        'valid_from' => 'date',
        'valid_until' => 'date',
        'approved_at' => 'datetime',
        'total_fee' => 'decimal:2',
        'penalty_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'required_documents' => 'array',
        'submitted_documents' => 'array',
        'owned' => 'boolean',
        'property_value' => 'decimal:2',
        'monthly_rental' => 'decimal:2',
        'tax_incentives' => 'boolean',
        'location_latitude' => 'decimal:8',
        'location_longitude' => 'decimal:8'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function businessDocuments(): HasMany
    {
        return $this->hasMany(BusinessDocument::class);
    }

    public function generatePermitNumber(): string
    {
        $year = date('Y');
        $month = date('m');
        $count = static::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->count() + 1;

        return 'BP-' . $year . $month . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
    }
}
