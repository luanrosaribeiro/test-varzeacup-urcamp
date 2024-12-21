import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Usuario from './Usuario';
import Campeonato from './Campeonato';
import Time from './Time';
import Index from './index';
import AddPartida from './AddPartida';
import UptPartida from './uptPartida';
import API from './Api';

function Partida() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    if (!isAuthenticated) {
        window.location.href = '/';
    }

    const [tabela, setTabela] = useState([]);   

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        const fetchTabela = async () => {
            const data = await API.getPartidas();
            setTabela(data);
        };
        fetchTabela();
    }, []);

    return (
        <>
            <header>
                <div class="menu-div">
                    <nav className="menu-list">
                        <ul>
                            <li><Link to="/Index">Home</Link></li>
                            <li><Link to="/Usuario">Usuarios</Link></li>
                            <li><Link to="/Time">Times</Link></li>
                            <li><Link to="/Campeonato">Campeonatos</Link></li>
                            <li><a onClick={handleLogout}>Sair</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <div className="tabela-container">
                    <h1>Partidas Cadastrados</h1>
                    <h3><Link to="/Partida/AddPartida">Cadastrar Partida</Link></h3>
                    <table className="tabelaPartidas">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data da Partida</th>
                                <th>Hora da Partida</th>
                                <th>Time A</th>
                                <th>Resultado A</th>
                                <th>X</th>
                                <th>Resultado B</th>
                                <th>Time B</th>
                                <th>Tipo</th>
                                <th>Campeonato</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabela.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.datapartida}</td>
                                    <td>{row.horapartida}</td>
                                    <td>{row.timea_nome}</td>
                                    <td>{row.resultadoa}</td>
                                    <td>X</td>
                                    <td>{row.resultadob}</td>
                                    <td>{row.timeb_nome}</td>
                                    <td>{row.tipo}</td>
                                    <td>{row.campeonato_nome}</td>
                                    <td><Link to={`/Partida/UptPartida/${row.id}`}>Alterar</Link></td>
                                    <td><a 
                                        onClick={async () => {
                                            const confirm = window.confirm(`Deseja realmente excluir a Partida de id ${row.id}?`);
                                            if (confirm) {
                                                try {
                                                    await API.deleteTime(row.id);
                                                    alert('Partida deletada com sucesso!');
                                                    setTabela(tabela.filter((user) => user.id !== row.id));
                                                } catch (error) {
                                                    alert('Erro ao deletar Partida. Tente novamente.');
                                                }
                                            }
                                        }}>Deletar</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Routes>
                    <Route path="/Index" element={<Index/>} />
                    <Route path="/Usuario" element={<Usuario/>} />
                    <Route path="/Time" element={<Time/>} />
                    <Route path="/Campeonato" element={<Campeonato/>} />
                    <Route path="/Partida/AddPartida" element={<AddPartida/>} />
                    <Route path="/Partida/UptPartida/:id" element={<UptPartida/>} />
                </Routes>
            </main>
        </>
    );
}

export default Partida;