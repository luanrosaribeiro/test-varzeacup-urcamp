import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import API from './Api';

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha) {
      setError("A senha é obrigatória.");
      return;
    }
    try{
      const response = await API.login(email,senha);
      window.location.href = '/index';
    }catch (error) {
      setError(error.message || 'Erro ao fazer login. Tente novamente.');
  }
    
  };
  return (
    <>
      <h1>VarzeaCP</h1>
      <h3>Efetue seu Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Digite o seu e-mail' value={email} required onChange={(e) => setEmail(e.target.value)}></input>
        <input type='password' name='senha' placeholder='Digite a sua senha' value={senha} required onChange={(e) => setSenha(e.target.value)}></input>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
      <a href="#">Acessar Tabela do Campeonato</a>
    </>
  )
}

export default App
