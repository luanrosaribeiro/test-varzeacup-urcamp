import { useState, useEffect } from 'react';
import API from './Api';

function AddPartida() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (!isAuthenticated) {
        window.location.href = '/';
    }

    const [datapartida, setDatapartida] = useState('');
    const [horapartida, setHorapartida] = useState('');
    const [tipo, setTipo] = useState('');
    const [timea, setTimeA] = useState('');
    const [timeb, setTimeB] = useState('');
    const [resultadoa, setResultadoA] = useState('');
    const [resultadob, setResultadoB] = useState('');
    const [idcampeonato, setIdCampeonato] = useState('');
    const [times, setTimes] = useState([]);
    const [campeonatos, setCampeonatos] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchTimes = await API.getTimes();
                const fetchCampeonatos = await API.getCampeonatos();
                setTimes(fetchTimes);
                setCampeonatos(fetchCampeonatos);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao carregar dados para o formulário.');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            resultadoa,
            resultadob,
        });

        if (!datapartida) {
            setErro('Por favor, escolha uma data para a partida.');
            return;
        }
        if (!horapartida) {
            setErro('Por favor, escolha uma hora para a partida.');
            return;
        }
        if (!tipo) {
            setErro('Por favor, escolha um tipo para a partida.');
            return;
        }
        if (!timea) {
            setErro('Por favor, escolha um time A para a partida.');
            return;
        }
        if (!timeb) {
            setErro('Por favor, escolha um time B para a partida.');
            return;
        }
        if (timea === timeb) {
            setErro("Por favor, escolha dois times distintos para a partida.");
            return;
        }
        if (resultadoa !== '' && resultadoa < 0 && !Number.isInteger(Number(resultadoa))) {
            setErro('Por favor, insira um resultado válido para o Time A.');
            return;
        }
        if (resultadob !== '' && resultadob < 0 && !Number.isInteger(Number(resultadob))) {
            setErro('Por favor, insira um resultado válido para o Time B.');
            return;
        }
        if (!idcampeonato) {
            setErro('Por favor, escolha um campeonato para a partida.');
            return;
        }

        try {
            await API.postAddPartida(
                datapartida,
                horapartida,
                tipo,
                timea,
                timeb,
                resultadoa,
                resultadob,
                idcampeonato
            );            
            alert('Partida cadastrada com sucesso!');
            window.location.href = '/Partida';
        } catch (error) {
            console.error('Erro ao cadastrar partida:', error);
            alert('Erro ao cadastrar partida. Tente novamente.');
        }
    };

    return (
        <div className="form-container">
            <h1>Cadastrar Partida</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label> Data da Partida: <input type="date" value={datapartida} onChange={(e) => setDatapartida(e.target.value)} required /></label>
                <label> Hora da Partida: <input type="time" value={horapartida} onChange={(e) => setHorapartida(e.target.value)} required /></label>
                <label> Tipo:
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                        <option value="">Selecione</option>
                        <option value="ida">Ida</option>
                        <option value="volta">Volta</option>
                    </select>
                </label>
                <label> Time A:
                    <select value={timea} onChange={(e) => setTimeA(e.target.value)} required>
                        <option value="">Selecione</option>
                        {times.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <label> Resultado Time A: <input type="number" value={resultadoa} onChange={(e) => setResultadoA(e.target.value)} min="0" step="1"/></label>
                <label> Time B:
                    <select value={timeb} onChange={(e) => setTimeB(e.target.value)} required>
                        <option value="">Selecione</option>
                        {times.map((time) => (
                            <option key={time.id} value={time.id}>
                                {time.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <label> Resultado Time B: <input type="number" value={resultadob} onChange={(e) => setResultadoB(e.target.value)} min="0" step="1"/></label>
                <label> Campeonato:
                    <select value={idcampeonato} onChange={(e) => setIdCampeonato(e.target.value)} required>
                        <option value="">Selecione</option>
                        {campeonatos.map((camp) => (
                            <option key={camp.id} value={camp.id}>
                                {camp.nome}
                            </option>
                        ))}
                    </select>
                </label>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default AddPartida;
