-- Criando a tabela Projeto Fase
create table projeto_ata_reuniao(
	id bigserial not null primary key,
	codigo integer,
	projeto_id bigint references projeto,
	projeto_fase_id bigint references projeto_fase,
	data_hora TIMESTAMP,
	ata varchar,
	organizador_usuario_id bigint references usuario,
	envia_email boolean,
	titulo_email VARCHAR,
	corpo_email VARCHAR
);

-- Criando a tabela Projeto Fase Participante
create table projeto_ata_reuniao_participante(
	projeto_ata_reuniao_id bigint references projeto_ata_reuniao,
	usuario_id bigint references usuario,
	organizador boolean
);
