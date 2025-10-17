<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessDocument extends Model
{
    protected $fillable = [
        'business_permit_id',
        'document_type',
        'document_name',
        'file_path',
        'file_size',
        'mime_type',
        'is_required',
        'is_uploaded',
        'description'
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'is_uploaded' => 'boolean'
    ];

    public function businessPermit(): BelongsTo
    {
        return $this->belongsTo(BusinessPermit::class);
    }

    // Helper method to get file URL
    public function getFileUrlAttribute(): string
    {
        return asset('storage/' . $this->file_path);
    }

    // Helper method to get human readable file size
    public function getHumanReadableFileSizeAttribute(): string
    {
        $bytes = (int) $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }
}
