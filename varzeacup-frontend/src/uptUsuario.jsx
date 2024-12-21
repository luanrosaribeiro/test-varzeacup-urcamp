import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from './Api';

function UptUsuario() {
    const {id} = useParams();
    const navigate = useNavigate(); 

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const usuario = await API.getUsuarioById(id);
                setNome(usuario.nome);
                setEmail(usuario.email);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                alert('Erro ao carregar informações do usuário.');
                navigate('/Usuario');
            }
        };

        fetchUsuario();
    }, [id, navigate]);

    const handleNomeChange = (e) => {
        const value = e.target.value;
        if (/^[^0-9]*$/.test(value)) {
            setNome(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErro("Por favor, insira um e-mail válido.");
            return;
        }
        if (!senha) {
            setErro("A senha é obrigatória.");
            return;
        }

        try {
            console.log('Dados enviados:', { id, nome, email, senha });
            await API.updateUsuario(id, nome, email, senha);
            alert('Usuário atualizado com sucesso!');
            navigate('/Usuario');
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário.');
        }
    };

    return (
        <div className="form-container">
            <h1>Editar Usuário</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label>Nome: <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /></label>
                <label>E-mail: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
                <label>Senha (opcional): <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} /></label>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                <button type="submit">Atualizar</button>
            </form>
        </div>
    );
}

export default UptUsuario;
