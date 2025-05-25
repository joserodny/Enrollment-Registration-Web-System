<?php

use App\Http\Controllers\AdminDashBoardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ParentDashBoardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);
// Enrollment
Route::post('/register', [AuthController::class, 'register']);
// Parent Confirm email and password setup
Route::post('/confirm-email', [AuthController::class, 'confirmEmail']);
Route::post('/set-password', [AuthController::class, 'setPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Admin Dashboard
    Route::get('/enrollees', [AdminDashBoardController::class, 'index']);
    Route::get('/export-enrollees', [AdminDashBoardController::class, 'exportEnrollees']);

    // Parent Dashboard
    Route::get('/my-children', [ParentDashBoardController::class, 'index']);

});




