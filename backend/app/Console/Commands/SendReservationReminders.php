<?php
// app/Console/Commands/SendReservationReminders.php

namespace App\Console\Commands;

use App\Services\NotificationService;
use Illuminate\Console\Command;

class SendReservationReminders extends Command
{
    protected $signature = 'benso:send-reminders';
    protected $description = 'Envoyer les rappels pour les réservations en attente';

    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        parent::__construct();
        $this->notificationService = $notificationService;
    }

    public function handle()
    {
        $this->info('📧 Envoi des rappels de réservation...');
        
        $this->notificationService->sendReservationReminders();
        
        $this->info('✅ Rappels envoyés avec succès!');
    }
}