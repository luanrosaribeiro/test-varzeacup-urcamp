<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TabelaController extends Controller
{
    public function index(Request $request)
    {
        $query = "SELECT 
                    TIME,
                    ((PARTIDAS_GANHAS * 3) + PARTIDAS_EMPATADAS) AS PONTOS,
                    PARTIDAS_GANHAS AS VITORIAS,
                    PARTIDAS_PERDIDAS AS DERROTAS,
                    PARTIDAS_EMPATADAS AS EMPATES,
                    (PARTIDAS_GANHAS + PARTIDAS_PERDIDAS + PARTIDAS_EMPATADAS) AS PARTIDAS_JOGADAS
                FROM (
                    SELECT 
                        T.NOME AS TIME,
                        SUM(CASE 
                            WHEN (P.TIMEA = T.ID AND P.RESULTADOA > P.RESULTADOB) OR 
                                (P.TIMEB = T.ID AND P.RESULTADOB > P.RESULTADOA)
                            THEN 1 ELSE 0 END) AS PARTIDAS_GANHAS,
                        SUM(CASE 
                            WHEN (P.TIMEA = T.ID AND P.RESULTADOA < P.RESULTADOB) OR 
                                (P.TIMEB = T.ID AND P.RESULTADOB < P.RESULTADOA)
                            THEN 1 ELSE 0 END) AS PARTIDAS_PERDIDAS,
                        SUM(CASE 
                            WHEN P.RESULTADOA = P.RESULTADOB
                            THEN 1 ELSE 0 END) AS PARTIDAS_EMPATADAS
                    FROM TIMES T
                    LEFT JOIN PARTIDAS P 
                        ON (P.TIMEA = T.ID OR P.TIMEB = T.ID)
                    INNER JOIN CAMPEONATOS C 
                        ON P.IDCAMPEONATO = C.ID
                    WHERE C.ANO = TO_CHAR(CURRENT_DATE, 'YYYY')
                    GROUP BY T.NOME
                ) AS RESULTADO
                ORDER BY PONTOS DESC";
        $tabela = DB::select($query);
        return response()->json($tabela);
    }
}