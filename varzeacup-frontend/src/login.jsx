import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './Api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha) {
      setErro("A senha é obrigatória.");
      return;
    }
    try {
      const response = await API.login(email, senha);
      localStorage.setItem('token', response.token); 
      navigate('/index');
    } catch (erro) {
      setErro(erro.message || 'Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <>
      <h1>VarzeaCP</h1>
      <h3>Efetue seu Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Digite o seu e-mail" value={email} required onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" name="senha" placeholder="Digite a sua senha" value={senha} required onChange={(e) => setSenha(e.target.value)}/>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button type="submit">Entrar</button>
      </form>
      <a href="/index">Acessar Tabela do Campeonato</a>
    </>
  );
}

export default Login;
