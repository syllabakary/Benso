<?php
// routes/admin.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\AdvertisementController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['web', 'auth', 'admin'])->group(function () {
    
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Gestion des propriétés
    Route::prefix('properties')->group(function () {
        Route::get('/', [PropertyController::class, 'index'])->name('admin.properties.index');
        Route::get('/create', [PropertyController::class, 'create'])->name('admin.properties.create');
        Route::post('/', [PropertyController::class, 'store'])->name('admin.properties.store');
        Route::get('/{property}', [PropertyController::class, 'show'])->name('admin.properties.show');
        Route::get('/{property}/edit', [PropertyController::class, 'edit'])->name('admin.properties.edit');
        Route::put('/{property}', [PropertyController::class, 'update'])->name('admin.properties.update');
        Route::delete('/{property}', [PropertyController::class, 'destroy'])->name('admin.properties.destroy');
        
        // Actions spéciales
        Route::put('/{property}/toggle-featured', [PropertyController::class, 'toggleFeatured'])->name('admin.properties.toggle-featured');
        Route::put('/{property}/toggle-sponsored', [PropertyController::class, 'toggleSponsored'])->name('admin.properties.toggle-sponsored');
        Route::put('/{property}/status', [PropertyController::class, 'updateStatus'])->name('admin.properties.status');
        
        // Images
        Route::post('/{property}/images', [PropertyController::class, 'uploadImages'])->name('admin.properties.images.upload');
        Route::delete('/images/{image}', [PropertyController::class, 'deleteImage'])->name('admin.properties.images.delete');
    });

    // Gestion des utilisateurs
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('admin.users.index');
        Route::get('/{user}', [UserController::class, 'show'])->name('admin.users.show');
        Route::put('/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('admin.users.toggle-status');
        Route::put('/{user}/toggle-admin', [UserController::class, 'toggleAdmin'])->name('admin.users.toggle-admin');
        Route::delete('/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
    });

    // Gestion des réservations
    Route::prefix('reservations')->group(function () {
        Route::get('/', [ReservationController::class, 'index'])->name('admin.reservations.index');
        Route::get('/{reservation}', [ReservationController::class, 'show'])->name('admin.reservations.show');
        Route::put('/{reservation}/status', [ReservationController::class, 'updateStatus'])->name('admin.reservations.status');
        Route::put('/{reservation}/assign', [ReservationController::class, 'assignAgent'])->name('admin.reservations.assign');
        Route::put('/{reservation}/priority', [ReservationController::class, 'updatePriority'])->name('admin.reservations.priority');
    });

    // Gestion des contacts
    Route::prefix('contacts')->group(function () {
        Route::get('/', [ContactController::class, 'index'])->name('admin.contacts.index');
        Route::get('/{contact}', [ContactController::class, 'show'])->name('admin.contacts.show');
        Route::put('/{contact}/status', [ContactController::class, 'updateStatus'])->name('admin.contacts.status');
        Route::put('/{contact}/assign', [ContactController::class, 'assignAgent'])->name('admin.contacts.assign');
        Route::post('/{contact}/reply', [ContactController::class, 'reply'])->name('admin.contacts.reply');
    });

    // Gestion des publicités
    Route::prefix('advertisements')->group(function () {
        Route::get('/', [AdvertisementController::class, 'index'])->name('admin.advertisements.index');
        Route::get('/create', [AdvertisementController::class, 'create'])->name('admin.advertisements.create');
        Route::post('/', [AdvertisementController::class, 'store'])->name('admin.advertisements.store');
        Route::get('/{advertisement}', [AdvertisementController::class, 'show'])->name('admin.advertisements.show');
        Route::get('/{advertisement}/edit', [AdvertisementController::class, 'edit'])->name('admin.advertisements.edit');
        Route::put('/{advertisement}', [AdvertisementController::class, 'update'])->name('admin.advertisements.update');
        Route::delete('/{advertisement}', [AdvertisementController::class, 'destroy'])->name('admin.advertisements.destroy');
        Route::put('/{advertisement}/toggle-status', [AdvertisementController::class, 'toggleStatus'])->name('admin.advertisements.toggle-status');
    });

    // API endpoints pour l'admin (AJAX)
    Route::prefix('api')->group(function () {
        Route::get('/stats', [AdminController::class, 'getStats'])->name('admin.api.stats');
        Route::get('/chart-data/{type}', [AdminController::class, 'getChartData'])->name('admin.api.chart-data');
        Route::get('/recent-activities', [AdminController::class, 'getRecentActivities'])->name('admin.api.recent-activities');
        Route::post('/bulk-actions', [AdminController::class, 'bulkActions'])->name('admin.api.bulk-actions');
    });
});

// Login admin (si différent du login utilisateur)
Route::prefix('admin')->middleware('web')->group(function () {
    Route::get('/login', [AdminController::class, 'showLoginForm'])->name('admin.login.form');
    Route::post('/login', [AdminController::class, 'login'])->name('admin.login');
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
});