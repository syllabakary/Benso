<?php
// app/Console/Commands/CleanupOldData.php

namespace App\Console\Commands;

use App\Models\Contact;
use App\Models\Reservation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CleanupOldData extends Command
{
    protected $signature = 'benso:cleanup';
    protected $description = 'Nettoyer les anciennes données';

    public function handle()
    {
        $this->info('🧹 Début du nettoyage des données anciennes...');

        // Supprimer les réservations expirées (plus de 6 mois)
        $expiredReservations = Reservation::where('status', 'expire')
            ->where('created_at', '<', now()->subMonths(6))
            ->count();

        Reservation::where('status', 'expire')
            ->where('created_at', '<', now()->subMonths(6))
            ->delete();

        $this->info("✅ {$expiredReservations} réservations expirées supprimées");

        // Supprimer les contacts traités anciens (plus d'1 an)
        $oldContacts = Contact::where('status', 'traite')
            ->where('updated_at', '<', now()->subYear())
            ->count();

        Contact::where('status', 'traite')
            ->where('updated_at', '<', now()->subYear())
            ->delete();

        $this->info("✅ {$oldContacts} anciens contacts supprimés");

        // Nettoyer les logs anciens
        $this->call('log:clear');

        // Optimiser les tables
        $this->call('model:prune');

        Log::info('Nettoyage automatique effectué', [
            'reservations_deleted' => $expiredReservations,
            'contacts_deleted' => $oldContacts,
        ]);

        $this->info('🎉 Nettoyage terminé avec succès!');
    }
}