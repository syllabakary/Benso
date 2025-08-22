<?php
// app/Models/Agent.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'whatsapp',
        'photo',
        'specialite',
        'description',
        'experience_years',
        'rating',
        'total_sales',
        'languages',
        'certifications',
        'is_active',
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'languages' => 'array',
        'certifications' => 'array',
        'is_active' => 'boolean',
        'experience_years' => 'integer',
        'total_sales' => 'integer',
    ];

    // Relations
    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function assignedReservations(): HasMany
    {
        return $this->hasMany(Reservation::class, 'assigned_agent_id');
    }

    public function assignedContacts(): HasMany
    {
        return $this->hasMany(Contact::class, 'assigned_to');
    }

    // Accessors
    public function getPhotoUrlAttribute(): ?string
    {
        return $this->photo ? asset('storage/agents/' . $this->photo) : null;
    }

    public function getWhatsappLinkAttribute(): string
    {
        return "https://wa.me/{$this->whatsapp}";
    }

    public function getExperienceLevelAttribute(): string
    {
        return match(true) {
            $this->experience_years < 2 => 'Débutant',
            $this->experience_years < 5 => 'Confirmé',
            $this->experience_years < 10 => 'Expert',
            default => 'Senior'
        };
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeBySpecialty($query, $specialty)
    {
        return $query->where('specialite', $specialty);
    }

    public function scopeTopRated($query)
    {
        return $query->where('rating', '>=', 4.0)->orderByDesc('rating');
    }

    // Methods
    public function updateRating(): void
    {
        $avgRating = $this->assignedReservations()
            ->whereNotNull('agent_rating')
            ->avg('agent_rating');
            
        $this->update(['rating' => $avgRating ?? 0]);
    }
}