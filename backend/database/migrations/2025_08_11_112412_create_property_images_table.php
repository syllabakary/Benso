<?php
// database/migrations/2024_01_01_000003_create_property_images_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');
            $table->string('image_path', 500);
            $table->string('image_url', 500)->nullable();
            $table->string('alt_text')->nullable();
            $table->string('room_type', 100)->nullable();
            $table->boolean('is_main')->default(false);
            $table->integer('order_index')->default(0);
            $table->integer('file_size')->nullable();
            $table->string('dimensions', 20)->nullable();
            $table->timestamps();

            // Index pour optimiser les requêtes
            $table->index('property_id');
            $table->index('is_main');
            $table->index('order_index');
            
            // Contrainte unique pour l'image principale
            $table->unique(['property_id', 'is_main'], 'unique_main_per_property');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_images');
    }
};