-- Criando a tabela Projeto Fase
create table projeto_fase(
	id bigserial not null primary key,
	codigo integer,
	descricao varchar,
	data_inicio date,
	data_fim date,
	projeto_id bigint references projeto,
	andamento DOUBLE PRECISION,
	levantamento_requisito varchar,
	status_fase VARCHAR
);

-- Criando a tabela Projeto Fase Responsável
create table projeto_fase_responsavel(
	projeto_fase_id bigint references projeto_fase,
	usuario_id bigint references usuario,
	principal boolean
);
