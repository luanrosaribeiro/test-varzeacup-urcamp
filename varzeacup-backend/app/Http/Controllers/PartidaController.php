<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartidaController extends Controller
{
    public function index(Request $request)
    {
        $query = "SELECT 	PARTIDAS.ID,
                        TO_CHAR(DATAPARTIDA,'DD/MM/YYYY') DATAPARTIDA,
                        HORAPARTIDA,
                        TIMEA.NOME TIMEA_NOME,
                        RESULTADOA,
                        RESULTADOB,
                        TIMEB.NOME TIMEB_NOME,
                        TIPO,
                        CAMPEONATOS.NOME CAMPEONATO_NOME
                    FROM PARTIDAS
                    INNER JOIN CAMPEONATOS ON PARTIDAS.IDCAMPEONATO = CAMPEONATOS.ID
                    INNER JOIN TIMES TIMEA ON TIMEA.ID = PARTIDAS.TIMEA 
                    INNER JOIN TIMES TIMEB ON TIMEB.ID = PARTIDAS.TIMEB
                    ORDER BY PARTIDAS.ID DESC";
        $tabela = DB::select($query);
        return response()->json($tabela);
    }
}