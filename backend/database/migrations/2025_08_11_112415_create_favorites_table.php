
<?php
// database/migrations/2024_01_01_000007_create_favorites_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('property_id')->constrained('properties')->onDelete('cascade');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'property_id'], 'unique_favorite');
            $table->index('user_id');
            $table->index('property_id');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};