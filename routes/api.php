<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Login user
Route::post('/login',[
	'middleware'	=> 'throttle:20,1',
	'uses'			=> 'Auth\AuthController@login'
]);

Route::group(['middleware' => 'jwt.auth'], function(){
	// Create a purchase
	Route::post('/purchases', [
		'uses'		=> 'PurchaseController@store'
	]);
	// Get purchases
	Route::get('/purchases', [
		'uses'		=> 'PurchaseController@index'
	]);
	// Get offerings
	Route::get('/offering', [
		'uses'		=> 'OfferingController@index'
	]);
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
