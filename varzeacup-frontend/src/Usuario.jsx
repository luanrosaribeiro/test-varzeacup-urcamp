import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Time from './Time';
import Campeonato from './Campeonato';
import Partida from './Partida';
import Index from './index';
import AddUsuario from './AddUsuario';
import UptUsuario from './uptUsuario';
import API from './Api';

function Usuario() {
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
            const data = await API.getUsuarios();
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
                            <li><Link to="/Campeonato">Campeonatos</Link></li>
                            <li><Link to="/Time">Times</Link></li>
                            <li><Link to="/Partida">Partidas</Link></li>
                            <li><a onClick={handleLogout}>Sair</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <div className="tabela-container">
                    <h1>Usuário Cadastrados</h1>
                    <h3><Link to="/Usuario/addUsuario">Cadastrar Usuário</Link></h3>
                    <table className="tabelaTimes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tabela.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.id}</td>
                                    <td>{row.nome}</td>
                                    <td>{row.email}</td>
                                    <td><Link to={`/Usuario/UptUsuario/${row.id}`}>Alterar</Link></td>
                                    <td><a 
                                        onClick={async () => {
                                            const confirm = window.confirm(`Deseja realmente excluir o usuário ${row.nome}?`);
                                            if (confirm) {
                                                try {
                                                    await API.deleteUsuario(row.id);
                                                    alert('Usuário deletado com sucesso!');
                                                    setTabela(tabela.filter((user) => user.id !== row.id));
                                                } catch (error) {
                                                    alert('Erro ao deletar usuário. Tente novamente.');
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
                    <Route path="/Campeonato" element={<Campeonato/>} />
                    <Route path="/Time" element={<Time/>} />
                    <Route path="/Partida" element={<Partida/>}/>
                    <Route path="/Usuario/AddUsuario" element={<AddUsuario/>} />
                    <Route path="/Usuario/UptUsuario:id" element={<UptUsuario/>} />
                </Routes>
            </main>
        </>
    );
}

export default Usuario;