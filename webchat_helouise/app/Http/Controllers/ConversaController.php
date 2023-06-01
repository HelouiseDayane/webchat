<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConversaRequest;
use App\Http\Requests\UpdateConversaRequest;
use App\Models\Conversa;
use App\Http\Resources\ConversaResource;

class ConversaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $conversas = Conversa::all();
        return ConversaResource::collection($conversas);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConversaRequest $request)
    {
        $conversa = Conversa::create($request->all());
        return new ConversaResource($conversa);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversa $conversa)
    {
        return new ConversaResource($conversa);
    }

 

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConversaRequest $request, Conversa $conversa)
    {
        $conversa->update($request->all());
        return new ConversaResource($conversa);   
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversa $conversa)
    {
        $conversa->delete();
        return response()->json(null, 204);
    }
}
