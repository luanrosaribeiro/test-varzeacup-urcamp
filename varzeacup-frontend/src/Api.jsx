const ApiBase = 'http://127.0.0.1:8000/api';

const API = {
    login:async (email,senha) => {
        const formData = new FormData();

        formData.append('email_enviado', email);
        formData.append('senha_enviada', senha);
        try{
            const response = await fetch(ApiBase+'/login', {
                method:'POST',
                body:formData
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

    }
}

export default API