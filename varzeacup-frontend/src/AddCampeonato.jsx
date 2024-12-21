import { useState } from 'react';
import API from './Api';

function AddCampeonato() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (!isAuthenticated) {
        window.location.href = '/';
    }

    const [nome, setNome] = useState('');
    const [ano, setAno] = useState('');
    const [erro, setErro] = useState('');

    const generateYearList = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= 1900; i--) {
            years.push(i);
        }
        return years;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome) {
            setErro("Por favor, insira um nome para o campeonato.");
            return;
        }
        if (!ano) {
            setErro("Pro favor, escolha um ano para o campeonato.");
            return;
        }
        
        try {
            await API.postAddCampeonato(nome,ano);
            alert('Campeonato cadastrado com sucesso!'); 
            window.location.href = '/Campeonato';
        } catch (erro) {
            alert('Erro ao cadastrar campeonato. Tente novamente.');
            console.erro(erro);
        }
    };

    return (
        <div className="form-container">
            <h1>Cadastrar Campeonato</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome:    <input type="text" value={nome} required onChange={(e) => setNome(e.target.value)}/></label>
                <label>Ano: <select value={ano} required onChange={(e) => setAno(e.target.value)}>
                                <option value="">Selecione o ano</option>
                                    {generateYearList().map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                            </select>
                </label>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddCampeonato;
