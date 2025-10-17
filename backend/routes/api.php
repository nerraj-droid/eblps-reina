<?php

use App\Http\Controllers\BusinessPermitController;
use App\Http\Controllers\PsicController;
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

// Test endpoint to verify API is working
Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working!',
        'timestamp' => now(),
        'status' => 'success'
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Business Permits API
Route::prefix('business-permits')->group(function () {
    Route::get('/', [BusinessPermitController::class, 'index']);
    Route::post('/', [BusinessPermitController::class, 'store']);
    Route::get('/{id}', [BusinessPermitController::class, 'show']);
    Route::put('/{id}', [BusinessPermitController::class, 'update']);
    Route::delete('/{id}', [BusinessPermitController::class, 'destroy']);
    Route::post('/{id}/approve', [BusinessPermitController::class, 'approve']);
    Route::post('/{id}/reject', [BusinessPermitController::class, 'reject']);
});

// Applications API (for now, using business permits)
Route::prefix('applications')->group(function () {
    Route::get('/', [BusinessPermitController::class, 'index']);
    Route::post('/', [BusinessPermitController::class, 'store']);
    Route::get('/{id}', [BusinessPermitController::class, 'show']);
    Route::put('/{id}', [BusinessPermitController::class, 'update']);
    Route::post('/{id}/submit', [BusinessPermitController::class, 'submit']);
});

// Constituents API (placeholder)
Route::prefix('constituents')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'data' => [],
            'message' => 'Constituents API endpoint'
        ]);
    });
});

// Payments API (placeholder)
Route::prefix('payments')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'data' => [],
            'message' => 'Payments API endpoint'
        ]);
    });
    Route::post('/', function (Request $request) {
        return response()->json([
            'data' => $request->all(),
            'message' => 'Payment processed successfully'
        ]);
    });
});

// PSIC API
Route::prefix('psic')->group(function () {
    Route::get('/', [PsicController::class, 'index']);
    Route::get('/search', [PsicController::class, 'search']);
    Route::get('/{psic}', [PsicController::class, 'show']);
});

// File API - Serve uploaded documents (with basic auth for security)
Route::prefix('files')->middleware('auth:sanctum')->group(function () {
    Route::get('/business-documents/{filename}', [BusinessPermitController::class, 'serveDocument']);
    Route::get('/business-permit/{permitId}/documents', [BusinessPermitController::class, 'getPermitDocuments']);
});

// Reports API (placeholder)
Route::prefix('reports')->group(function () {
    Route::get('/dashboard', function () {
        return response()->json([
            'data' => [
                'total_applications' => 1234,
                'active_permits' => 856,
                'pending_review' => 89,
                'revenue' => 2400000
            ],
            'message' => 'Dashboard statistics'
        ]);
    });
});
