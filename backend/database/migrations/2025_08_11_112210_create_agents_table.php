<?php
// database/migrations/2024_01_01_000001_create_agents_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('telephone', 20);
            $table->string('whatsapp', 20);
            $table->string('photo')->nullable();
            $table->string('specialite')->nullable();
            $table->text('description')->nullable();
            $table->integer('experience_years')->default(0);
            $table->decimal('rating', 3, 2)->default(0.00);
            $table->integer('total_sales')->default(0);
            $table->json('languages')->nullable();
            $table->json('certifications')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Index pour optimiser les requêtes
            $table->index('is_active');
            $table->index('specialite');
            $table->index('rating');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agents');
    }
};