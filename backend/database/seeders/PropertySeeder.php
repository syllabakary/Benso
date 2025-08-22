<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    public function run()
    {
        Property::create([
            'title' => 'Appartement moderne',
            'price' => 150000,
            'description' => 'Superbe appartement au centre-ville',
            'agent_id' => 1,
        ]);

        Property::create([
            'title' => 'Maison familiale',
            'price' => 250000,
            'description' => 'Grande maison avec jardin',
            'agent_id' => 2,
        ]);
    }
}
