<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller {

    public function login(Request $request) {
 		
        try {
             //check validation for the request
            $validator = app('validator')->make($request->all(), [
                'email'      => 'required|email',
                'password'        => 'required'
            ]);

            $credentials = $request->only('email', 'password');

            if ($validator->fails())
                return response()->json(['status'   => 422, 
                        'message'       => "Request parameter missing.", 
                        'payload'       => ['error' => $validator->errors()->first()],
                        'pager'         => NULL ], 422);


            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                 return response()->json(['status'  => 401, 
                    'message'       => "Invalid Credentials!", 
                    'payload'       => ['error' => "Invalid Credentials!"],
                    'pager'         => NULL ], 401);
            }

            $user = \JWTAuth::authenticate($token);

            return response()->json(['status'  => 200, 
                    'message'       => "Login successful!", 
                    'payload'       => ['token' => $token, 'user' => $user,],
                    'pager'         => NULL ], 200);

        } catch (JWTException $e) {

            \Log::error("Login failed : ".$e->getMessage());
            // something went wrong
            return response()->json(['status'  => 500, 
                    'message'       => "Invalid Credentials!", 
                    'payload'       => ['error' => 'Invalid Credentials!'],
                    'pager'         => NULL ], 500);
        }catch (\Exception $e) {

            \Log::error("Login failed : ".$e->getMessage());
            // something went wrong
            return response()->json(['status'  => 500, 
                'message'       => "Something went wrong!", 
                'payload'       => ['error' => 'Something went wrong!'],
                'pager'         => NULL ], 500);
        }
    }

}