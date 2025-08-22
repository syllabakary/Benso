<?php
// app/Http/Middleware/ApiVersionMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiVersionMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $version = 'v1')
    {
        $requestedVersion = $request->header('Accept-Version', $version);
        
        // Valider la version
        if (!in_array($requestedVersion, ['v1', 'v2'])) {
            return response()->json([
                'success' => false,
                'message' => 'Version d\'API non supportée',
                'supported_versions' => ['v1', 'v2']
            ], 400);
        }

        // Ajouter la version à la requête
        $request->attributes->set('api_version', $requestedVersion);

        $response = $next($request);

        // Ajouter les headers de version dans la réponse
        $response->headers->set('API-Version', $requestedVersion);
        $response->headers->set('API-Supported-Versions', 'v1,v2');

        return $response;
    }
}
