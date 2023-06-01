<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConversaRequest;
use App\Http\Requests\UpdateConversaRequest;
use App\Models\Conversa;
use App\Http\Resources\ConversaResource;
use Illuminate\Http\Request;


class ConversaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        
        $conversas = Conversa::all();
        return response()->json(['data' => $conversas]);
    }

   

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConversaRequest $request)
    {
        $conversa = new Conversa;
        $conversa->titulo = $request->input('titulo');
        $conversa->save();

        return response()->json([
            'id' => $conversa->id,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $conversa = Conversa::findOrFail($id);
        $mensagens = $conversa->mensagens;
    
        return response()->json([
            'data' => $mensagens,
        ]);
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

    public function getMensagens(Conversa $conversa)
    {
        $mensagens = $conversa->mensagens;
        return response()->json(['data' => $mensagens]);
    }
}
