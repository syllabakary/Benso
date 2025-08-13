<?php
// database/migrations/2024_01_01_000006_create_contacts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('email');
            $table->string('telephone', 20)->nullable();
            $table->string('sujet');
            $table->text('message');
            
            // Classification
            $table->enum('category', ['general', 'support', 'commercial', 'technique', 'partenariat'])->default('general');
            $table->enum('priority', ['low', 'normal', 'high', 'urgent'])->default('normal');
            
            // Suivi
            $table->enum('status', ['nouveau', 'en_cours', 'traite', 'ferme'])->default('nouveau');
            $table->foreignId('assigned_to')->nullable()->constrained('agents')->onDelete('set null');
            $table->boolean('response_sent')->default(false);
            
            // Métadonnées
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('source', 50)->default('website');
            
            $table->timestamps();
            $table->timestamp('responded_at')->nullable();

            $table->index('status');
            $table->index('category');
            $table->index('priority');
            $table->index('assigned_to');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};