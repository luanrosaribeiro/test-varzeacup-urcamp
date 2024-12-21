import { useState } from 'react';
import API from './Api';

function AddTime() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (!isAuthenticated) {
        window.location.href = '/';
    }

    const [nome, setNome] = useState('');
    const [erro, setErro] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome) {
            setErro("Por favor, insira um nome para o time.");
            return;
        }
        
        try {
            await API.postAddTime(nome);
            alert('Time cadastrado com sucesso!'); 
            window.location.href = '/Time';
        } catch (erro) {
            alert('Erro ao cadastrar time. Tente novamente.');
            console.erro(erro);
        }
    };

    return (
        <div className="form-container">
            <h1>Cadastrar Time</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome:    <input type="text" value={nome} required onChange={(e) => setNome(e.target.value)}/></label>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddTime;
