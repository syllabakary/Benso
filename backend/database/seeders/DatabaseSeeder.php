<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'age' => 30,               // nécessaire si ta colonne n'est pas nullable
            'localite' => 'Abidjan',   // idem
            'nationalite' => 'Ivoirienne',
            'password' => bcrypt('password'), // sinon il faut que le seeder utilise le factory default
        ]);

        // Appeler les autres seeders
        $this->call([
            PropertySeeder::class,
            // AgentSeeder::class,
            // ReservationSeeder::class,
            // AdvertisementSeeder::class,
        ]);
    }
}
