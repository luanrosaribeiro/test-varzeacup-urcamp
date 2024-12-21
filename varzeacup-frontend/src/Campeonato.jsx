import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Usuario from './Usuario';
import Time from './Time';
import Partida from './Partida';
import Index from './index';
import AddCampeonato from './AddCampeonato';
import UptCampeonato from './uptCampeonato';
import API from './Api';

function Campeonato() {
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
            const data = await API.getCampeonatos();
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
                            <li><Link to="/Partida">Partidas</Link></li>
                            <li><a onClick={handleLogout}>Sair</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <div className="tabela-container">
                    <h1>Campeonatos Cadastrados</h1>
                    <h3><Link to="/Campeonato/AddCampeonato">Cadastrar Campeonato</Link></h3>
                    <table className="tabelaTimes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ano</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabela.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.nome}</td>
                                    <td>{row.ano}</td>
                                    <td><Link to={`/Campeonato/UptCampeonato/${row.id}`}>Alterar</Link></td>
                                    <td><a 
                                        onClick={async () => {
                                            const confirm = window.confirm(`Deseja realmente excluir o campeonato ${row.nome}?`);
                                            if (confirm) {
                                                try {
                                                    await API.deleteCampeonato(row.id);
                                                    alert('Campeonato deletado com sucesso!');
                                                    setTabela(tabela.filter((user) => user.id !== row.id));
                                                } catch (error) {
                                                    alert('Erro ao deletar Campeonato. Tente novamente.');
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
                    <Route path="/Partida" element={<Partida/>}/>
                    <Route path="/Campeonato/AddCampeonato" element={<AddCampeonato/>} />
                    <Route path="/Campeonato/UptCampeonato:id" element={<UptCampeonato/>} />
                </Routes>
            </main>
        </>
    );
}

export default Campeonato;