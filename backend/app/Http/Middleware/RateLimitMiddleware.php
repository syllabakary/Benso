<?php
// app/Http/Middleware/RateLimitMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Exceptions\ThrottleRequestsException;

class RateLimitMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $keyPrefix = 'api', int $maxAttempts = 60, int $decayMinutes = 1)
    {
        $key = $this->resolveRequestSignature($request, $keyPrefix);

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            throw $this->buildException($request, $key, $maxAttempts, $decayMinutes);
        }

        RateLimiter::increment($key, $decayMinutes * 60);

        $response = $next($request);

        return $this->addHeaders(
            $response, $maxAttempts,
            RateLimiter::retriesLeft($key, $maxAttempts)
        );
    }

    /**
     * Resolve request signature.
     */
    protected function resolveRequestSignature(Request $request, string $keyPrefix): string
    {
        $userId = $request->user()?->id;
        
        if ($userId) {
            return $keyPrefix . ':user:' . $userId;
        }

        return $keyPrefix . ':ip:' . $request->ip();
    }

    /**
     * Create a 'too many attempts' exception.
     */
    protected function buildException(Request $request, string $key, int $maxAttempts, int $decayMinutes): ThrottleRequestsException
    {
        $retryAfter = RateLimiter::availableIn($key);

        $headers = $this->getHeaders(
            $maxAttempts,
            0,
            $retryAfter
        );

        return new ThrottleRequestsException(
            'Trop de requêtes. Réessayez dans ' . $retryAfter . ' secondes.',
            null,
            $headers
        );
    }

    /**
     * Add the limit header information to the given response.
     */
    protected function addHeaders($response, int $maxAttempts, int $remainingAttempts, ?int $retryAfter = null)
    {
        $headers = $this->getHeaders($maxAttempts, $remainingAttempts, $retryAfter);

        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value, false);
        }

        return $response;
    }

    /**
     * Get the limit headers.
     */
    protected function getHeaders(int $maxAttempts, int $remainingAttempts, ?int $retryAfter = null): array
    {
        $headers = [
            'X-RateLimit-Limit' => $maxAttempts,
            'X-RateLimit-Remaining' => max(0, $remainingAttempts),
        ];

        if (!is_null($retryAfter)) {
            $headers['Retry-After'] = $retryAfter;
            $headers['X-RateLimit-Reset'] = time() + $retryAfter;
        }

        return $headers;
    }
}
