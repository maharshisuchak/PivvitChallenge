<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;

class validateJWTToken extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! $token = $this->auth->setRequest($request)->getToken()) {
            return response()->json(['status'  => 401, 
                'message'       => "Request parameter missing.", 
                'payload'       => ['error' => "Please provide the access token."],
                'pager'         => NULL ], 401);
        }

        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return response()->json(['status'  => 401, 
                'message'       => "It seems like your session timed out. Please login again to continue.", 
                'payload'       => ['error' => "The token has been expired."],
                'pager'         => NULL ], 401);
        } catch (JWTException $e) {
            return response()->json(['status'  => 401, 
                'message'       => "It seems like your session timed out. Please login again to continue.", 
                'payload'       => ['error' => "Please provide valid access token"],
                'pager'         => NULL ], 401);
        }

        if (! $user) {
            return response()->json(['status'  => 401, 
                'message'       => "No such user exists.", 
                'payload'       => ['error' => "No such user exists"],
                'pager'         => NULL ], 401);
        }

        $this->events->fire('tymon.jwt.valid', $user);

        return $next($request);
    }
}
