<?php
// app/Console/Commands/UpdateStatistics.php

namespace App\Console\Commands;

use App\Models\Property;
use App\Models\Agent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateStatistics extends Command
{
    protected $signature = 'benso:update-stats';
    protected $description = 'Mettre à jour les statistiques des propriétés et agents';

    public function handle()
    {
        $this->info('📊 Mise à jour des statistiques...');

        // Mettre à jour les compteurs de favoris des propriétés
        $this->info('Mise à jour des favoris...');
        Property::chunk(100, function ($properties) {
            foreach ($properties as $property) {
                $property->updateFavoritesCount();
            }
        });

        // Mettre à jour les ratings des agents
        $this->info('Mise à jour des ratings agents...');
        Agent::chunk(50, function ($agents) {
            foreach ($agents as $agent) {
                $agent->updateRating();
            }
        });

        // Optimiser les tables les plus utilisées
        DB::statement('OPTIMIZE TABLE properties, favorites, reservations');

        $this->info('✅ Statistiques mises à jour avec succès!');
    }
}