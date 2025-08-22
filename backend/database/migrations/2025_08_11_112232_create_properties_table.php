<?php
// database/migrations/2024_01_01_000002_create_properties_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('properties')) {
            Schema::create('properties', function (Blueprint $table) {
                $table->engine = 'InnoDB'; // Spécifier le moteur InnoDB
                
                $table->id();
                $table->foreignId('agent_id')->constrained('agents')->onDelete('cascade');
                $table->string('reference', 50)->unique();
                $table->string('title');
                $table->text('description');
                
                // Type et transaction
                $table->enum('type', [
                    'appartement', 'maison', 'studio', 'terrain', 
                    'loft', 'bureau', 'commerce', 'villa', 'duplex'
                ]);
                $table->enum('status', [
                    'a_vendre', 'a_louer', 'reserve', 'vendu', 'loue', 'retire'
                ]);
                $table->enum('transaction_type', ['vente', 'location']);
                
                // Prix et charges
                $table->decimal('price', 12, 2);
                $table->decimal('charges', 8, 2)->nullable();
                $table->decimal('deposit', 10, 2)->nullable();
                $table->decimal('agency_fees', 8, 2)->nullable();
                
                // Caractéristiques physiques
                $table->decimal('surface', 8, 2);
                $table->integer('rooms');
                $table->integer('bedrooms');
                $table->integer('bathrooms');
                $table->integer('floor')->nullable();
                $table->integer('total_floors')->nullable();
                $table->integer('year_built')->nullable();
                $table->integer('last_renovation')->nullable();
                
                // État et performance énergétique
                $table->enum('condition_state', [
                    'neuf', 'renove', 'bon_etat', 'a_renover', 'a_demolir'
                ]);
                $table->enum('energy_class', ['A', 'B', 'C', 'D', 'E', 'F', 'G'])->nullable();
                $table->enum('heating_type', [
                    'central', 'individual', 'electric', 'gas', 'solar', 'none'
                ])->nullable();
                
                // Localisation
                $table->text('address');
                $table->string('city');
                $table->string('district')->nullable();
                $table->string('postal_code', 10);
                $table->string('country', 100)->default('Côte d\'Ivoire');
                $table->decimal('latitude', 10, 8)->nullable();
                $table->decimal('longitude', 11, 8)->nullable();
                
                // Équipements et caractéristiques (booléens)
                $table->boolean('has_balcony')->default(false);
                $table->boolean('has_terrace')->default(false);
                $table->boolean('has_garden')->default(false);
                $table->boolean('has_pool')->default(false);
                $table->boolean('has_garage')->default(false);
                $table->boolean('has_parking')->default(true);
                $table->boolean('has_elevator')->default(false);
                $table->boolean('has_cellar')->default(false);
                $table->boolean('has_air_conditioning')->default(false);
                $table->boolean('is_furnished')->default(false);
                
                // Disponibilité et visibilité
                $table->date('availability_date')->nullable();
                $table->boolean('is_featured')->default(false);
                $table->boolean('is_sponsored')->default(false);
                $table->boolean('is_exclusive')->default(false);
                
                // Statistiques
                $table->integer('views_count')->default(0);
                $table->integer('favorites_count')->default(0);
                $table->integer('contacts_count')->default(0);
                $table->integer('visits_count')->default(0);
                
                // Métadonnées
                $table->boolean('is_active')->default(true);
                $table->timestamp('published_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();

                // Index pour optimiser les requêtes
                $table->index('agent_id');
                $table->index('type');
                $table->index('status');
                $table->index('transaction_type');
                $table->index('price');
                $table->index('surface');
                $table->index('city');
                $table->index('is_active');
                $table->index('is_featured');
                $table->index('is_sponsored');
                $table->index('published_at');
                
                // Index composites pour les recherches fréquentes
                $table->index(['type', 'transaction_type', 'is_active'], 'idx_search_basic');
                $table->index(['transaction_type', 'price', 'is_active'], 'idx_search_price');
                $table->index(['city', 'type', 'transaction_type', 'is_active'], 'idx_search_location');
            });

            // Ajouter l'index full-text après la création de la table avec du SQL brut
            try {
                DB::statement('ALTER TABLE properties ADD FULLTEXT idx_fulltext_search (title, description, address)');
            } catch (Exception $e) {
                // Si l'index fulltext échoue, on continue sans (utile pour les environnements de développement)
                // Vous pouvez logger l'erreur si nécessaire
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};