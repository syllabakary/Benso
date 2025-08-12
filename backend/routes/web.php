<?php
// routes/web.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\PropertyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Page d'accueil publique
Route::get('/', [HomeController::class, 'index'])->name('home');

// Pages de propriétés (pour SEO)
Route::prefix('proprietes')->group(function () {
    Route::get('/', [PropertyController::class, 'index'])->name('properties.index');
    Route::get('/{id}-{slug?}', [PropertyController::class, 'show'])->name('properties.show');
});

// Redirections pour compatibilité
Route::redirect('/properties', '/proprietes');
Route::redirect('/property/{id}', '/proprietes/{id}');

// Sitemap XML
Route::get('/sitemap.xml', [HomeController::class, 'sitemap'])->name('sitemap');

// Robots.txt
Route::get('/robots.txt', function () {
    $content = "User-agent: *\n";
    $content .= "Disallow: /admin/\n";
    $content .= "Disallow: /api/\n";
    $content .= "Allow: /\n";
    $content .= "Sitemap: " . url('/sitemap.xml') . "\n";
    
    return response($content)->header('Content-Type', 'text/plain');
});
