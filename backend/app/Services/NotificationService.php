<?php
// app/Services/NotificationService.php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Contact;
use App\Models\User;
use App\Models\Agent;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    /**
     * Envoyer notification de réservation
     */
    public function sendReservationNotification(Reservation $reservation): void
    {
        try {
            // Email de confirmation au client
            $this->sendReservationConfirmationEmail($reservation);

            // Notification à l'agent assigné
            if ($reservation->assignedAgent) {
                $this->notifyAgentOfNewReservation($reservation);
            }

            // Notification interne (admin)
            $this->notifyAdminOfNewReservation($reservation);

        } catch (\Exception $e) {
            Log::error('Erreur envoi notification réservation', [
                'reservation_id' => $reservation->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Email de confirmation de réservation au client
     */
    private function sendReservationConfirmationEmail(Reservation $reservation): void
    {
        $data = [
            'reservation' => $reservation,
            'client_name' => $reservation->nom,
            'reference' => $reservation->id,
            'property' => $reservation->property,
            'agent' => $reservation->assignedAgent,
            'company_name' => config('app.name'),
            'contact_email' => config('mail.from.address'),
            'contact_phone' => env('CONTACT_PHONE'),
            'whatsapp_number' => env('WHATSAPP_NUMBER'),
        ];

        Mail::send('emails.reservation-confirmation', $data, function ($message) use ($reservation) {
            $message->to($reservation->email, $reservation->nom)
                   ->subject('Confirmation de votre réservation - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Notifier l'agent d'une nouvelle réservation
     */
    private function notifyAgentOfNewReservation(Reservation $reservation): void
    {
        $data = [
            'agent_name' => $reservation->assignedAgent->nom,
            'reservation' => $reservation,
            'client_name' => $reservation->nom,
            'client_phone' => $reservation->telephone,
            'client_email' => $reservation->email,
            'property' => $reservation->property,
            'admin_url' => url('/admin/reservations/' . $reservation->id),
        ];

        Mail::send('emails.agent-new-reservation', $data, function ($message) use ($reservation) {
            $message->to($reservation->assignedAgent->email, $reservation->assignedAgent->nom)
                   ->subject('Nouvelle réservation assignée - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Notifier les admins d'une nouvelle réservation
     */
    private function notifyAdminOfNewReservation(Reservation $reservation): void
    {
        $admins = User::where('is_admin', true)->where('is_active', true)->get();

        foreach ($admins as $admin) {
            $data = [
                'admin_name' => $admin->nom,
                'reservation' => $reservation,
                'client_name' => $reservation->nom,
                'property' => $reservation->property,
                'agent' => $reservation->assignedAgent,
                'admin_url' => url('/admin/reservations/' . $reservation->id),
                'stats' => $this->getReservationStats(),
            ];

            Mail::send('emails.admin-new-reservation', $data, function ($message) use ($admin) {
                $message->to($admin->email, $admin->nom)
                       ->subject('Nouvelle réservation - BENSO Admin')
                       ->from(config('mail.from.address'), config('app.name'));
            });
        }
    }

    /**
     * Envoyer notification d'annulation
     */
    public function sendCancellationNotification(Reservation $reservation): void
    {
        try {
            // Email au client
            $this->sendCancellationConfirmationEmail($reservation);

            // Notification à l'agent
            if ($reservation->assignedAgent) {
                $this->notifyAgentOfCancellation($reservation);
            }

        } catch (\Exception $e) {
            Log::error('Erreur envoi notification annulation', [
                'reservation_id' => $reservation->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Email de confirmation d'annulation au client
     */
    private function sendCancellationConfirmationEmail(Reservation $reservation): void
    {
        $data = [
            'reservation' => $reservation,
            'client_name' => $reservation->nom,
            'reference' => $reservation->id,
            'property' => $reservation->property,
            'company_name' => config('app.name'),
            'contact_email' => config('mail.from.address'),
            'contact_phone' => env('CONTACT_PHONE'),
        ];

        Mail::send('emails.reservation-cancellation', $data, function ($message) use ($reservation) {
            $message->to($reservation->email, $reservation->nom)
                   ->subject('Annulation de votre réservation - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Notifier l'agent d'une annulation
     */
    private function notifyAgentOfCancellation(Reservation $reservation): void
    {
        $data = [
            'agent_name' => $reservation->assignedAgent->nom,
            'reservation' => $reservation,
            'client_name' => $reservation->nom,
            'property' => $reservation->property,
        ];

        Mail::send('emails.agent-reservation-cancelled', $data, function ($message) use ($reservation) {
            $message->to($reservation->assignedAgent->email, $reservation->assignedAgent->nom)
                   ->subject('Réservation annulée - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Envoyer notification de contact
     */
    public function sendContactNotification(Contact $contact): void
    {
        try {
            // Email de confirmation au client
            $this->sendContactConfirmationEmail($contact);

            // Notification aux admins ou agent assigné
            if ($contact->assigned_to) {
                $this->notifyAgentOfNewContact($contact);
            } else {
                $this->notifyAdminsOfNewContact($contact);
            }

        } catch (\Exception $e) {
            Log::error('Erreur envoi notification contact', [
                'contact_id' => $contact->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Email de confirmation de contact au client
     */
    private function sendContactConfirmationEmail(Contact $contact): void
    {
        $data = [
            'contact' => $contact,
            'client_name' => $contact->nom,
            'company_name' => config('app.name'),
            'contact_email' => config('mail.from.address'),
            'contact_phone' => env('CONTACT_PHONE'),
            'response_time' => '24 heures',
        ];

        Mail::send('emails.contact-confirmation', $data, function ($message) use ($contact) {
            $message->to($contact->email, $contact->nom)
                   ->subject('Confirmation de votre message - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Notifier l'agent d'un nouveau contact
     */
    private function notifyAgentOfNewContact(Contact $contact): void
    {
        $agent = Agent::find($contact->assigned_to);
        
        if (!$agent) return;

        $data = [
            'agent_name' => $agent->nom,
            'contact' => $contact,
            'client_name' => $contact->nom,
            'client_phone' => $contact->telephone,
            'client_email' => $contact->email,
            'admin_url' => url('/admin/contacts/' . $contact->id),
        ];

        Mail::send('emails.agent-new-contact', $data, function ($message) use ($agent) {
            $message->to($agent->email, $agent->nom)
                   ->subject('Nouveau message client - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Notifier les admins d'un nouveau contact
     */
    private function notifyAdminsOfNewContact(Contact $contact): void
    {
        $admins = User::where('is_admin', true)->where('is_active', true)->get();

        foreach ($admins as $admin) {
            $data = [
                'admin_name' => $admin->nom,
                'contact' => $contact,
                'client_name' => $contact->nom,
                'admin_url' => url('/admin/contacts/' . $contact->id),
                'stats' => $this->getContactStats(),
            ];

            Mail::send('emails.admin-new-contact', $data, function ($message) use ($admin) {
                $message->to($admin->email, $admin->nom)
                       ->subject('Nouveau message client - BENSO Admin')
                       ->from(config('mail.from.address'), config('app.name'));
            });
        }
    }

    /**
     * Envoyer notifications de rappel pour réservations en attente
     */
    public function sendReservationReminders(): void
    {
        $pendingReservations = Reservation::with(['assignedAgent'])
            ->where('status', 'en_attente')
            ->where('created_at', '<=', now()->subHours(24))
            ->where('created_at', '>=', now()->subDays(3))
            ->get();

        foreach ($pendingReservations as $reservation) {
            if ($reservation->assignedAgent) {
                $this->sendAgentReminderEmail($reservation);
            }
        }
    }

    /**
     * Email de rappel à l'agent
     */
    private function sendAgentReminderEmail(Reservation $reservation): void
    {
        $data = [
            'agent_name' => $reservation->assignedAgent->nom,
            'reservation' => $reservation,
            'client_name' => $reservation->nom,
            'days_pending' => $reservation->created_at->diffInDays(now()),
            'admin_url' => url('/admin/reservations/' . $reservation->id),
        ];

        Mail::send('emails.agent-reservation-reminder', $data, function ($message) use ($reservation) {
            $message->to($reservation->assignedAgent->email, $reservation->assignedAgent->nom)
                   ->subject('Rappel: Réservation en attente - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Envoyer newsletter aux utilisateurs
     */
    public function sendNewsletter(array $recipients, string $subject, string $content): void
    {
        foreach ($recipients as $recipient) {
            $data = [
                'user_name' => $recipient['nom'],
                'content' => $content,
                'unsubscribe_url' => url('/unsubscribe?email=' . $recipient['email']),
                'company_name' => config('app.name'),
            ];

            Mail::send('emails.newsletter', $data, function ($message) use ($recipient, $subject) {
                $message->to($recipient['email'], $recipient['nom'])
                       ->subject($subject . ' - BENSO')
                       ->from(config('mail.from.address'), config('app.name'));
            });
        }
    }

    /**
     * Envoyer notification de nouvelle propriété aux favoris
     */
    public function notifyFavoriteUsers(array $criteria): void
    {
        // Logique pour notifier les utilisateurs ayant des critères similaires
        $users = User::active()->get();

        foreach ($users as $user) {
            // Vérifier si l'utilisateur a des critères correspondants
            $userReservations = $user->reservations()
                ->where('type_transaction', $criteria['transaction_type'])
                ->where('localisation', 'LIKE', "%{$criteria['city']}%")
                ->exists();

            if ($userReservations) {
                $this->sendNewPropertyAlert($user, $criteria);
            }
        }
    }

    /**
     * Envoyer alerte nouvelle propriété
     */
    private function sendNewPropertyAlert(User $user, array $criteria): void
    {
        $data = [
            'user_name' => $user->nom,
            'property_type' => $criteria['type'],
            'city' => $criteria['city'],
            'price' => $criteria['price'],
            'search_url' => url('/recherche?' . http_build_query([
                'type' => $criteria['type'],
                'city' => $criteria['city'],
                'transaction_type' => $criteria['transaction_type']
            ])),
            'unsubscribe_url' => url('/unsubscribe?email=' . $user->email),
        ];

        Mail::send('emails.new-property-alert', $data, function ($message) use ($user) {
            $message->to($user->email, $user->nom)
                   ->subject('Nouvelle propriété correspondant à vos critères - BENSO')
                   ->from(config('mail.from.address'), config('app.name'));
        });
    }

    /**
     * Obtenir statistiques des réservations
     */
    private function getReservationStats(): array
    {
        return [
            'total_today' => Reservation::whereDate('created_at', today())->count(),
            'total_week' => Reservation::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'pending' => Reservation::where('status', 'en_attente')->count(),
        ];
    }

    /**
     * Obtenir statistiques des contacts
     */
    private function getContactStats(): array
    {
        return [
            'total_today' => Contact::whereDate('created_at', today())->count(),
            'total_week' => Contact::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'unread' => Contact::where('status', 'nouveau')->count(),
        ];
    }

    /**
     * Envoyer SMS (intégration future)
     */
    public function sendSMS(string $phone, string $message): bool
    {
        // Intégration avec un service SMS (Orange SMS API, Twilio, etc.)
        try {
            // Code d'intégration SMS
            Log::info('SMS envoyé', ['phone' => $phone, 'message' => $message]);
            return true;
        } catch (\Exception $e) {
            Log::error('Erreur envoi SMS', ['phone' => $phone, 'error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Envoyer notification WhatsApp (intégration future)
     */
    public function sendWhatsAppNotification(string $phone, string $message): bool
    {
        // Intégration avec WhatsApp Business API
        try {
            // Code d'intégration WhatsApp
            Log::info('WhatsApp envoyé', ['phone' => $phone, 'message' => $message]);
            return true;
        } catch (\Exception $e) {
            Log::error('Erreur envoi WhatsApp', ['phone' => $phone, 'error' => $e->getMessage()]);
            return false;
        }
    }
}