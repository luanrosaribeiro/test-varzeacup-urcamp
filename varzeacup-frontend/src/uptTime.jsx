import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './Api';

function UptTime() {
    const {id} = useParams();
    const navigate = useNavigate(); 

    const [nome, setNome] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchTime = async () => {
            try {
                const time = await API.getTimeById(id);
                setNome(time.nome);
            } catch (error) {
                console.error('Erro ao buscar time:', error);
                alert('Erro ao carregar informações do time.');
                navigate('/Time');
            }
        };

        fetchTime();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome) {
            setErro("Por favor, insira um nome para o time.");
            return;
        }

        try {
            await API.updateTime(id, nome);
            alert('Time atualizado com sucesso!');
            navigate('/Time');
        } catch (error) {
            console.error('Erro ao atualizar time:', error);
            alert('Erro ao atualizar time.');
        }
    };

    return (
        <div className="form-container">
            <h1>Editar Time</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome:    <input type="text" value={nome} required onChange={(e) => setNome(e.target.value)}/></label>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default UptTime;
