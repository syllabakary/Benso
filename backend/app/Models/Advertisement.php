<?php
// app/Models/Advertisement.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'link_url',
        'position',
        'page_location',
        'target_audience',
        'target_locations',
        'is_active',
        'start_date',
        'end_date',
        'daily_budget',
        'total_budget',
        'impressions_count',
        'clicks_count',
        'conversion_count',
        'advertiser_name',
        'advertiser_contact',
    ];

    protected $casts = [
        'target_audience' => 'array',
        'target_locations' => 'array',
        'is_active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'daily_budget' => 'decimal:2',
        'total_budget' => 'decimal:2',
        'impressions_count' => 'integer',
        'clicks_count' => 'integer',
        'conversion_count' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByPosition($query, string $position)
    {
        return $query->where('position', $position);
    }

    public function scopeForPage($query, string $page)
    {
        return $query->where('page_location', $page);
    }

    public function scopeCurrent($query)
    {
        $now = now()->toDateString();
        return $query->where(function ($q) use ($now) {
            $q->whereNull('start_date')
              ->orWhere('start_date', '<=', $now);
        })->where(function ($q) use ($now) {
            $q->whereNull('end_date')
              ->orWhere('end_date', '>=', $now);
        });
    }

    public function incrementImpressions(): void
    {
        $this->increment('impressions_count');
    }

    public function incrementClicks(): void
    {
        $this->increment('clicks_count');
    }

    public function incrementConversions(): void
    {
        $this->increment('conversion_count');
    }

    public function getClickThroughRateAttribute(): float
    {
        return $this->impressions_count > 0 
            ? ($this->clicks_count / $this->impressions_count) * 100 
            : 0;
    }

    public function getConversionRateAttribute(): float
    {
        return $this->clicks_count > 0 
            ? ($this->conversion_count / $this->clicks_count) * 100 
            : 0;
    }
}
