<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\Usuario;
use App\Models\Campeonato;
use App\Models\Time;
use App\Models\Partida;
use App\Http\Controllers\TabelaController;
use App\Http\Controllers\PartidaController;

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
    Log::info('Dados recebidos:', $request->all());
    $validate = $request->validate([
        'datapartida_enviada' => 'required|date',
        'horapartida_enviada' => 'required',
        'tipo_enviado' => 'required|string',
        'timea_enviado' => 'required|integer',
        'resultadoa_enviado' => 'nullable|integer',
        'timeb_enviado' => 'required|integer',
        'resultadob_enviado' => 'nullable|integer',
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

Route::get('/usuarios/{id}', function($id){
    return App\Models\Usuario::find($id);
});

Route::get('/times', function (Request $request){
    $times = Time::all();
    return response()->json($times);
});

Route::get('/times/{id}', function($id){
    return App\Models\Time::find($id);
});

Route::get('/campeonatos', function (Request $request){
    $campeonato = Campeonato::all();
    return response()->json($campeonato);
});

Route::get('/campeonatos/{id}', function($id){
    return App\Models\Campeonato::find($id);
});

Route::get('/partidas', [PartidaController::class, 'index']);

Route::get('/partidas/{id}', function($id){
    return App\Models\Partida::find($id);
});

/*--------------------Rotas de Update--------------------*/
Route::put('/usuarios/{id}', function(Request $request, $id) {
    \Log::info('Dados recebidos:', $request->all());

    $usuario = App\Models\Usuario::find($id);

    if (!$usuario) {
        return response()->json(['error' => 'Usuário não encontrado.'], 404);
    }

    $usuario->nome = $request['nome_enviado'];
    $usuario->email = $request['email_enviado'];
    if ($request->filled('senha_enviada')) {
        $usuario->senha = bcrypt($request['senha_enviada']);
    }
    if ($usuario->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::put('/campeonatos/{id}', function(Request $request, $id) {
    $campeonato = App\Models\Campeonato::find($id);

    if (!$campeonato) {
        return response()->json(['error' => 'Usuário não encontrado.'], 404);
    }

    $campeonato->nome = $request['nome_enviado'];
    $campeonato->ano = $request['ano_enviado'];
    if ($campeonato->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::put('/times/{id}', function(Request $request, $id) {
    $time = App\Models\Time::find($id);

    if (!$time) {
        return response()->json(['error' => 'Usuário não encontrado.'], 404);
    }

    $time->nome = $request['nome_enviado'];
    if ($time->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

Route::put('/partidas/{id}', function(Request $request, $id) {
    $id = (int) $id;
    $partida = App\Models\Partida::find($id);

    if (!$partida) {
        return response()->json(['error' => 'Usuário não encontrado.'], 404);
    }

    $partida->datapartida = $request['datapartida_enviada'];
    $partida->horapartida = $request['horapartida_enviada'];
    $partida->tipo = $request['tipo_enviado'];
    $partida->timea = $request['timea_enviado'];
    $partida->resultadoa = $request['resultadoa_enviado'] ?? null;
    $partida->timeb = $request['timeb_enviado'];
    $partida->resultadob = $request['resultadob_enviado'] ?? null;
    $partida->idcampeonato = $request['idcampeonato_enviado'];
    if ($partida->save()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});


/*--------------------Rotas de Delete--------------------*/
Route::delete('/usuarios/{id}', function ($id) {
    $usuario = App\Models\Usuario::find($id);

    if (!$usuario) {
        return response()->json(['error' => 'Usuário não encontrado.'], 404);
    }

    if ($usuario->delete()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});
Route::delete('/campeonatos/{id}', function ($id) {
    $campeonato = App\Models\Campeonato::find($id);

    if (!$campeonato) {
        return response()->json(['error' => 'Campeonato não encontrado.'], 404);
    }

    if ($campeonato->delete()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});
Route::delete('/times/{id}', function ($id) {
    $time = App\Models\Time::find($id);

    if (!$time) {
        return response()->json(['error' => 'Times não encontrado.'], 404);
    }

    if ($time->delete()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});
Route::delete('/partidas/{id}', function ($id) {
    $partida = App\Models\Partida::find($id);

    if (!$partida) {
        return response()->json(['error' => 'Partida não encontrado.'], 404);
    }

    if ($partida->delete()) {
        return response()->json(['status' => 'success'], 201);
    } else {
        return response()->json(['status' => 'error'], 500);
    }
});

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
