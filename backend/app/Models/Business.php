<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Business extends Model
{
    protected $fillable = [
        'business_owner_id',
        'business_type_id',
        'business_name',
        'business_name_arabic',
        'business_description',
        'business_activity',
        'business_address',
        'business_barangay',
        'business_city',
        'business_province',
        'business_postal_code',
        'business_phone',
        'business_email',
        'business_website',
        'capital_investment',
        'number_of_employees',
        'business_start_date',
        'business_status',
        'dti_registration_number',
        'sec_registration_number',
        'cooperative_registration_number'
    ];

    protected $casts = [
        'capital_investment' => 'decimal:2',
        'business_start_date' => 'date'
    ];

    public function businessOwner(): BelongsTo
    {
        return $this->belongsTo(BusinessOwner::class);
    }

    public function businessType(): BelongsTo
    {
        return $this->belongsTo(BusinessType::class);
    }

    public function businessPermits(): HasMany
    {
        return $this->hasMany(BusinessPermit::class);
    }
}
