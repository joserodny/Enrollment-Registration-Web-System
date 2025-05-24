<?php

use App\Http\Controllers\AdminDashBoardController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);

// Enrollment routes
Route::post('/register', [AuthController::class, 'register']);
Route::get('/confirm-enrollment/{token}', [AuthController::class, 'confirmEnrollment']);
Route::post('/complete-registration', [AuthController::class, 'completeRegistration']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/authenticated-user', [AuthController::class, 'authenticatedUser']);

    // Admin Dashboard
    Route::get('/enrollees', [AdminDashBoardController::class, 'index']);
});
// End Authentication routes



