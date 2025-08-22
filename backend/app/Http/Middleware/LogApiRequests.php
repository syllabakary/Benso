<?php
// app/Http/Middleware/LogApiRequests.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogApiRequests
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $startTime = microtime(true);

        $response = $next($request);

        $duration = microtime(true) - $startTime;

        // Logger les requêtes API
        Log::channel('api')->info('API Request', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'user_id' => $request->user()?->id,
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'status_code' => $response->getStatusCode(),
            'duration_ms' => round($duration * 1000, 2),
            'memory_usage' => memory_get_peak_usage(true),
            'timestamp' => now()->toISOString(),
        ]);

        // Logger les erreurs séparément
        if ($response->getStatusCode() >= 400) {
            Log::channel('api_errors')->warning('API Error Response', [
                'method' => $request->method(),
                'url' => $request->fullUrl(),
                'status_code' => $response->getStatusCode(),
                'user_id' => $request->user()?->id,
                'ip' => $request->ip(),
                'response_body' => $response->getContent(),
            ]);
        }

        return $response;
    }
}