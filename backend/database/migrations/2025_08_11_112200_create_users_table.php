<?php
// database/migrations/2024_01_01_000000_create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // Spécifier le moteur InnoDB
            $table->id();
            $table->string('nom');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('age');
            $table->string('localite');
            $table->string('nationalite');
            $table->string('telephone', 20)->nullable();
            $table->string('avatar')->nullable();
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();

            // Index pour optimiser les requêtes
            $table->index('email');
            $table->index('is_active');
            $table->index('created_at');
        });
          // Ajouter l'index full-text après la création de la table avec du SQL brut
          try {
            DB::statement('ALTER TABLE users ADD FULLTEXT idx_fulltext_search (nom, email, localite)');
        } catch (Exception $e) {
            // Si l'index fulltext échoue, on continue sans (utile pour les environnements de développement)
            // Vous pouvez logger l'erreur si nécessaire
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};