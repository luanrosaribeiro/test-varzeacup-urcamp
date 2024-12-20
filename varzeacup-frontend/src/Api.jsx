const ApiBase = 'http://127.0.0.1:8000/api';

const API = {
    login:async (email,senha) => {
        const formData = new FormData();
        formData.append('email_enviado', email);
        formData.append('senha_enviada', senha);
        try{
            const response = await fetch(ApiBase+'/login', {
                method:'POST',
                body:formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Usuário ou senha incorretos');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro durante o login:', error.message);
            throw error;
        }

    },
    getTabela:async () => {
        try{
            const response = await fetch(ApiBase+'/tabela');
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao carregar tabela');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar tabela', error.message);
            throw error;
        }
    },
    getUsuarios:async () => {
        try{
            const response = await fetch(ApiBase+'/usuarios');
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao carregar os usuarios cadastrados.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar os usuarios cadastrados.', error.message);
            throw error;
        }
    },
    postAddUsuario:async (nome,email,senha) => {
        const formData = new FormData();
        formData.append('nome_enviado', nome);
        formData.append('email_enviado', email);
        formData.append('senha_enviada', senha);
        try{
            const response = await fetch(ApiBase+'/addUsuario', {
                method:'POST',
                body:formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro cadastrar usuário.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro cadastrar usuário.', error.message);
            throw error;
        }
    }
}

export default API;