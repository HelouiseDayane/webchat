<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversa extends Model
{
    use HasFactory;
    protected $fillable = ['titulo'];
    
    public function mensagens()
    {
        return $this->hasMany(Mensagem::class);
    }
}
