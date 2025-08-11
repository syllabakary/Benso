<?php
// app/Models/Reservation.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'user_id',
        'nom',
        'email',
        'telephone',
        'type_transaction',
        'type_bien',
        'localisation',
        'budget_min',
        'budget_max',
        'surface_min',
        'pieces',
        'date_visite',
        'heure_visite',
        'commentaires',
        'status',
        'assigned_agent_id',
        'priority',
        'source',
        'ip_address',
        'user_agent',
        'referrer',
        'expires_at',
    ];

    protected $casts = [
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'surface_min' => 'decimal:2',
        'date_visite' => 'date',
        'expires_at' => 'datetime',
    ];

    // Relations
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(Agent::class, 'assigned_agent_id');
    }

    // Accessors
    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'en_attente' => 'En attente',
            'confirme' => 'Confirmé',
            'annule' => 'Annulé',
            'traite' => 'Traité',
            'expire' => 'Expiré',
        };
    }

    public function getTypeTransactionLabelAttribute(): string
    {
        return $this->type_transaction === 'louer' ? 'Location' : 'Achat';
    }

    public function getPriorityLabelAttribute(): string
    {
        return match($this->priority) {
            'low' => 'Faible',
            'normal' => 'Normale',
            'high' => 'Élevée',
            'urgent' => 'Urgente',
        };
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'en_attente');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirme');
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByPriority($query, string $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeAssignedTo($query, int $agentId)
    {
        return $query->where('assigned_agent_id', $agentId);
    }

    public function scopeForTransaction($query, string $type)
    {
        return $query->where('type_transaction', $type);
    }

    // Methods
    public function markAsConfirmed(): bool
    {
        return $this->update(['status' => 'confirme']);
    }

    public function markAsProcessed(): bool
    {
        return $this->update(['status' => 'traite']);
    }

    public function cancel(): bool
    {
        return $this->update(['status' => 'annule']);
    }

    public function assignToAgent(int $agentId): bool
    {
        return $this->update(['assigned_agent_id' => $agentId]);
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }
}