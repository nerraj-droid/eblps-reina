<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'fee',
        'is_active'
    ];

    protected $casts = [
        'fee' => 'decimal:2',
        'is_active' => 'boolean'
    ];

    public function businesses(): HasMany
    {
        return $this->hasMany(Business::class);
    }
}
