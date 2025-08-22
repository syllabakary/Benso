<?php
// database/factories/AgentFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AgentFactory extends Factory
{
    /**
     * Définir le modèle par défaut de l'usine.
     *
     * @return array
     */
    public function definition()
    {
        $specialites = [
            'Vente résidentielle',
            'Location meublée',
            'Immobilier commercial',
            'Terrains et développement',
            'Immobilier de luxe',
            'Investissement locatif'
        ];

        return [
            'nom' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'telephone' => '+225' . $this->faker->numberBetween(10000000, 99999999),
            'whatsapp' => '+225' . $this->faker->numberBetween(10000000, 99999999),
            'photo' => null, // Sera ajouté via seeder si nécessaire
            'specialite' => $this->faker->randomElement($specialites),
            'description' => $this->faker->paragraphs(2, true),
            'is_active' => $this->faker->boolean(90),
        ];
    }

    /**
     * État pour un agent actif.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => true,
            ];
        });
    }
}
