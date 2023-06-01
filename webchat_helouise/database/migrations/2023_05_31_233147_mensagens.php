<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{


        public function up(): void
        {
            Schema::create('mensagens', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('conversa_id')->nullable();
                $table->foreign('conversa_id')->references('id')->on('conversas')->onDelete('cascade');
                $table->text('conteudo');
                $table->timestamps();
            });
        }
    
        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('mensagens');
        }
    
};
    

