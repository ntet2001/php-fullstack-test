<?php

use App\Http\Controllers\Api\BrandController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// get brands
Route::get('/brands',[BrandController::class, 'index']);

// add brand
Route::post('/brands',[BrandController::class, 'saveBrand']);

// update brand
Route::put('/brands/{id}',[BrandController::class, 'updateBrand']);

// delete brand
Route::delete('/brands/{id}',[BrandController::class, 'deleteBrand']);
