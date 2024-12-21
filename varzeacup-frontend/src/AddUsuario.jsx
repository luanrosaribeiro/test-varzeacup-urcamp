import { useState } from 'react';
import API from './Api';

function AddUsuario() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const handleNomeChange = (e) => {
        const value = e.target.value;
        if (/^[^0-9]*$/.test(value)) {
            setNome(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErro("Por favor, insira um e-mail válido.");
            return;
        }
        if (!senha) {
            setErro("A senha é obrigatória.");
            return;
        }
        
        try {
            await API.postAddUsuario(nome,email,senha);
            alert('Usuário cadastrado com sucesso!'); 
            window.location.href = '/Usuario';
        } catch (erro) {
            alert('Erro ao cadastrar usuário. Tente novamente.');
            console.erro(erro);
        }
    };

    return (
        <div className="form-container">
            <h1>Cadastrar Usuário</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome:    <input type="text" value={nome} onChange={handleNomeChange} required/></label>
                <label>E-mail:  <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Senha:   <input type="password" value={senha} required onChange={(e) => setSenha(e.target.value)}/></label>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddUsuario;
