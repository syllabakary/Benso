<?php
// app/Http/Controllers/Api/FavoriteController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Property;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Liste des favoris de l'utilisateur
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = auth('api')->user();
            $perPage = min($request->get('per_page', 15), 50);

            $favorites = Favorite::with(['property.agent', 'property.mainImage'])
                ->where('user_id', $user->id)
                ->latest()
                ->paginate($perPage);

            $formattedFavorites = $favorites->items()->map(function ($favorite) {
                return [
                    'id' => $favorite->id,
                    'notes' => $favorite->notes,
                    'created_at' => $favorite->created_at,
                    'property' => [
                        'id' => $favorite->property->id,
                        'title' => $favorite->property->title,
                        'reference' => $favorite->property->reference,
                        'type' => $favorite->property->type,
                        'type_label' => $favorite->property->type_label,
                        'price' => $favorite->property->price,
                        'formatted_price' => $favorite->property->formatted_price,
                        'surface' => $favorite->property->surface,
                        'rooms' => $favorite->property->rooms,
                        'bedrooms' => $favorite->property->bedrooms,
                        'city' => $favorite->property->city,
                        'status' => $favorite->property->status,
                        'status_label' => $favorite->property->status_label,
                        'main_image_url' => $favorite->property->main_image_url,
                        'agent' => [
                            'nom' => $favorite->property->agent->nom,
                            'telephone' => $favorite->property->agent->telephone,
                            'whatsapp' => $favorite->property->agent->whatsapp,
                        ],
                    ],
                ];
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'favorites' => $formattedFavorites,
                    'pagination' => [
                        'current_page' => $favorites->currentPage(),
                        'last_page' => $favorites->lastPage(),
                        'per_page' => $favorites->perPage(),
                        'total' => $favorites->total(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des favoris'
            ], 500);
        }
    }

    /**
     * Ajouter une propriété aux favoris
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'property_id' => 'required|integer|exists:properties,id',
                'notes' => 'nullable|string|max:500',
            ]);

            $user = auth('api')->user();
            $propertyId = $request->property_id;

            // Vérifier que la propriété existe et est active
            $property = Property::active()->findOrFail($propertyId);

            // Vérifier si déjà en favoris
            $existingFavorite = Favorite::where('user_id', $user->id)
                ->where('property_id', $propertyId)
                ->first();

            if ($existingFavorite) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cette propriété est déjà dans vos favoris'
                ], 422);
            }

            // Créer le favori
            $favorite = Favorite::create([
                'user_id' => $user->id,
                'property_id' => $propertyId,
                'notes' => $request->notes,
            ]);

            // Mettre à jour le compteur de favoris de la propriété
            $property->updateFavoritesCount();

            return response()->json([
                'success' => true,
                'message' => 'Propriété ajoutée aux favoris',
                'data' => [
                    'favorite_id' => $favorite->id,
                    'property_id' => $propertyId,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'ajout aux favoris'
            ], 500);
        }
    }

    /**
     * Supprimer une propriété des favoris
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $user = auth('api')->user();

            $favorite = Favorite::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            $propertyId = $favorite->property_id;
            $favorite->delete();

            // Mettre à jour le compteur
            $property = Property::find($propertyId);
            if ($property) {
                $property->updateFavoritesCount();
            }

            return response()->json([
                'success' => true,
                'message' => 'Propriété supprimée des favoris'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Favori non trouvé'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du favori'
            ], 500);
        }
    }

    /**
     * Toggle favori (ajouter/supprimer)
     */
    public function toggle(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'property_id' => 'required|integer|exists:properties,id',
            ]);

            $user = auth('api')->user();
            $propertyId = $request->property_id;

            $favorite = Favorite::where('user_id', $user->id)
                ->where('property_id', $propertyId)
                ->first();

            if ($favorite) {
                // Supprimer des favoris
                $favorite->delete();
                $action = 'removed';
                $message = 'Propriété supprimée des favoris';
            } else {
                // Ajouter aux favoris
                $property = Property::active()->findOrFail($propertyId);
                
                $favorite = Favorite::create([
                    'user_id' => $user->id,
                    'property_id' => $propertyId,
                ]);
                
                $action = 'added';
                $message = 'Propriété ajoutée aux favoris';
            }

            // Mettre à jour le compteur
            $property = Property::find($propertyId);
            if ($property) {
                $property->updateFavoritesCount();
            }

            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => [
                    'action' => $action,
                    'property_id' => $propertyId,
                    'is_favorite' => $action === 'added',
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification du favori'
            ], 500);
        }
    }
}
