<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\Campeonato;
use App\Models\Time;
use App\Models\Partida;
use App\Http\Controllers\TabelaController;

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

    if ($usuario->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::post('/addTime', function (Request $request){
    $validate = $request->validate([
        'nome_enviado' => 'required|string'
    ]);

    $time = new App\Models\Time();
    $time->nome = $validate['nome_enviado'];
    if ($time->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::post('/addCampeonato', function (Request $request){
    $validate = $request->validate([
        'nome_enviado' => 'required|string',
        'ano_enviado' => 'required|string'
    ]);

    $campeonato = new App\Models\Campeonato();
    $campeonato->nome = $validate['nome_enviado'];
    $campeonato->ano = $validate['ano_enviado'];

    if ($campeonato->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::post('/addPartida', function (Request $request){
    $validate = $request->validate([
        'datapartida_enviada' => 'required|date',
        'horapartida_enviada' => 'required',
        'tipo_enviado' => 'required|string',
        'timea_enviado' => 'required|integer',
        'resultadoa_enviado' => 'integer',
        'timeb_enviado' => 'required|integer',
        'resultadob_enviado' => 'integer',
        'idcampeonato_enviado' => 'required|integer'
    ]);

    $partida = new App\Models\Partida();
    $partida->datapartida = $validate['datapartida_enviada'];
    $partida->horapartida = $validate['horapartida_enviada'];
    $partida->tipo = $validate['tipo_enviado'];
    $partida->timea = $validate['timea_enviado'];
    $partida->resultadoa = $validate['resultadoa_enviado'] ?? null;
    $partida->timeb = $validate['timeb_enviado'];
    $partida->resultadob = $validate['resultadob_enviado'] ?? null;
    $partida->idcampeonato = $validate['idcampeonato_enviado'];

    if ($partida->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

/*--------------------Rotas de List--------------------*/
Route::get('/tabela', [TabelaController::class, 'index']);

Route::get('/usuarios', function (Request $request){
    $usuarios = Usuario::all();
    return response()->json($usuarios);
});

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
            'token' => base64_encode($usuario->email),
            'user' => $usuario
        ]);
        
    }

    return response()->json(['error' => 'Usuário ou senha inválida'], 401);
});

// Route::get('/user', function (Request $request) {
    
// })->middleware('auth:sanctum');
