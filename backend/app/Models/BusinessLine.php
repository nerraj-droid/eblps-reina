<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessLine extends Model
{
    protected $fillable = [
        'business_id',
        'line_of_business',
        'psic_code'
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
}
