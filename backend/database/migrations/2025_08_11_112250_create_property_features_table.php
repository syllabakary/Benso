<?php
// database/migrations/2024_01_01_000004_create_property_features_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');
            $table->enum('feature_type', ['equipment', 'service', 'proximity', 'security', 'comfort']);
            $table->string('feature_name', 100);
            $table->string('feature_value')->nullable();
            $table->boolean('is_highlight')->default(false);
            $table->timestamps();

            $table->index('property_id');
            $table->index('feature_type');
            $table->index('is_highlight');
            $table->unique(['property_id', 'feature_name'], 'unique_feature_per_property');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_features');
    }
};