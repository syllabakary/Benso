<?php
// app/Http/Controllers/Api/ContactController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\RateLimiter;

class ContactController extends Controller
{
    protected NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    /**
     * Envoyer un message de contact
     */
    public function store(ContactRequest $request): JsonResponse
    {
        try {
            // Rate limiting spécifique aux contacts
            $key = 'contact|' . $request->ip();
            
            if (RateLimiter::tooManyAttempts($key, 3)) {
                $seconds = RateLimiter::availableIn($key);
                
                return response()->json([
                    'success' => false,
                    'message' => "Trop de messages envoyés. Réessayez dans {$seconds} secondes.",
                    'error_code' => 'RATE_LIMIT_EXCEEDED'
                ], 429);
            }

            // Créer le contact
            $contactData = $request->validated();
            $contactData['ip_address'] = $request->ip();
            $contactData['user_agent'] = $request->userAgent();
            $contactData['source'] = 'api';

            $contact = Contact::create($contactData);

            // Incrémenter le rate limit
            RateLimiter::increment($key, 3600); // 1 heure

            // Envoyer les notifications
            $this->notificationService->sendContactNotification($contact);

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
                'data' => [
                    'contact_id' => $contact->id,
                    'reference' => $contact->id,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi du message',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}