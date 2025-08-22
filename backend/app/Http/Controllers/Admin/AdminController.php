<?php
// app/Http/Controllers/Admin/AdminController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\User;
use App\Models\Reservation;
use App\Models\Contact;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Middleware pour protéger les routes admin
     */
    public function __construct()
    {
        $this->middleware(['auth', 'admin']);
    }

    /**
     * Dashboard principal
     * Retourne les statistiques globales, les dernières réservations et contacts,
     * et les propriétés les plus populaires.
     */
    public function dashboard()
    {
        $stats = [
            'total_properties' => Property::count(),
            'active_properties' => Property::active()->count(),
            'total_users' => User::clients()->count(),
            'new_users_this_month' => User::clients()
                ->whereMonth('created_at', Carbon::now()->month)
                ->count(),
            'pending_reservations' => Reservation::pending()->count(),
            'total_reservations' => Reservation::count(),
            'unread_contacts' => Contact::where('status', 'nouveau')->count(),
            'total_views' => Property::sum('views_count'),
        ];

        $recentReservations = Reservation::with('property', 'user')
            ->latest()
            ->limit(10)
            ->get();

        $recentContacts = Contact::latest()
            ->limit(5)
            ->get();

        $popularProperties = Property::with('images')
            ->orderByDesc('views_count')
            ->limit(5)
            ->get();

        // Statistiques mensuelles
        $monthlyStats = $this->getMonthlyStats();

        return response()->json([
            'stats' => $stats,
            'recent_reservations' => $recentReservations,
            'recent_contacts' => $recentContacts,
            'popular_properties' => $popularProperties,
            'monthly_stats' => $monthlyStats,
        ]);
    }

    /**
     * Génère des statistiques mensuelles pour les propriétés, réservations et utilisateurs
     */
    private function getMonthlyStats()
    {
        $months = collect();

        for ($i = 11; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);

            $months->push([
                'month' => $date->format('M Y'),
                'properties' => Property::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'reservations' => Reservation::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'users' => User::clients()
                    ->whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ]);
        }

        return $months;
    }

    /**
     * Statistiques détaillées pour les graphiques / analyses
     */
    public function statistics()
    {
        return response()->json([
            'properties_by_type' => Property::selectRaw('type, COUNT(*) as count')
                ->groupBy('type')
                ->pluck('count', 'type'),

            'properties_by_city' => Property::selectRaw('city, COUNT(*) as count')
                ->groupBy('city')
                ->orderByDesc('count')
                ->limit(10)
                ->pluck('count', 'city'),

            'properties_by_status' => Property::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),

            'reservations_by_status' => Reservation::selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),

            'monthly_revenue' => $this->getMonthlyRevenue(),
        ]);
    }

    /**
     * Calcule le revenu mensuel basé sur les réservations confirmées
     */
    private function getMonthlyRevenue()
    {
        return Reservation::selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) * 50000 as revenue')
            ->where('status', 'confirme')
            ->whereYear('created_at', Carbon::now()->year)
            ->groupByRaw('YEAR(created_at), MONTH(created_at)')
            ->orderByRaw('year, month')
            ->get()
            ->mapWithKeys(function ($item) {
                return [Carbon::create($item->year, $item->month)->format('M Y') => $item->revenue];
            });
    }
}
