<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensagemController;
use App\Http\Controllers\ConversaController;

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

 
Route::apiResource('conversass', ConversaController::class);
Route::apiResource('mensagems', MensagemController::class);


Route::get('/conversas', [ConversaController::class, 'index']);
Route::get('/conversas/{id}', [ConversaController::class, 'show']);

Route::post('/conversas_salvas', [ConversaController::class, 'store']);
Route::get('/chat/{id}', [MensagemController::class, 'show']);

 