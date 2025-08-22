<?php
// =============================================================================
// MIGRATION SETTINGS - database/migrations/2024_01_01_000010_create_settings_table.php
// =============================================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key_name', 100)->unique();
            $table->text('value');
            $table->enum('value_type', ['string', 'integer', 'float', 'boolean', 'array', 'json'])->default('string');
            $table->string('category', 50)->default('general');
            $table->string('description')->nullable();
            $table->boolean('is_public')->default(false);
            $table->boolean('is_editable')->default(true);
            $table->timestamps();

            $table->index(['category', 'is_public']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
};