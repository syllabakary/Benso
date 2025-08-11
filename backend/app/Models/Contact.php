<?php
// app/Models/Contact.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'sujet',
        'message',
        'category',
        'priority',
        'status',
        'assigned_to',
        'response_sent',
        'ip_address',
        'user_agent',
        'source',
        'responded_at',
    ];

    protected $casts = [
        'response_sent' => 'boolean',
        'responded_at' => 'datetime',
    ];

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(Agent::class, 'assigned_to');
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'nouveau' => 'Nouveau',
            'en_cours' => 'En cours',
            'traite' => 'Traité',
            'ferme' => 'Fermé',
        };
    }

    public function getCategoryLabelAttribute(): string
    {
        return match($this->category) {
            'general' => 'Général',
            'support' => 'Support',
            'commercial' => 'Commercial',
            'technique' => 'Technique',
            'partenariat' => 'Partenariat',
        };
    }

    // Scopes
    public function scopeNew($query)
    {
        return $query->where('status', 'nouveau');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'en_cours');
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByPriority($query, string $priority)
    {
        return $query->where('priority', $priority);
    }

    // Methods
    public function markAsInProgress(): bool
    {
        return $this->update(['status' => 'en_cours']);
    }

    public function markAsProcessed(): bool
    {
        return $this->update([
            'status' => 'traite',
            'responded_at' => now(),
            'response_sent' => true,
        ]);
    }

    public function close(): bool
    {
        return $this->update(['status' => 'ferme']);
    }
}
