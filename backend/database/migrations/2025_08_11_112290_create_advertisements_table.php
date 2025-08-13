<?php
// database/migrations/2024_01_01_000008_create_advertisements_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image_url', 500);
            $table->string('link_url', 500)->nullable();
            
            // Positionnement
            $table->enum('position', ['hero', 'sidebar', 'footer', 'sponsored', 'banner', 'popup']);
            $table->string('page_location', 100)->nullable();
            
            // Ciblage
            $table->json('target_audience')->nullable();
            $table->json('target_locations')->nullable();
            
            // Planification
            $table->boolean('is_active')->default(true);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('daily_budget', 8, 2)->nullable();
            $table->decimal('total_budget', 10, 2)->nullable();
            
            // Statistiques
            $table->integer('impressions_count')->default(0);
            $table->integer('clicks_count')->default(0);
            $table->integer('conversion_count')->default(0);
            
            // Métadonnées
            $table->string('advertiser_name')->nullable();
            $table->string('advertiser_contact')->nullable();
            $table->timestamps();

            $table->index('is_active');
            $table->index('position');
            $table->index(['start_date', 'end_date']);
            $table->index('page_location');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('advertisements');
    }
};