# Teste de Desenvolvimento - VarzeaCup <h2>
Olá, seja bem vindo ao repositório do VarzeaCup, sistema desenvolvido em PHP com framework Laravel em conjunto com React.JS e banco de dados PostgreSQL. O intuito do projeto é demonstrar o conhecimento nas linguagens antes citadas com objetivo de conquistar a vaga como desenvolvedor.

No repositório teremos a pasta Banco de Dados onde ficará toda a parte para criação do banco e também a pasta projeto onde ficará toda a parte do sistema em si.

### Instruções para executar o projeto <h3>

* Banco de dados
  1. Crie um novo database no seu PostgreSQL com o nome 'varzeacup';
  2. Após isso no database criado, abra o arquivo create_bd.sql e execute os comandos contidos neles para que seja feita a criação do banco de dados referente a aplicação.
 
* Para rodar o front-end basta estar com o terminal aberto na pasta do projeto e executar o comando 'npm run dev', tanto no terminal cmd quando do Visual Studio Code.
* O front-end está rodando no endereço http://localhost:5173/;
* Para rodar o back-end basta estar com o terminal aberto na pasta do projeto e executar o comando 'php artisan serve', tanto no terminal cmd quando do Visual Studio Code.
* O front-end está rodando no endereço http://127.0.0.1:8000;
* Configuração de conexão com banco do back-end:
      DB_CONNECTION=pgsql
      DB_HOST=127.0.0.1
      DB_PORT=5432
      DB_DATABASE=varzeacup


*Observação: Para um primeiro cadastro de usuário utilizar a rota http://localhost:5173/Usuario/addUsuario;

