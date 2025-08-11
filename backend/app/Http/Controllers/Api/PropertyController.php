<?php
// app/Http/Controllers/Api/PropertyController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Services\PropertyService;
use App\Services\SearchService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
{
    protected PropertyService $propertyService;
    protected SearchService $searchService;

    public function __construct(PropertyService $propertyService, SearchService $searchService)
    {
        $this->propertyService = $propertyService;
        $this->searchService = $searchService;
        $this->middleware('auth:api')->only(['store', 'update', 'destroy']);
    }

    /**
     * Liste des propriétés avec filtres et pagination
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $perPage = min($request->get('per_page', 15), 50);
            $page = $request->get('page', 1);
            
            // Paramètres de filtrage
            $filters = [
                'type' => $request->get('type'),
                'transaction_type' => $request->get('transaction_type'),
                'city' => $request->get('city'),
                'min_price' => $request->get('min_price'),
                'max_price' => $request->get('max_price'),
                'min_surface' => $request->get('min_surface'),
                'max_surface' => $request->get('max_surface'),
                'min_rooms' => $request->get('min_rooms'),
                'equipments' => $request->get('equipments', []),
                'featured' => $request->boolean('featured'),
                'sponsored' => $request->boolean('sponsored'),
            ];

            // Clé de cache basée sur les filtres
            $cacheKey = 'properties_' . md5(serialize($filters) . $page . $perPage);
            
            $result = Cache::remember($cacheKey, 300, function () use ($filters, $perPage) {
                $query = Property::with(['agent', 'mainImage'])
                    ->active()
                    ->available();

                // Appliquer les filtres
                $query = $this->searchService->applyFilters($query, $filters);

                // Tri par défaut : featured first, then sponsored, then latest
                $query->orderByDesc('is_featured')
                      ->orderByDesc('is_sponsored')
                      ->orderByDesc('published_at');

                return $query->paginate($perPage);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'properties' => $this->formatPropertiesCollection($result->items()),
                    'pagination' => [
                        'current_page' => $result->currentPage(),
                        'last_page' => $result->lastPage(),
                        'per_page' => $result->perPage(),
                        'total' => $result->total(),
                        'from' => $result->firstItem(),
                        'to' => $result->lastItem(),
                    ],
                    'filters' => $this->getAvailableFilters(),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des propriétés',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Recherche avancée de propriétés
     */
    public function search(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'q' => 'nullable|string|max:255',
                'type' => 'nullable|string|in:appartement,maison,studio,terrain,loft,bureau,commerce,villa,duplex',
                'transaction_type' => 'nullable|string|in:vente,location',
                'city' => 'nullable|string|max:255',
                'min_price' => 'nullable|numeric|min:0',
                'max_price' => 'nullable|numeric|min:0',
                'min_surface' => 'nullable|numeric|min:0',
                'max_surface' => 'nullable|numeric|min:0',
                'min_rooms' => 'nullable|integer|min:1',
                'equipments' => 'nullable|array',
                'lat' => 'nullable|numeric',
                'lng' => 'nullable|numeric',
                'radius' => 'nullable|numeric|min:1|max:50',
                'per_page' => 'nullable|integer|min:1|max:50',
            ]);

            $searchParams = $request->all();
            $perPage = min($request->get('per_page', 15), 50);

            $results = $this->searchService->searchProperties($searchParams, $perPage);

            return response()->json([
                'success' => true,
                'data' => [
                    'properties' => $this->formatPropertiesCollection($results->items()),
                    'pagination' => [
                        'current_page' => $results->currentPage(),
                        'last_page' => $results->lastPage(),
                        'per_page' => $results->perPage(),
                        'total' => $results->total(),
                    ],
                    'search_params' => $searchParams,
                    'suggestions' => $this->searchService->getSuggestions($request->get('q')),
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la recherche',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Détails d'une propriété
     */
    public function show(string $id): JsonResponse
    {
        try {
            $property = Property::with([
                'agent',
                'images' => function ($query) {
                    $query->ordered();
                },
                'features'
            ])->active()->findOrFail($id);

            // Incrémenter le compteur de vues
            $property->incrementViews();

            // Propriétés similaires
            $similarProperties = $this->propertyService
                ->getSimilarProperties($property, 4);

            return response()->json([
                'success' => true,
                'data' => [
                    'property' => $this->formatPropertyDetail($property),
                    'similar_properties' => $this->formatPropertiesCollection($similarProperties),
                ]
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Propriété non trouvée'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la propriété'
            ], 500);
        }
    }

    /**
     * Propriétés mises en avant
     */
    public function featured(): JsonResponse
    {
        try {
            $properties = Cache::remember('featured_properties', 600, function () {
                return Property::with(['agent', 'mainImage'])
                    ->active()
                    ->available()
                    ->featured()
                    ->limit(8)
                    ->get();
            });

            return response()->json([
                'success' => true,
                'data' => $this->formatPropertiesCollection($properties)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des propriétés mises en avant'
            ], 500);
        }
    }

    /**
     * Propriétés sponsorisées
     */
    public function sponsored(): JsonResponse
    {
        try {
            $properties = Cache::remember('sponsored_properties', 300, function () {
                return Property::with(['agent', 'mainImage'])
                    ->active()
                    ->available()
                    ->sponsored()
                    ->limit(6)
                    ->get();
            });

            return response()->json([
                'success' => true,
                'data' => $this->formatPropertiesCollection($properties)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des propriétés sponsorisées'
            ], 500);
        }
    }

    /**
     * Propriétés récentes
     */
    public function recent(): JsonResponse
    {
        try {
            $properties = Cache::remember('recent_properties', 300, function () {
                return Property::with(['agent', 'mainImage'])
                    ->active()
                    ->available()
                    ->latest('published_at')
                    ->limit(10)
                    ->get();
            });

            return response()->json([
                'success' => true,
                'data' => $this->formatPropertiesCollection($properties)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des propriétés récentes'
            ], 500);
        }
    }

    /**
     * Statistiques des propriétés
     */
    public function statistics(): JsonResponse
    {
        try {
            $stats = Cache::remember('property_statistics', 1800, function () {
                return [
                    'total_properties' => Property::active()->count(),
                    'available_properties' => Property::active()->available()->count(),
                    'for_sale' => Property::active()->available()->forSale()->count(),
                    'for_rent' => Property::active()->available()->forRent()->count(),
                    'featured' => Property::active()->featured()->count(),
                    'sponsored' => Property::active()->sponsored()->count(),
                    'by_type' => Property::active()->available()
                        ->select('type', DB::raw('count(*) as count'))
                        ->groupBy('type')
                        ->pluck('count', 'type'),
                    'by_city' => Property::active()->available()
                        ->select('city', DB::raw('count(*) as count'))
                        ->groupBy('city')
                        ->orderByDesc('count')
                        ->limit(10)
                        ->pluck('count', 'city'),
                    'price_ranges' => [
                        'sale' => $this->getPriceRanges('vente'),
                        'rent' => $this->getPriceRanges('location'),
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques'
            ], 500);
        }
    }

    /**
     * Formater une collection de propriétés
     */
    private function formatPropertiesCollection($properties): array
    {
        return collect($properties)->map(function ($property) {
            return $this->formatPropertySummary($property);
        })->toArray();
    }

    /**
     * Formater un résumé de propriété
     */
    private function formatPropertySummary(Property $property): array
    {
        return [
            'id' => $property->id,
            'reference' => $property->reference,
            'title' => $property->title,
            'type' => $property->type,
            'type_label' => $property->type_label,
            'status' => $property->status,
            'status_label' => $property->status_label,
            'transaction_type' => $property->transaction_type,
            'price' => $property->price,
            'price_fcfa' => $property->price_fcfa,
            'formatted_price' => $property->formatted_price,
            'formatted_price_fcfa' => $property->formatted_price_fcfa,
            'surface' => $property->surface,
            'rooms' => $property->rooms,
            'bedrooms' => $property->bedrooms,
            'bathrooms' => $property->bathrooms,
            'city' => $property->city,
            'district' => $property->district,
            'main_image_url' => $property->main_image_url,
            'is_featured' => $property->is_featured,
            'is_sponsored' => $property->is_sponsored,
            'views_count' => $property->views_count,
            'favorites_count' => $property->favorites_count,
            'agent' => [
                'id' => $property->agent->id,
                'nom' => $property->agent->nom,
                'telephone' => $property->agent->telephone,
                'whatsapp' => $property->agent->whatsapp,
                'photo_url' => $property->agent->photo_url,
            ],
            'published_at' => $property->published_at,
        ];
    }

    /**
     * Formater les détails complets d'une propriété
     */
    private function formatPropertyDetail(Property $property): array
    {
        $summary = $this->formatPropertySummary($property);
        
        return array_merge($summary, [
            'description' => $property->description,
            'charges' => $property->charges,
            'deposit' => $property->deposit,
            'agency_fees' => $property->agency_fees,
            'floor' => $property->floor,
            'total_floors' => $property->total_floors,
            'year_built' => $property->year_built,
            'condition_state' => $property->condition_state,
            'energy_class' => $property->energy_class,
            'heating_type' => $property->heating_type,
            'full_address' => $property->full_address,
            'postal_code' => $property->postal_code,
            'latitude' => $property->latitude,
            'longitude' => $property->longitude,
            'equipments' => [
                'has_balcony' => $property->has_balcony,
                'has_terrace' => $property->has_terrace,
                'has_garden' => $property->has_garden,
                'has_pool' => $property->has_pool,
                'has_garage' => $property->has_garage,
                'has_parking' => $property->has_parking,
                'has_elevator' => $property->has_elevator,
                'has_cellar' => $property->has_cellar,
                'has_air_conditioning' => $property->has_air_conditioning,
                'is_furnished' => $property->is_furnished,
            ],
            'images' => $property->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'url' => $image->image_url,
                    'alt_text' => $image->alt_text,
                    'room_type' => $image->room_type,
                    'is_main' => $image->is_main,
                ];
            }),
            'features' => $property->features->groupBy('feature_type')->map(function ($features) {
                return $features->map(function ($feature) {
                    return [
                        'name' => $feature->feature_name,
                        'value' => $feature->feature_value,
                        'is_highlight' => $feature->is_highlight,
                    ];
                });
            }),
            'agent' => [
                'id' => $property->agent->id,
                'nom' => $property->agent->nom,
                'email' => $property->agent->email,
                'telephone' => $property->agent->telephone,
                'whatsapp' => $property->agent->whatsapp,
                'whatsapp_link' => $property->agent->whatsapp_link,
                'photo_url' => $property->agent->photo_url,
                'specialite' => $property->agent->specialite,
                'description' => $property->agent->description,
                'experience_years' => $property->agent->experience_years,
                'experience_level' => $property->agent->experience_level,
                'rating' => $property->agent->rating,
                'total_sales' => $property->agent->total_sales,
            ],
            'availability_date' => $property->availability_date,
            'created_at' => $property->created_at,
            'updated_at' => $property->updated_at,
        ]);
    }

    /**
     * Obtenir les filtres disponibles
     */
    private function getAvailableFilters(): array
    {
        return Cache::remember('available_filters', 3600, function () {
            return [
                'types' => Property::active()->distinct()->pluck('type'),
                'cities' => Property::active()->distinct()->orderBy('city')->pluck('city'),
                'price_ranges' => [
                    'sale' => [
                        ['min' => 0, 'max' => 100000, 'label' => 'Moins de 100k €'],
                        ['min' => 100000, 'max' => 250000, 'label' => '100k - 250k €'],
                        ['min' => 250000, 'max' => 500000, 'label' => '250k - 500k €'],
                        ['min' => 500000, 'max' => 1000000, 'label' => '500k - 1M €'],
                        ['min' => 1000000, 'max' => null, 'label' => 'Plus de 1M €'],
                    ],
                    'rent' => [
                        ['min' => 0, 'max' => 500, 'label' => 'Moins de 500 €'],
                        ['min' => 500, 'max' => 1000, 'label' => '500 - 1000 €'],
                        ['min' => 1000, 'max' => 2000, 'label' => '1000 - 2000 €'],
                        ['min' => 2000, 'max' => 5000, 'label' => '2000 - 5000 €'],
                        ['min' => 5000, 'max' => null, 'label' => 'Plus de 5000 €'],
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
                    'balcony' => 'Balcon',
                    'terrace' => 'Terrasse',
                    'garden' => 'Jardin',
                    'pool' => 'Piscine',
                    'garage' => 'Garage',
                    'parking' => 'Parking',
                    'elevator' => 'Ascenseur',
                    'cellar' => 'Cave',
                    'air_conditioning' => 'Climatisation',
                ],
            ];
        });
    }

    /**
     * Obtenir les fourchettes de prix par type de transaction
     */
    private function getPriceRanges(string $transactionType): array
    {
        $properties = Property::active()
            ->available()
            ->where('transaction_type', $transactionType)
            ->pluck('price');

        if ($properties->isEmpty()) {
            return [];
        }

        return [
            'min' => $properties->min(),
            'max' => $properties->max(),
            'avg' => round($properties->avg()),
            'median' => $properties->median(),
        ];
    }
}