<?php

use App\Http\Controllers\BusinessPermitController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('business-permits', BusinessPermitController::class);
Route::post('business-permits/{businessPermit}/approve', [BusinessPermitController::class, 'approve'])->name('business-permits.approve');
Route::post('business-permits/{businessPermit}/reject', [BusinessPermitController::class, 'reject'])->name('business-permits.reject');
