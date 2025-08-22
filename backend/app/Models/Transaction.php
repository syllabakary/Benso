<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'buyer_id',
        'seller_id',
        'agent_id',
        'type',
        'status',
        'price_agreed',
        'commission_rate',
        'commission_amount',
        'contract_date',
        'completion_date',
        'deposit_paid',
        'notes',
    ];

    protected $casts = [
        'price_agreed' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'deposit_paid' => 'decimal:2',
        'contract_date' => 'date',
        'completion_date' => 'date',
    ];

    // Relations
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'en_cours');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'complete');
    }
}