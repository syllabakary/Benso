<?php
// app/Http/Controllers/Api/ReservationController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use App\Models\Property;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
        $this->middleware('auth:api')->only(['index', 'show', 'cancel']);
    }

    /**
     * Créer une nouvelle réservation
     */
    public function store(ReservationRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $user = auth('api')->user();
            $property = null;

            // Vérifier si une propriété spécifique est mentionnée
            if ($request->property_id) {
                $property = Property::active()->findOrFail($request->property_id);
                
                if (!$property->canBeReserved()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cette propriété n\'est plus disponible pour réservation'
                    ], 422);
                }
            }

            // Créer la réservation
            $reservationData = $request->validated();
            $reservationData['user_id'] = $user?->id;
            $reservationData['ip_address'] = $request->ip();
            $reservationData['user_agent'] = $request->userAgent();
            $reservationData['referrer'] = $request->header('referer');
            $reservationData['expires_at'] = now()->addDays(30);

            // Assigner automatiquement un agent si la propriété en a un
            if ($property && $property->agent_id) {
                $reservationData['assigned_agent_id'] = $property->agent_id;
            }

            $reservation = Reservation::create($reservationData);

            // Mettre à jour les compteurs de la propriété
            if ($property) {
                $property->increment('contacts_count');
            }

            // Envoyer les notifications
            $this->notificationService->sendReservationNotification($reservation);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Réservation créée avec succès',
                'data' => [
                    'reservation' => $this->formatReservationData($reservation),
                    'reference' => $reservation->id,
                ]
            ], 201);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Propriété non trouvée'
            ], 404);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la réservation',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Liste des réservations de l'utilisateur connecté
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = auth('api')->user();
            $perPage = min($request->get('per_page', 10), 50);

            $reservations = Reservation::with(['property.agent', 'property.mainImage', 'assignedAgent'])
                ->where('user_id', $user->id)
                ->orWhere('email', $user->email)
                ->latest()
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => [
                    'reservations' => $reservations->items()->map(function ($reservation) {
                        return $this->formatReservationData($reservation);
                    }),
                    'pagination' => [
                        'current_page' => $reservations->currentPage(),
                        'last_page' => $reservations->lastPage(),
                        'per_page' => $reservations->perPage(),
                        'total' => $reservations->total(),
                    ]
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des réservations'
            ], 500);
        }
    }

    /**
     * Détails d'une réservation
     */
    public function show(string $id): JsonResponse
    {
        try {
            $user = auth('api')->user();
            
            $reservation = Reservation::with(['property.agent', 'property.images', 'assignedAgent'])
                ->where('id', $id)
                ->where(function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                          ->orWhere('email', $user->email);
                })
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $this->formatReservationDetail($reservation)
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation non trouvée'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération de la réservation'
            ], 500);
        }
    }

    /**
     * Annuler une réservation
     */
    public function cancel(string $id): JsonResponse
    {
        try {
            $user = auth('api')->user();
            
            $reservation = Reservation::where('id', $id)
                ->where(function ($query) use ($user) {
                    $query->where('user_id', $user->id)
                          ->orWhere('email', $user->email);
                })
                ->whereIn('status', ['en_attente', 'confirme'])
                ->firstOrFail();

            $reservation->cancel();

            // Notification d'annulation
            $this->notificationService->sendCancellationNotification($reservation);

            return response()->json([
                'success' => true,
                'message' => 'Réservation annulée avec succès',
                'data' => $this->formatReservationData($reservation->fresh())
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation non trouvée ou ne peut pas être annulée'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'annulation de la réservation'
            ], 500);
        }
    }

    /**
     * Vérifier le statut d'une réservation (endpoint public)
     */
    public function checkStatus(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'reference' => 'required|integer',
                'email' => 'required|email',
            ]);

            $reservation = Reservation::where('id', $request->reference)
                ->where('email', $request->email)
                ->first();

            if (!$reservation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Réservation non trouvée'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'reference' => $reservation->id,
                    'status' => $reservation->status,
                    'status_label' => $reservation->status_label,
                    'created_at' => $reservation->created_at,
                    'property_title' => $reservation->property?->title,
                    'assigned_agent' => $reservation->assignedAgent ? [
                        'nom' => $reservation->assignedAgent->nom,
                        'telephone' => $reservation->assignedAgent->telephone,
                        'email' => $reservation->assignedAgent->email,
                    ] : null,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la vérification du statut'
            ], 500);
        }
    }

    /**
     * Statistiques des réservations (pour dashboard utilisateur)
     */
    public function statistics(): JsonResponse
    {
        try {
            $user = auth('api')->user();

            $stats = [
                'total' => Reservation::where('user_id', $user->id)->count(),
                'pending' => Reservation::where('user_id', $user->id)->pending()->count(),
                'confirmed' => Reservation::where('user_id', $user->id)->confirmed()->count(),
                'processed' => Reservation::where('user_id', $user->id)->where('status', 'traite')->count(),
                'cancelled' => Reservation::where('user_id', $user->id)->where('status', 'annule')->count(),
                'by_transaction_type' => Reservation::where('user_id', $user->id)
                    ->select('type_transaction', DB::raw('count(*) as count'))
                    ->groupBy('type_transaction')
                    ->pluck('count', 'type_transaction'),
                'recent' => Reservation::where('user_id', $user->id)
                    ->with(['property'])
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function ($reservation) {
                        return [
                            'id' => $reservation->id,
                            'property_title' => $reservation->property?->title ?? 'Recherche générale',
                            'status' => $reservation->status,
                            'status_label' => $reservation->status_label,
                            'created_at' => $reservation->created_at,
                        ];
                    }),
            ];

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
     * Formater les données de base d'une réservation
     */
    private function formatReservationData(Reservation $reservation): array
    {
        return [
            'id' => $reservation->id,
            'reference' => $reservation->id,
            'nom' => $reservation->nom,
            'email' => $reservation->email,
            'telephone' => $reservation->telephone,
            'type_transaction' => $reservation->type_transaction,
            'type_transaction_label' => $reservation->type_transaction_label,
            'type_bien' => $reservation->type_bien,
            'localisation' => $reservation->localisation,
            'budget_min' => $reservation->budget_min,
            'budget_max' => $reservation->budget_max,
            'surface_min' => $reservation->surface_min,
            'pieces' => $reservation->pieces,
            'date_visite' => $reservation->date_visite,
            'heure_visite' => $reservation->heure_visite,
            'status' => $reservation->status,
            'status_label' => $reservation->status_label,
            'priority' => $reservation->priority,
            'priority_label' => $reservation->priority_label,
            'property' => $reservation->property ? [
                'id' => $reservation->property->id,
                'title' => $reservation->property->title,
                'reference' => $reservation->property->reference,
                'type' => $reservation->property->type,
                'price' => $reservation->property->price,
                'city' => $reservation->property->city,
                'main_image_url' => $reservation->property->main_image_url,
            ] : null,
            'assigned_agent' => $reservation->assignedAgent ? [
                'id' => $reservation->assignedAgent->id,
                'nom' => $reservation->assignedAgent->nom,
                'telephone' => $reservation->assignedAgent->telephone,
                'email' => $reservation->assignedAgent->email,
                'whatsapp' => $reservation->assignedAgent->whatsapp,
            ] : null,
            'created_at' => $reservation->created_at,
            'expires_at' => $reservation->expires_at,
            'is_expired' => $reservation->isExpired(),
        ];
    }

    /**
     * Formater les détails complets d'une réservation
     */
    private function formatReservationDetail(Reservation $reservation): array
    {
        $basicData = $this->formatReservationData($reservation);
        
        return array_merge($basicData, [
            'commentaires' => $reservation->commentaires,
            'source' => $reservation->source,
            'updated_at' => $reservation->updated_at,
            'property_details' => $reservation->property ? [
                'id' => $reservation->property->id,
                'title' => $reservation->property->title,
                'reference' => $reservation->property->reference,
                'description' => $reservation->property->description,
                'type' => $reservation->property->type,
                'type_label' => $reservation->property->type_label,
                'price' => $reservation->property->price,
                'formatted_price' => $reservation->property->formatted_price,
                'surface' => $reservation->property->surface,
                'rooms' => $reservation->property->rooms,
                'bedrooms' => $reservation->property->bedrooms,
                'full_address' => $reservation->property->full_address,
                'images' => $reservation->property->images->take(3)->map(function ($image) {
                    return [
                        'url' => $image->image_url,
                        'alt_text' => $image->alt_text,
                    ];
                }),
                'agent' => [
                    'nom' => $reservation->property->agent->nom,
                    'telephone' => $reservation->property->agent->telephone,
                    'email' => $reservation->property->agent->email,
                    'whatsapp' => $reservation->property->agent->whatsapp,
                    'whatsapp_link' => $reservation->property->agent->whatsapp_link,
                ],
            ] : null,
        ]);
    }
}