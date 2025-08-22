<?php
// app/Http/Controllers/Api/SearchController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Services\SearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SearchController extends Controller
{
    protected SearchService $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    /**
     * Recherche globale (deprecated - utiliser PropertyController::search)
     */
    public function search(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Ce endpoint est déprécié. Utilisez /api/v1/properties/search',
            'redirect_to' => '/api/v1/properties/search'
        ], 301);
    }

    /**
     * Suggestions de recherche
     */
    public function suggestions(Request $request): JsonResponse
    {
        try {
            $query = $request->get('q', '');
            $suggestions = $this->searchService->getSuggestions($query);

            return response()->json([
                'success' => true,
                'data' => $suggestions
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des suggestions'
            ], 500);
        }
    }

    /**
     * Recherches populaires
     */
    public function popular(): JsonResponse
    {
        try {
            $popularSearches = Cache::remember('popular_searches', 3600, function () {
                return [
                    [
                        'query' => 'appartement Abidjan',
                        'count' => 1250,
                        'type' => 'location'
                    ],
                    [
                        'query' => 'maison Cocody',
                        'count' => 980,
                        'type' => 'city'
                    ],
                    [
                        'query' => 'villa Marcory',
                        'count' => 756,
                        'type' => 'city'
                    ],
                    [
                        'query' => 'studio location',
                        'count' => 654,
                        'type' => 'property_type'
                    ],
                    [
                        'query' => 'terrain vente',
                        'count' => 432,
                        'type' => 'property_type'
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $popularSearches
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des recherches populaires'
            ], 500);
        }
    }

    /**
     * Filtres disponibles pour la recherche
     */
    public function filters(): JsonResponse
    {
        try {
            $filters = Cache::remember('search_filters', 1800, function () {
                return [
                    'types' => Property::active()
                        ->select('type')
                        ->selectRaw('COUNT(*) as count')
                        ->groupBy('type')
                        ->orderBy('type')
                        ->get()
                        ->map(function ($item) {
                            return [
                                'value' => $item->type,
                                'label' => $this->getTypeLabel($item->type),
                                'count' => $item->count,
                            ];
                        }),
                    
                    'cities' => Property::active()
                        ->select('city')
                        ->selectRaw('COUNT(*) as count')
                        ->groupBy('city')
                        ->orderByDesc('count')
                        ->limit(20)
                        ->get()
                        ->map(function ($item) {
                            return [
                                'value' => $item->city,
                                'label' => $item->city,
                                'count' => $item->count,
                            ];
                        }),

                    'price_ranges' => [
                        'vente' => [
                            ['min' => 0, 'max' => 50000, 'label' => 'Moins de 50k €', 'count' => Property::active()->forSale()->where('price', '<', 50000)->count()],
                            ['min' => 50000, 'max' => 100000, 'label' => '50k - 100k €', 'count' => Property::active()->forSale()->whereBetween('price', [50000, 100000])->count()],
                            ['min' => 100000, 'max' => 250000, 'label' => '100k - 250k €', 'count' => Property::active()->forSale()->whereBetween('price', [100000, 250000])->count()],
                            ['min' => 250000, 'max' => 500000, 'label' => '250k - 500k €', 'count' => Property::active()->forSale()->whereBetween('price', [250000, 500000])->count()],
                            ['min' => 500000, 'max' => null, 'label' => 'Plus de 500k €', 'count' => Property::active()->forSale()->where('price', '>', 500000)->count()],
                        ],
                        'location' => [
                            ['min' => 0, 'max' => 300, 'label' => 'Moins de 300 €', 'count' => Property::active()->forRent()->where('price', '<', 300)->count()],
                            ['min' => 300, 'max' => 500, 'label' => '300 - 500 €', 'count' => Property::active()->forRent()->whereBetween('price', [300, 500])->count()],
                            ['min' => 500, 'max' => 1000, 'label' => '500 - 1000 €', 'count' => Property::active()->forRent()->whereBetween('price', [500, 1000])->count()],
                            ['min' => 1000, 'max' => 2000, 'label' => '1000 - 2000 €', 'count' => Property::active()->forRent()->whereBetween('price', [1000, 2000])->count()],
                            ['min' => 2000, 'max' => null, 'label' => 'Plus de 2000 €', 'count' => Property::active()->forRent()->where('price', '>', 2000)->count()],
                        ],
                    ],

                    'surface_ranges' => [
                        ['min' => 0, 'max' => 50, 'label' => 'Moins de 50 m²'],
                        ['min' => 50, 'max' => 100, 'label' => '50 - 100 m²'],
                        ['min' => 100, 'max' => 200, 'label' => '100 - 200 m²'],
                        ['min' => 200, 'max' => 500, 'label' => '200 - 500 m²'],
                        ['min' => 500, 'max' => null, 'label' => 'Plus de 500 m²'],
                    ],

                    'equipments' => [
                        ['key' => 'balcony', 'label' => 'Balcon'],
                        ['key' => 'terrace', 'label' => 'Terrasse'],
                        ['key' => 'garden', 'label' => 'Jardin'],
                        ['key' => 'pool', 'label' => 'Piscine'],
                        ['key' => 'garage', 'label' => 'Garage'],
                        ['key' => 'parking', 'label' => 'Parking'],
                        ['key' => 'elevator', 'label' => 'Ascenseur'],
                        ['key' => 'cellar', 'label' => 'Cave'],
                        ['key' => 'air_conditioning', 'label' => 'Climatisation'],
                    ],

                    'room_counts' => [
                        ['value' => 1, 'label' => '1 pièce', 'count' => Property::active()->where('rooms', 1)->count()],
                        ['value' => 2, 'label' => '2 pièces', 'count' => Property::active()->where('rooms', 2)->count()],
                        ['value' => 3, 'label' => '3 pièces', 'count' => Property::active()->where('rooms', 3)->count()],
                        ['value' => 4, 'label' => '4 pièces', 'count' => Property::active()->where('rooms', 4)->count()],
                        ['value' => 5, 'label' => '5+ pièces', 'count' => Property::active()->where('rooms', '>=', 5)->count()],
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $filters
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des filtres'
            ], 500);
        }
    }

    /**
     * Enregistrer une recherche pour les statistiques
     */
    public function recordSearch(Request $request): JsonResponse
    {
        try {
            $searchParams = $request->only([
                'q', 'type', 'transaction_type', 'city', 
                'min_price', 'max_price', 'min_surface', 'max_surface',
                'min_rooms', 'equipments'
            ]);

            $this->searchService->recordSearch($searchParams);

            return response()->json([
                'success' => true,
                'message' => 'Recherche enregistrée'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement de la recherche'
            ], 500);
        }
    }

    /**
     * Obtenir le label d'un type de propriété
     */
    private function getTypeLabel(string $type): string
    {
        return match($type) {
            'appartement' => 'Appartement',
            'maison' => 'Maison',
            'studio' => 'Studio',
            'terrain' => 'Terrain',
            'loft' => 'Loft',
            'bureau' => 'Bureau',
            'commerce' => 'Local commercial',
            'villa' => 'Villa',
            'duplex' => 'Duplex',
            default => ucfirst($type),
        };
    }
}
