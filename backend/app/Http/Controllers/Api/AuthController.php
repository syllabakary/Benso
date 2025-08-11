<?php
// app/Http/Controllers/Api/AuthController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            // Vérifier le rate limiting
            $this->checkRateLimit($request, 'register');

            $user = User::create([
                'nom' => $request->nom,
                'email' => $request->email,
                'password' => $request->password, // Sera hashé par le mutator
                'age' => $request->age,
                'localite' => $request->localite,
                'nationalite' => $request->nationalite,
                'telephone' => $request->telephone,
            ]);

            // Générer le token JWT
            $token = JWTAuth::fromUser($user);

            // Mettre à jour la dernière connexion
            $user->update(['last_login_at' => now()]);

            return response()->json([
                'success' => true,
                'message' => 'Inscription réussie',
                'data' => [
                    'user' => $this->formatUserData($user),
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'inscription',
                'error' => config('app.debug') ? $e->getMessage() : 'Erreur interne'
            ], 500);
        }
    }

    /**
     * Connexion utilisateur
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            // Vérifier le rate limiting
            $this->checkRateLimit($request, 'login');

            $credentials = $request->only('email', 'password');

            // Vérifier si l'utilisateur existe et est actif
            $user = User::where('email', $credentials['email'])->first();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur non trouvé'
                ], 404);
            }

            if (!$user->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Compte désactivé'
                ], 403);
            }

            // Tentative de connexion
            if (!$token = auth('api')->attempt($credentials)) {
                $this->incrementRateLimit($request, 'login');
                
                return response()->json([
                    'success' => false,
                    'message' => 'Email ou mot de passe incorrect'
                ], 401);
            }

            // Connexion réussie
            $user->update(['last_login_at' => now()]);

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'data' => [
                    'user' => $this->formatUserData($user),
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la connexion',
                'error' => config('app.debug') ? $e->getMessage() : 'Erreur interne'
            ], 500);
        }
    }

    /**
     * Obtenir les informations de l'utilisateur connecté
     */
    public function me(): JsonResponse
    {
        try {
            $user = auth('api')->user();
            
            return response()->json([
                'success' => true,
                'data' => $this->formatUserData($user)
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération du profil'
            ], 500);
        }
    }

    /**
     * Mettre à jour le profil utilisateur
     */
    public function updateProfile(Request $request): JsonResponse
    {
        try {
            $user = auth('api')->user();
            
            $request->validate([
                'nom' => 'sometimes|required|string|max:255',
                'age' => 'sometimes|required|integer|min:18|max:120',
                'localite' => 'sometimes|required|string|max:255',
                'nationalite' => 'sometimes|required|string|max:255',
                'telephone' => 'sometimes|nullable|string|max:20',
                'avatar' => 'sometimes|nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            $updateData = $request->only(['nom', 'age', 'localite', 'nationalite', 'telephone']);

            // Gestion de l'avatar
            if ($request->hasFile('avatar')) {
                $avatar = $request->file('avatar');
                $filename = time() . '_' . $user->id . '.' . $avatar->getClientOriginalExtension();
                $avatar->storeAs('public/avatars', $filename);
                $updateData['avatar'] = $filename;
            }

            $user->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Profil mis à jour avec succès',
                'data' => $this->formatUserData($user->fresh())
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour'
            ], 500);
        }
    }

    /**
     * Changer le mot de passe
     */
    public function changePassword(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'current_password' => 'required|string',
                'new_password' => 'required|string|min:8|confirmed',
            ]);

            $user = auth('api')->user();

            // Vérifier le mot de passe actuel
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mot de passe actuel incorrect'
                ], 422);
            }

            // Mettre à jour le mot de passe
            $user->update(['password' => $request->new_password]);

            return response()->json([
                'success' => true,
                'message' => 'Mot de passe mis à jour avec succès'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour du mot de passe'
            ], 500);
        }
    }

    /**
     * Rafraîchir le token
     */
    public function refresh(): JsonResponse
    {
        try {
            $token = auth('api')->refresh();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'access_token' => $token,
                    'token_type' => 'bearer',
                    'expires_in' => auth('api')->factory()->getTTL() * 60
                ]
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Impossible de rafraîchir le token'
            ], 401);
        }
    }

    /**
     * Déconnexion
     */
    public function logout(): JsonResponse
    {
        try {
            auth('api')->logout();
            
            return response()->json([
                'success' => true,
                'message' => 'Déconnexion réussie'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la déconnexion'
            ], 500);
        }
    }

    /**
     * Supprimer le compte
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'password' => 'required|string',
            ]);

            $user = auth('api')->user();

            // Vérifier le mot de passe
            if (!Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Mot de passe incorrect'
                ], 422);
            }

            // Désactiver le compte au lieu de le supprimer (soft delete)
            $user->update([
                'is_active' => false,
                'email' => $user->email . '_deleted_' . time(),
            ]);

            // Déconnecter l'utilisateur
            auth('api')->logout();

            return response()->json([
                'success' => true,
                'message' => 'Compte supprimé avec succès'
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression du compte'
            ], 500);
        }
    }

    /**
     * Vérifier le rate limiting
     */
    private function checkRateLimit(Request $request, string $action): void
    {
        $key = $action . '|' . $request->ip();
        $maxAttempts = $action === 'login' ? 5 : 3;
        $decayMinutes = 15;

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($key);
            
            throw ValidationException::withMessages([
                'rate_limit' => [
                    "Trop de tentatives. Réessayez dans {$seconds} secondes."
                ]
            ]);
        }
    }

    /**
     * Incrémenter le rate limiting
     */
    private function incrementRateLimit(Request $request, string $action): void
    {
        $key = $action . '|' . $request->ip();
        RateLimiter::hit($key, 900); // 15 minutes
    }

    /**
     * Formater les données utilisateur pour la réponse
     */
    private function formatUserData(User $user): array
    {
        return [
            'id' => $user->id,
            'nom' => $user->nom,
            'email' => $user->email,
            'age' => $user->age,
            'localite' => $user->localite,
            'nationalite' => $user->nationalite,
            'telephone' => $user->telephone,
            'avatar_url' => $user->avatar_url,
            'is_admin' => $user->is_admin,
            'email_verified_at' => $user->email_verified_at,
            'last_login_at' => $user->last_login_at,
            'created_at' => $user->created_at,
        ];
    }
}