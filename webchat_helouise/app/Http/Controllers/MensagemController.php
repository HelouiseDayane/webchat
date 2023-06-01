<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoremensagemRequest;
use App\Http\Requests\UpdatemensagemRequest;
use App\Models\Mensagem;
use App\Models\Conversa;
use App\Http\Resources\MensagemResource;

class MensagemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mensagens = Mensagem::all();
        return MensagemResource::collection($mensagens);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoremensagemRequest $request)
    {
        $mensagem = Mensagem::create($request->all());
        return new MensagemResource($mensagem);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {     
        $conversa = Conversa::findOrFail($id);
        $mensagens = Mensagem::where('conversa_id', $id)->get();

        return view('chat', compact('conversa', 'mensagens'));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatemensagemRequest $request, Mensagem $mensagem)
    {
        $mensagem->update($request->all());
        return new MensagemResource($mensagem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(mensagem $mensagem)
    {
        $mensagem->delete();
        return response()->json(null,204);
    }

   
}
