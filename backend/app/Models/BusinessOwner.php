<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessOwner extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'email',
        'phone',
        'birth_date',
        'gender',
        'nationality',
        'civil_status',
        'address',
        'barangay',
        'city',
        'province',
        'postal_code',
        'tin_number',
        'sss_number',
        'philhealth_number',
        'pagibig_number'
    ];

    protected $casts = [
        'birth_date' => 'date'
    ];

    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
