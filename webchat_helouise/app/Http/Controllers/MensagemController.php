<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoremensagemRequest;
use App\Http\Requests\UpdatemensagemRequest;
use App\Models\Mensagem;
use App\Models\Conversa;
use App\Http\Resources\MensagemResource;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'conteudo' => 'required',
            'id_conversa' => 'required',
        ]);
    
        $mensagem = new Mensagem();
        $mensagem->conteudo = $request->input('conteudo');
        $mensagem->conversa_id = $request->input('id_conversa');
        $mensagem->save();
    
        return response()->json([
            'mensagem' => $mensagem,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {     
        $conversa = Conversa::findOrFail($id);
        $mensagens = Mensagem::where('conversa_id', $id)->get();
    
        return response()->json([
            'conversa' => $conversa,
            'mensagens' => $mensagens
        ]);
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


        public function getMensagens($id)
        {
            $mensagens = Mensagem::where('conversa_id', $id)->get();

            return response()->json([
                'data' => $mensagens
            ]);
        }
   
}