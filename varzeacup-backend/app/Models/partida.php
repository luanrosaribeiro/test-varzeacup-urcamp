<?php
    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    
    class Partida extends Model
    {
        use HasFactory;
    
        protected $table = 'partidas';
    
        protected $fillable = [
            'datapartida',
            'horapartida',
            'tipo',
            'timea',
            'resultadoa',
            'timeb',
            'resultadob',
            'idcampeonato'
        ];

        public $timestamps = false;

    }

    