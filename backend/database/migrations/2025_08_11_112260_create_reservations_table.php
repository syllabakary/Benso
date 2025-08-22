<?php
// database/migrations/2024_01_01_000005_create_reservations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->nullable()->constrained('properties')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            
            // Informations contact
            $table->string('name');
            $table->string('email');
            $table->string('telephone', 20);
            
            // Critères de recherche
            $table->enum('type_transaction', ['louer', 'acheter']);
            $table->string('type_bien', 100)->nullable();
            $table->string('localisation')->nullable();
            $table->decimal('budget_min', 12, 2)->nullable();
            $table->decimal('budget_max', 12, 2)->nullable();
            $table->decimal('surface_min', 8, 2)->nullable();
            $table->string('pieces', 50)->nullable();
            
            // Préférences de visite
            $table->date('date_visite')->nullable();
            $table->enum('heure_visite', ['matin', 'apres-midi', 'soir'])->nullable();
            $table->text('commentaires')->nullable();
            
            // Suivi
            $table->enum('status', ['en_attente', 'confirme', 'annule', 'traite', 'expire'])->default('en_attente');
            $table->foreignId('assigned_agent_id')->nullable()->constrained('agents')->onDelete('set null');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            $table->string('source', 50)->default('website');
            
            // Métadonnées
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('referrer', 500)->nullable();
            
            $table->timestamps();
            $table->timestamp('expires_at')->nullable();

            // Index pour optimiser les requêtes
            $table->index('property_id');
            $table->index('user_id');
            $table->index('status');
            $table->index('assigned_agent_id');
            $table->index('type_transaction');
            $table->index('created_at');
            $table->index('priority');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};