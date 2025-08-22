<?php
// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SearchController;

/*
|--------------------------------------------------------------------------
| API Routes - Version 1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    
    // Routes publiques (sans authentification)
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])->name('api.register');
        Route::post('/login', [AuthController::class, 'login'])->name('api.login');
    });

    // Propriétés publiques
    Route::prefix('properties')->group(function () {
        Route::get('/', [PropertyController::class, 'index'])->name('api.properties.index');
        Route::get('/search', [PropertyController::class, 'search'])->name('api.properties.search');
        Route::get('/featured', [PropertyController::class, 'featured'])->name('api.properties.featured');
        Route::get('/sponsored', [PropertyController::class, 'sponsored'])->name('api.properties.sponsored');
        Route::get('/recent', [PropertyController::class, 'recent'])->name('api.properties.recent');
        Route::get('/statistics', [PropertyController::class, 'statistics'])->name('api.properties.statistics');
        Route::get('/{id}', [PropertyController::class, 'show'])->name('api.properties.show');
    });

    // Réservations publiques
    Route::prefix('reservations')->group(function () {
        Route::post('/', [ReservationController::class, 'store'])->name('api.reservations.store');
        Route::post('/check-status', [ReservationController::class, 'checkStatus'])->name('api.reservations.check-status');
    });

    // Contact public
    Route::post('/contact', [ContactController::class, 'store'])->name('api.contact.store');

    // Routes protégées (authentification requise)
    Route::middleware('auth:api')->group(function () {
        
        // Authentification
        Route::prefix('auth')->group(function () {
            Route::get('/me', [AuthController::class, 'me'])->name('api.me');
            Route::put('/profile', [AuthController::class, 'updateProfile'])->name('api.profile.update');
            Route::put('/password', [AuthController::class, 'changePassword'])->name('api.password.change');
            Route::post('/refresh', [AuthController::class, 'refresh'])->name('api.refresh');
            Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
            Route::delete('/account', [AuthController::class, 'deleteAccount'])->name('api.account.delete');
        });

        // Réservations utilisateur
        Route::prefix('reservations')->group(function () {
            Route::get('/', [ReservationController::class, 'index'])->name('api.reservations.index');
            Route::get('/statistics', [ReservationController::class, 'statistics'])->name('api.reservations.statistics');
            Route::get('/{id}', [ReservationController::class, 'show'])->name('api.reservations.show');
            Route::put('/{id}/cancel', [ReservationController::class, 'cancel'])->name('api.reservations.cancel');
        });

        // Favoris
        Route::prefix('favorites')->group(function () {
            Route::get('/', [FavoriteController::class, 'index'])->name('api.favorites.index');
            Route::post('/', [FavoriteController::class, 'store'])->name('api.favorites.store');
            Route::delete('/{id}', [FavoriteController::class, 'destroy'])->name('api.favorites.destroy');
            Route::post('/toggle', [FavoriteController::class, 'toggle'])->name('api.favorites.toggle');
        });
    });
});

/*
|--------------------------------------------------------------------------
| API Routes - Version 2 (Future)
|--------------------------------------------------------------------------
*/

Route::prefix('v2')->group(function () {
    // Routes v2 avec nouvelles fonctionnalités
    Route::get('/properties', [PropertyController::class, 'indexV2']);
});

/*
|--------------------------------------------------------------------------
| Routes de fallback et healthcheck
|--------------------------------------------------------------------------
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
        'version' => config('app.version', '1.0.0'),
        'environment' => config('app.env'),
    ]);
});

Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Endpoint non trouvé',
        'available_versions' => ['v1', 'v2']
    ], 404);
});

// ==========================================

