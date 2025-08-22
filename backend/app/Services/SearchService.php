<?php
// app/Services/SearchService.php

namespace App\Services;

use App\Models\Property;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Cache;

class SearchService
{
    /**
     * Rechercher des propriétés avec paramètres avancés
     */
    public function searchProperties(array $params, int $perPage = 15)
    {
        $query = Property::with(['agent', 'mainImage'])
            ->active()
            ->available();

        // Recherche textuelle
        if (!empty($params['q'])) {
            $searchTerm = $params['q'];
            $query->where(function (Builder $q) use ($searchTerm) {
                $q->whereFullText(['title', 'description', 'address'], $searchTerm)
                  ->orWhere('title', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('city', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('address', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Appliquer les filtres
        $query = $this->applyFilters($query, $params);

        // Recherche géographique (proximité)
        if (!empty($params['lat']) && !empty($params['lng'])) {
            $radius = $params['radius'] ?? 5;
            $query->nearby($params['lat'], $params['lng'], $radius);
        }

        // Tri par pertinence
        $query = $this->applySorting($query, $params);

        return $query->paginate($perPage);
    }

    /**
     * Appliquer les filtres à une requête
     */
    public function applyFilters(Builder $query, array $filters): Builder
    {
        // Type de bien
        if (!empty($filters['type'])) {
            $query->byType($filters['type']);
        }

        // Type de transaction
        if (!empty($filters['transaction_type'])) {
            if ($filters['transaction_type'] === 'vente') {
                $query->forSale();
            } elseif ($filters['transaction_type'] === 'location') {
                $query->forRent();
            }
        }

        // Ville
        if (!empty($filters['city'])) {
            $query->byCity($filters['city']);
        }

        // Fourchette de prix
        $query->priceRange($filters['min_price'] ?? null, $filters['max_price'] ?? null);

        // Fourchette de surface
        $query->surfaceRange($filters['min_surface'] ?? null, $filters['max_surface'] ?? null);

        // Nombre de pièces minimum
        if (!empty($filters['min_rooms'])) {
            $query->minRooms($filters['min_rooms']);
        }

        // Équipements
        if (!empty($filters['equipments']) && is_array($filters['equipments'])) {
            $query->withEquipments($filters['equipments']);
        }

        // Propriétés mises en avant
        if (!empty($filters['featured'])) {
            $query->featured();
        }

        // Propriétés sponsorisées
        if (!empty($filters['sponsored'])) {
            $query->sponsored();
        }

        return $query;
    }

    /**
     * Appliquer le tri
     */
    private function applySorting(Builder $query, array $params): Builder
    {
        $sortBy = $params['sort_by'] ?? 'relevance';
        $sortOrder = $params['sort_order'] ?? 'desc';

        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortOrder);
                break;
            case 'surface':
                $query->orderBy('surface', $sortOrder);
                break;
            case 'date':
                $query->orderBy('published_at', $sortOrder);
                break;
            case 'views':
                $query->orderBy('views_count', $sortOrder);
                break;
            case 'relevance':
            default:
                $query->orderByDesc('is_featured')
                      ->orderByDesc('is_sponsored')
                      ->orderByDesc('published_at');
                break;
        }

        return $query;
    }

    /**
     * Obtenir des suggestions de recherche
     */
    public function getSuggestions(?string $query = null): array
    {
        if (!$query || strlen($query) < 2) {
            return $this->getPopularSuggestions();
        }

        $cacheKey = "search_suggestions_" . md5($query);
        
        return Cache::remember($cacheKey, 300, function () use ($query) {
            $suggestions = [];

            // Suggestions de villes
            $cities = Property::active()
                ->where('city', 'LIKE', "%{$query}%")
                ->distinct()
                ->pluck('city')
                ->take(5);

            foreach ($cities as $city) {
                $suggestions[] = [
                    'type' => 'city',
                    'text' => $city,
                    'label' => "Rechercher à {$city}",
                ];
            }

            // Suggestions de types
            $types = Property::active()
                ->where('type', 'LIKE', "%{$query}%")
                ->distinct()
                ->pluck('type')
                ->take(3);

            foreach ($types as $type) {
                $suggestions[] = [
                    'type' => 'property_type',
                    'text' => $type,
                    'label' => "Rechercher des {$type}s",
                ];
            }

            return array_slice($suggestions, 0, 8);
        });
    }

    /**
     * Suggestions populaires par défaut
     */
    private function getPopularSuggestions(): array
    {
        return Cache::remember('popular_suggestions', 3600, function () {
            // Villes les plus populaires
            $popularCities = Property::active()
                ->select('city')
                ->selectRaw('COUNT(*) as count')
                ->groupBy('city')
                ->orderByDesc('count')
                ->limit(5)
                ->pluck('city');

            $suggestions = [];
            foreach ($popularCities as $city) {
                $suggestions[] = [
                    'type' => 'city',
                    'text' => $city,
                    'label' => "Rechercher à {$city}",
                ];
            }

            // Recherches fréquentes
            $popularSearches = [
                ['text' => 'appartement Abidjan', 'label' => 'Appartements à Abidjan'],
                ['text' => 'maison cocody', 'label' => 'Maisons à Cocody'],
                ['text' => 'villa marcory', 'label' => 'Villas à Marcory'],
                ['text' => 'studio location', 'label' => 'Studios en location'],
            ];

            foreach ($popularSearches as $search) {
                $suggestions[] = [
                    'type' => 'popular',
                    'text' => $search['text'],
                    'label' => $search['label'],
                ];
            }

            return array_slice($suggestions, 0, 8);
        });
    }

    /**
     * Enregistrer une recherche pour les statistiques
     */
    public function recordSearch(array $params): void
    {
        // Enregistrer les termes de recherche populaires
        if (!empty($params['q'])) {
            $cacheKey = 'search_term_' . md5(strtolower($params['q']));
            Cache::increment($cacheKey, 1);
            Cache::put($cacheKey, Cache::get($cacheKey, 1), 86400); // 24h
        }

        // Enregistrer les filtres populaires
        $this->recordPopularFilters($params);
    }

    /**
     * Enregistrer les filtres populaires
     */
    private function recordPopularFilters(array $params): void
    {
        $filters = ['type', 'city', 'transaction_type'];
        
        foreach ($filters as $filter) {
            if (!empty($params[$filter])) {
                $cacheKey = "popular_{$filter}_" . md5($params[$filter]);
                Cache::increment($cacheKey, 1);
                Cache::put($cacheKey, Cache::get($cacheKey, 1), 86400);
            }
        }
    }
}