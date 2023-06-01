<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensagem extends Model
{
    use HasFactory;
    protected $table = 'mensagens';
    protected $fillable = ['conteudo', 'conversa_id'];

    public function conversa()
    {
        return $this->belongsTo(Conversa::class);
    }
}
