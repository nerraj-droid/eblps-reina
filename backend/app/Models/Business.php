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
        'cooperative_registration_number',
        // Additional fields from migration
        'house_number',
        'building_name',
        'lot_number',
        'block_number',
        'street',
        'subdivision',
        'male_employees',
        'female_employees',
        'residing_employees',
        'van_count',
        'truck_count',
        'motorcycle_count',
        'business_area',
        'business_hours',
        'business_days',
        'main_office',
        'branch_office',
        'admin_office_only',
        'warehouse',
        'others_activity',
        'trade_name'
    ];

    protected $casts = [
        'capital_investment' => 'decimal:2',
        'business_start_date' => 'date',
        'business_area' => 'decimal:2',
        'main_office' => 'boolean',
        'branch_office' => 'boolean',
        'admin_office_only' => 'boolean',
        'warehouse' => 'boolean',
        'others_activity' => 'boolean'
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

    public function businessLines(): HasMany
    {
        return $this->hasMany(BusinessLine::class);
    }
}
