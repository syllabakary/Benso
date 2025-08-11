<?php
// app/Models/Property.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'agent_id',
        'reference',
        'title',
        'description',
        'type',
        'status',
        'transaction_type',
        'price',
        'charges',
        'deposit',
        'agency_fees',
        'surface',
        'rooms',
        'bedrooms',
        'bathrooms',
        'floor',
        'total_floors',
        'year_built',
        'last_renovation',
        'condition_state',
        'energy_class',
        'heating_type',
        'address',
        'city',
        'district',
        'postal_code',
        'country',
        'latitude',
        'longitude',
        'has_balcony',
        'has_terrace',
        'has_garden',
        'has_pool',
        'has_garage',
        'has_parking',
        'has_elevator',
        'has_cellar',
        'has_air_conditioning',
        'is_furnished',
        'availability_date',
        'is_featured',
        'is_sponsored',
        'is_exclusive',
        'views_count',
        'favorites_count',
        'contacts_count',
        'visits_count',
        'is_active',
        'published_at',
        'expires_at',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'charges' => 'decimal:2',
        'deposit' => 'decimal:2',
        'agency_fees' => 'decimal:2',
        'surface' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'has_balcony' => 'boolean',
        'has_terrace' => 'boolean',
        'has_garden' => 'boolean',
        'has_pool' => 'boolean',
        'has_garage' => 'boolean',
        'has_parking' => 'boolean',
        'has_elevator' => 'boolean',
        'has_cellar' => 'boolean',
        'has_air_conditioning' => 'boolean',
        'is_furnished' => 'boolean',
        'is_featured' => 'boolean',
        'is_sponsored' => 'boolean',
        'is_exclusive' => 'boolean',
        'is_active' => 'boolean',
        'availability_date' => 'date',
        'published_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    // Relations
    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order_index');
    }

    public function mainImage()
    {
        return $this->hasOne(PropertyImage::class)->where('is_main', true);
    }

    public function features(): HasMany
    {
        return $this->hasMany(PropertyFeature::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }

    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    // Accessors
    public function getPriceFcfaAttribute(): float
    {
        return $this->price * config('app.currency_rate_eur_fcfa', 655.957);
    }

    public function getMainImageUrlAttribute(): ?string
    {
        $mainImage = $this->mainImage;
        return $mainImage ? asset('storage/' . $mainImage->image_path) : null;
    }

    public function getFullAddressAttribute(): string
    {
        return trim("{$this->address}, {$this->city} {$this->postal_code}");
    }

    public function getFormattedPriceAttribute(): string
    {
        return number_format($this->price, 0, ',', ' ') . ' €';
    }

    public function getFormattedPriceFcfaAttribute(): string
    {
        return number_format($this->price_fcfa, 0, ',', ' ') . ' FCFA';
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'a_vendre' => 'À vendre',
            'a_louer' => 'À louer',
            'reserve' => 'Réservé',
            'vendu' => 'Vendu',
            'loue' => 'Loué',
            'retire' => 'Retiré',
        };
    }

    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'appartement' => 'Appartement',
            'maison' => 'Maison',
            'studio' => 'Studio',
            'terrain' => 'Terrain',
            'loft' => 'Loft',
            'bureau' => 'Bureau',
            'commerce' => 'Local commercial',
            'villa' => 'Villa',
            'duplex' => 'Duplex',
        };
    }

    // Scopes
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->whereIn('status', ['a_vendre', 'a_louer']);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeSponsored(Builder $query): Builder
    {
        return $query->where('is_sponsored', true);
    }

    public function scopeForSale(Builder $query): Builder
    {
        return $query->where('transaction_type', 'vente');
    }

    public function scopeForRent(Builder $query): Builder
    {
        return $query->where('transaction_type', 'location');
    }

    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    public function scopeByCity(Builder $query, string $city): Builder
    {
        return $query->where('city', 'like', "%{$city}%");
    }

    public function scopePriceRange(Builder $query, ?float $min, ?float $max): Builder
    {
        if ($min) {
            $query->where('price', '>=', $min);
        }
        if ($max) {
            $query->where('price', '<=', $max);
        }
        return $query;
    }

    public function scopeSurfaceRange(Builder $query, ?float $min, ?float $max): Builder
    {
        if ($min) {
            $query->where('surface', '>=', $min);
        }
        if ($max) {
            $query->where('surface', '<=', $max);
        }
        return $query;
    }

    public function scopeMinRooms(Builder $query, int $rooms): Builder
    {
        return $query->where('rooms', '>=', $rooms);
    }

    public function scopeWithEquipments(Builder $query, array $equipments): Builder
    {
        foreach ($equipments as $equipment) {
            if (in_array($equipment, [
                'balcony', 'terrace', 'garden', 'pool', 'garage', 
                'parking', 'elevator', 'cellar', 'air_conditioning'
            ])) {
                $query->where("has_{$equipment}", true);
            }
        }
        return $query;
    }

    public function scopeNearby(Builder $query, float $lat, float $lng, float $radiusKm = 5): Builder
    {
        $haversine = "(6371 * acos(cos(radians($lat)) 
            * cos(radians(latitude)) 
            * cos(radians(longitude) - radians($lng)) 
            + sin(radians($lat)) 
            * sin(radians(latitude))))";

        return $query->selectRaw("*, $haversine AS distance")
            ->whereRaw("$haversine < $radiusKm")
            ->orderBy('distance');
    }

    // Methods
    public function incrementViews(): void
    {
        $this->increment('views_count');
    }

    public function updateFavoritesCount(): void
    {
        $count = $this->favorites()->count();
        $this->update(['favorites_count' => $count]);
    }

    public function generateReference(): string
    {
        $prefix = strtoupper(substr($this->type, 0, 3));
        $year = date('Y');
        $sequence = str_pad($this->id, 4, '0', STR_PAD_LEFT);
        
        return "{$prefix}-{$year}-{$sequence}";
    }

    public function isAvailable(): bool
    {
        return in_array($this->status, ['a_vendre', 'a_louer']);
    }

    public function canBeReserved(): bool
    {
        return $this->is_active && $this->isAvailable();
    }
}