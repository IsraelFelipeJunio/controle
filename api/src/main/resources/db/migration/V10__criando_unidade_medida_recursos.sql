-- Criando tabela Unidade de Medida
create table unidade_medida(
	id bigserial not null primary key,
	descricao varchar
);

-- Criando tabela Recurso
create table recurso(
	id bigserial not null primary key,
	descricao VARCHAR,
	custo numeric(19,2),
	unidade_medida_id bigint references unidade_medida,
	tipo VARCHAR
);

-- Criando a tabela Projeto Fase Responsável
create table projeto_fase_recurso(
	projeto_fase_id bigint references projeto_fase,
	recurso_id bigint references recurso,
	descricao VARCHAR,
	utilizado boolean,
	quantidade_unidade DOUBLE PRECISION
);
