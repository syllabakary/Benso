<?php
// app/Http/Middleware/ValidateJsonMiddleware.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateJsonMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->isJson()) {
            $content = $request->getContent();
            
            if (!empty($content)) {
                json_decode($content);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Format JSON invalide',
                        'error' => json_last_error_msg()
                    ], 400);
                }
            }
        }

        return $next($request);
    }
}