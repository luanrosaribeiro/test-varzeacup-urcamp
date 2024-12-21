import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './Api';

function UptCampeonato() {
    const {id} = useParams();
    const navigate = useNavigate(); 

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

    useEffect(() => {
        const fetchCampeonato = async () => {
            try {
                const campeonato = await API.getCampeonatoById(id);
                setNome(campeonato.nome);
                setAno(campeonato.ano);
            } catch (error) {
                console.error('Erro ao buscar campeonato:', error);
                alert('Erro ao carregar informações do campeonato.');
                navigate('/Campeonato');
            }
        };

        fetchCampeonato();
    }, [id, navigate]);

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
            await API.updateCampeonato(id, nome, ano);
            alert('Campeonato atualizado com sucesso!');
            navigate('/Campeonato');
        } catch (error) {
            console.error('Erro ao atualizar campeonato:', error);
            alert('Erro ao atualizar campeonato.');
        }
    };

    return (
        <div className="form-container">
            <h1>Editar Campeonato</h1>
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
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default UptCampeonato;
