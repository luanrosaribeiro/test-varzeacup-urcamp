CREATE TABLE USUARIOS (
	ID SERIAL PRIMARY KEY NOT NULL,
	NOME VARCHAR(50) NOT NULL,
	EMAIL VARCHAR(50) NOT NULL,
	SENHA VARCHAR(150) NOT NULL
);

CREATE TABLE CAMPEONATOS(
	ID SERIAL PRIMARY KEY,
	NOME VARCHAR(50) NOT NULL,
	ANO VARCHAR(4) NOT NULL
);

CREATE TABLE TIMES(
	ID SERIAL PRIMARY KEY,
	NOME VARCHAR(100) NOT NULL
);

CREATE TABLE PARTIDAS (
	ID SERIAL PRIMARY KEY,
	DATAPARTIDA DATE NOT NULL,
	HORAPARTIDA TIME NOT NULL,
	TIPO VARCHAR(10) NOT NULL,
	TIMEA INTEGER NOT NULL,
	RESULTADOA INTEGER NOT NULL,
	TIMEB INTEGER NOT NULL,
	RESULTADOB INTEGER NOT NULL,
	IDCAMPEONATO INTEGER NOT NULL
	REFERENCES CAMPEONATO
);

CREATE TABLE SESSIONS (
    ID VARCHAR(255) PRIMARY KEY,
    USER_ID BIGINT NULL,
    IP_ADDRESS VARCHAR(45) NULL,
    USER_AGENT TEXT NULL,
    PAYLOAD TEXT NOT NULL,
	LAST_ACTIVITY INT NOT NULL
);
