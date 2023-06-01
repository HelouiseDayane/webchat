<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MensagemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'conversa_id'=>$this->conversa_id,
            'conteudo' => $this->conteudo,
            'create_at' =>$this->create_at,
            'update_at' =>$this->updated_at,
        ];
    }
}
