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
    getUsuarioById:async (id) => {
        try {
            const response = await fetch(ApiBase+'/usuarios/'+id);
            if (!response.ok) {
                throw new Error('Usuário não encontrado.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw error;
        }
    },
    getCampeonatos:async () => {
        try{
            const response = await fetch(ApiBase+'/campeonatos');
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao carregar os campeonatos cadastrados.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar os campeonatos cadastrados.', error.message);
            throw error;
        }
    },
    getCampeonatoById:async (id) => {
        try {
            const response = await fetch(ApiBase+'/campeonatos/'+id);
            if (!response.ok) {
                throw new Error('Campeonato não encontrado.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar campeonato:', error.message);
            throw error;
        }
    },
    getTimes:async () => {
        try{
            const response = await fetch(ApiBase+'/times');
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao carregar os times cadastrados.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar os times cadastrados.', error.message);
            throw error;
        }
    },
    getTimeById:async (id) => {
        try {
            const response = await fetch(ApiBase+'/times/'+id);
            if (!response.ok) {
                throw new Error('Time não encontrado.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar time:', error.message);
            throw error;
        }
    },
    getPartidas:async () => {
        try{
            const response = await fetch(ApiBase+'/partidas');
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro ao carregar os partidas cadastrados.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao carregar os partidas cadastrados.', error.message);
            throw error;
        }
    },
    getPartidaById:async (id) => {
        try {
            const response = await fetch(ApiBase+'/partidas/'+id);
            if (!response.ok) {
                throw new Error('Partida não encontrado.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar partida:', error.message);
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
    },
    postAddCampeonato:async (nome,ano) => {
        const formData = new FormData();
        formData.append('nome_enviado', nome);
        formData.append('ano_enviado', ano);
        try{
            const response = await fetch(ApiBase+'/addCampeonato', {
                method:'POST',
                body:formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro cadastrar campeonato.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro cadastrar campeonato.', error.message);
            throw error;
        }
    },
    postAddTime:async (nome) => {
        const formData = new FormData();
        formData.append('nome_enviado', nome);
        try{
            const response = await fetch(ApiBase+'/addTime', {
                method:'POST',
                body:formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro cadastrar time.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro cadastrar time.', error.message);
            throw error;
        }
    },
    postAddPartida:async (datapartida,horapartida,tipo,timea,timeb,resultadoa,resultadob,idcampeonato) => {
        console.log('Dados enviados:', {
            resultadoa,
            resultadob,
        });
        const formData = new FormData();
        formData.append('datapartida_enviada', datapartida);
        formData.append('horapartida_enviada', horapartida);
        formData.append('tipo_enviado', tipo);
        formData.append('timea_enviado', timea);
        formData.append('timeb_enviado', timeb);
        formData.append('resultadoa_enviado', resultadoa !== '' ? resultadoa : null);
        formData.append('resultadob_enviado', resultadob !== '' ? resultadob : null);
        formData.append('idcampeonato_enviado', idcampeonato);
        try{
            const response = await fetch(ApiBase+'/addPartida', {
                method:'POST',
                body:formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro cadastrar partida.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro cadastrar partida.', error.message);
            throw error;
        }
    },
    updateUsuario:async (id,nome,email,senha) => {
        const payload = { 
            nome_enviado: nome, 
            email_enviado: email 
        };
        if (senha) {
            payload.senha_enviada = senha;
        }
    
        try {
            const response = await fetch(ApiBase + '/usuarios/' + id, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar usuário.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error.message);
            throw error;
        }
    },
    updateCampeonato:async (id,nome,ano) => {
        const payload = { 
            nome_enviado: nome, 
            ano_enviado: ano 
        };
    
        try {
            const response = await fetch(ApiBase + '/campeonatos/' + id, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar campeonato.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar campeonato:', error.message);
            throw error;
        }
    },
    updateTime:async (id,nome) => {
        const payload = { 
            nome_enviado: nome
        };
    
        try {
            const response = await fetch(ApiBase + '/times/' + id, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar time.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar time:', error.message);
            throw error;
        }
    },
    updatePartida:async (id,datapartida,horapartida,tipo,timea,timeb,resultadoa,resultadob,idcampeonato) => {
        const payload = {
            datapartida_enviada: datapartida,
            horapartida_enviada: horapartida,
            tipo_enviado: tipo,
            timea_enviado: timea,
            timeb_enviado: timeb,
            resultadoa_enviado: resultadoa !== '' ? parseInt(resultadoa, 10) : null,
            resultadob_enviado: resultadob !== '' ? parseInt(resultadob, 10) : null,
            idcampeonato_enviado: idcampeonato,
        };
        try {
            const response = await fetch(ApiBase + '/partidas/' + id, {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar partidas.');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao atualizar partidas:', error.message);
            throw error;
        }
    },
    deleteUsuario:async (id) => {
        try {
            const response = await fetch(ApiBase+'/usuarios/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao deletar usuário.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.message);
            throw error;
        }
    },
    deleteCampeonato:async (id) => {
        try {
            const response = await fetch(ApiBase+'/campeonatos/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao deletar campeonato.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar campeonato:', error.message);
            throw error;
        }
    },
    deleteTime:async (id) => {
        try {
            const response = await fetch(ApiBase+'/times/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao deletar time.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar time:', error.message);
            throw error;
        }
    },
    deletePartida:async (id) => {
        try {
            const response = await fetch(ApiBase+'/partidas/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Erro ao deletar partida.');
            }
    
            return await response.json();
        } catch (error) {
            console.error('Erro ao deletar partida:', error.message);
            throw error;
        }
    }
}

export default API;