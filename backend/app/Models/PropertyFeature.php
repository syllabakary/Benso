<?php
// app/Models/PropertyFeature.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'feature_type',
        'feature_name',
        'feature_value',
        'is_highlight',
    ];

    protected $casts = [
        'is_highlight' => 'boolean',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('feature_type', $type);
    }

    public function scopeHighlighted($query)
    {
        return $query->where('is_highlight', true);
    }
}
