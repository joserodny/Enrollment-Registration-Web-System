<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Authencation routes
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/authenticated-user', [AuthController::class, 'authenticatedUser']);
});
// End Authencation routes


// Enrollment routes
Route::post('/register', [AuthController::class, 'register']);
Route::get('/confirm-enrollment/{token}', [AuthController::class, 'confirmEnrollment']);
Route::post('/complete-registration', [AuthController::class, 'completeRegistration']);
