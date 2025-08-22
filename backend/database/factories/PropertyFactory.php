<?php
// database/factories/PropertyFactory.php

namespace Database\Factories;

use App\Models\Agent;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    /**
     * Définir le modèle par défaut de l'usine.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['appartement', 'maison', 'studio', 'terrain', 'loft', 'bureau', 'commerce'];
        $transactionTypes = ['vente', 'location'];
        $conditions = ['neuf', 'renove', 'bon_etat', 'a_renover'];
        $cities = ['Cocody', 'Plateau', 'Riviera', 'Marcory', 'Treichville', 'Bingerville', 'Yopougon'];

        $transactionType = $this->faker->randomElement($transactionTypes);
        $type = $this->faker->randomElement($types);

        return [
            'agent_id' => Agent::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraphs(3, true),
            'type' => $type,
            'status' => $transactionType === 'vente'
                ? $this->faker->randomElement(['a_vendre', 'reserve', 'vendu'])
                : $this->faker->randomElement(['a_louer', 'reserve', 'loue']),
            'transaction_type' => $transactionType,
            'price' => $transactionType === 'vente'
                ? $this->faker->numberBetween(10000000, 500000000) // 10M à 500M FCFA
                : $this->faker->numberBetween(50000, 2000000), // 50K à 2M FCFA/mois
            'charges' => $transactionType === 'location' ? $this->faker->numberBetween(10000, 100000) : null,
            'surface' => $this->faker->numberBetween(30, 500),
            'rooms' => $this->faker->numberBetween(1, 8),
            'bedrooms' => $this->faker->numberBetween(0, 6),
            'bathrooms' => $this->faker->numberBetween(1, 4),
            'floor' => $type === 'appartement' ? $this->faker->numberBetween(0, 20) : null,
            'year_built' => $this->faker->numberBetween(1990, 2024),
            'condition' => $this->faker->randomElement($conditions),
            'energy_class' => $this->faker->randomElement(['A', 'B', 'C', 'D', 'E']),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->randomElement($cities),
            'postal_code' => $this->faker->postcode(),
            'latitude' => $this->faker->latitude(5.0, 5.5), // Coordonnées d'Abidjan
            'longitude' => $this->faker->longitude(-4.5, -3.5),
            'availability_date' => $this->faker->optional()->dateTimeBetween('now', '+6 months'),
            'is_featured' => $this->faker->boolean(20), // 20% de chance
            'is_sponsored' => $this->faker->boolean(10), // 10% de chance
            'views_count' => $this->faker->numberBetween(0, 1000),
            'is_active' => $this->faker->boolean(90), // 90% de chance
        ];
    }

    /**
     * État : mis en avant.
     */
    public function featured()
    {
        return $this->state(fn(array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * État : sponsorisé.
     */
    public function sponsored()
    {
        return $this->state(fn(array $attributes) => [
            'is_sponsored' => true,
        ]);
    }

    /**
     * État : à vendre.
     */
    public function forSale()
    {
        return $this->state(fn(array $attributes) => [
            'transaction_type' => 'vente',
            'status' => 'a_vendre',
            'price' => $this->faker->numberBetween(10000000, 500000000),
            'charges' => null,
        ]);
    }

    /**
     * État : à louer.
     */
    public function forRent()
    {
        return $this->state(fn(array $attributes) => [
            'transaction_type' => 'location',
            'status' => 'a_louer',
            'price' => $this->faker->numberBetween(50000, 2000000),
            'charges' => $this->faker->numberBetween(10000, 100000),
        ]);
    }
}
