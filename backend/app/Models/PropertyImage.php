<?php
// app/Models/PropertyImage.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'image_path',
        'image_url',
        'alt_text',
        'room_type',
        'is_main',
        'order_index',
        'file_size',
        'dimensions',
    ];

    protected $casts = [
        'is_main' => 'boolean',
        'order_index' => 'integer',
        'file_size' => 'integer',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function getImageUrlAttribute(): string
    {
        return $this->attributes['image_url'] ?? asset('storage/' . $this->image_path);
    }

    public function scopeMain($query)
    {
        return $query->where('is_main', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index');
    }
}