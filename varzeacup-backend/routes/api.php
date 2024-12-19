<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\Campeonato;
use App\Models\Time;
use App\Models\Partida;

 /*--------------------Rotas de Add--------------------*/

Route::post('/addUsuario', function (Request $request) {
    $validate = $request->validate([
        'nome_enviado' => 'required|string',
        'email_enviado' => 'required|string|email|unique:usuarios,email',
        'senha_enviada' => 'required|string|min:6'
    ]);

    $usuario = new App\Models\Usuario();
    $usuario->nome = $validate['nome_enviado'];
    $usuario->email = $validate['email_enviado'];
    $usuario->senha = bcrypt($validate['senha_enviada']);

    $usuario->save();

    return response()->json(['status' => 'success'], 201);
});

Route::post('/addTime', function (Request $request){
    $validate = $request->validate([
        'nome_enviado' => 'required|string'
    ]);

    $time = new App\Models\Time();
    $time->nome = $validate['nome_enviado'];
    $time->save();

    return response()->json(['status' => 'success'], 201);
});

Route::post('/addCampeonato', function (Request $request){
    $validate = $request->validate([
        'nome_enviado' => 'required|string',
        'ano_enviado' => 'required|string'
    ]);

    $campeonato = new App\Models\Campeonato();
    $campeonato->nome = $validate['nome_enviado'];
    $campeonato->ano = $validate['ano_enviado'];
    $campeonato->save();

    return response()->json(['status' => 'success'], 201);
});

Route::post('/addPartida', function (Request $request){
    $validate = $request->validate([
        'datapartida_enviada' => 'required|date',
        'horapartida_enviada' => 'required|date',
        'tipo_enviado' => 'required|string',
        'timea_enviado' => 'required|integer',
        'resultadoa_enviado' => 'required|integer',
        'timeb_enviado' => 'required|integer',
        'resultadob_enviado' => 'required|integer',
        'idcampeonato_enviado' => 'required|integer'
    ]);

    $partida = new App\Models\Partida();
    $partida->datapartida = $validate['datapartida_enviada'];
    $partida->horapartida = $validate['horapartida_enviada'];
    $partida->tipo = $validate['tipo_enviado'];
    $partida->timea = $validate['timea_enviado'];
    $partida->resultadoa = $validate['resultadoa_enviado'];
    $partida->timeb = $validate['timeb_enviado'];
    $partida->resultadob = $validate['resultadob_enviado'];
    $partida->idcampeonato = $validate['idcampeonato_enviado'];
    $partida->save();

    return response()->json(['status' => 'success'], 201);
});

/*--------------------Rotas de List--------------------*/

/*--------------------Rotas de Delete--------------------*/

/*--------------------Rota de Login--------------------*/
Route::post('/login', function(Request $request){
    $dados = $request->validate([
        'email_enviado' => 'required|email',
        'senha_enviada' => 'required'
    ]);

    $usuario = App\Models\Usuario::where('email', $dados['email_enviado'])->first();

    if($usuario && Hash::check($dados['senha_enviada'], $usuario->senha)){
        return response()->json([
            'status' => 'Login efetuado com sucesso',
            'user' => $usuario
        ]);
        
    }

    return response()->json(['error' => 'Usuário ou senha inválida'], 401);
});

// Route::get('/user', function (Request $request) {
    
// })->middleware('auth:sanctum');
