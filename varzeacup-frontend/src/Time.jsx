import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Usuario from './Usuario';
import Campeonato from './Campeonato';
import Partida from './Partida';
import Index from './index';
import AddTime from './AddTime';
import UptTime from './uptTime';
import API from './Api';

function Time() {
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
            const data = await API.getTimes();
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
                            <li><Link to="/Campeonato">Campeonatos</Link></li>
                            <li><Link to="/Partida">Partidas</Link></li>
                            <li><a onClick={handleLogout}>Sair</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <div className="tabela-container">
                    <h1>Times Cadastrados</h1>
                    <h3><Link to="/Time/AddTime">Cadastrar Time</Link></h3>
                    <table className="tabelaTimes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabela.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.nome}</td>
                                    <td><Link to={`/Time/UptTime/${row.id}`}>Alterar</Link></td>
                                    <td><a 
                                        onClick={async () => {
                                            const confirm = window.confirm(`Deseja realmente excluir o Time ${row.nome}?`);
                                            if (confirm) {
                                                try {
                                                    await API.deleteTime(row.id);
                                                    alert('Time deletado com sucesso!');
                                                    setTabela(tabela.filter((user) => user.id !== row.id));
                                                } catch (error) {
                                                    alert('Erro ao deletar time. Tente novamente.');
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
                    <Route path="/Campeonato" element={<Campeonato/>} />
                    <Route path="/Partida" element={<Partida/>}/>
                    <Route path="/Time/AddTime" element={<AddTime/>} />
                    <Route path="/Time/UptTime:id" element={<UptTime/>} />
                </Routes>
            </main>
        </>
    );
}

export default Time;