import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Time from './Time';
import Campeonato from './Campeonato';
import Partida from './Partida';
import Usuario from './Usuario';
import API from './Api';

function Index() {
    const isAuthenticated = Boolean(localStorage.getItem('token'));
    const [tabela, setTabela] = useState([]);   

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        const fetchTabela = async () => {
            const data = await API.getTabela();
            setTabela(data);
        };
        fetchTabela();
    }, []);

    return (
        <>
            <header>
                {isAuthenticated && (
                    <div class="menu-div">
                        <nav className="menu-list">
                            <ul>
                                <li><Link to="/Usuario">Usuários</Link></li>
                                <li><Link to="/Campeonato">Campeonatos</Link></li>
                                <li><Link to="/Time">Times</Link></li>
                                <li><Link to="/Partida">Partidas</Link></li>
                                <li><a onClick={handleLogout}>Sair</a></li>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>

            <main>
                <div className="tabela-container">
                    <h1>Tabela do Campeonato</h1>
                    <table className="tabelaTimes">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Pontos</th>
                                <th>Vitórias</th>
                                <th>Derrotas</th>
                                <th>Empates</th>
                                <th>Partidas Jogadas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabela.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.time}</td>
                                    <td>{row.pontos}</td>
                                    <td>{row.vitorias}</td>
                                    <td>{row.derrotas}</td>
                                    <td>{row.empates}</td>
                                    <td>{row.partidas_jogadas}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isAuthenticated && (
                    <Routes>
                        <Route path="/Usuario" element={<Usuario />} />
                        <Route path="/Campeonato" element={<Campeonato />} />
                        <Route path="/Time" element={<Time />} />
                        <Route path="/Partida" element={<Partida />} />
                    </Routes>
                )}
            </main>
        </>
    );
}

export default Index;
