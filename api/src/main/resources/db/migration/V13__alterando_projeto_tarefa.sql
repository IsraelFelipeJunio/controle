-- Apagar Tabelas
drop table projeto_fase_recurso;
drop table projeto_fase_tarefa;

-- Criando a tabela Projeto Fase Tarefa
create table projeto_fase_tarefa(
    id bigserial not null primary key,
    codigo varchar,
	projeto_fase_id bigint references projeto_fase,
	tarefa_id bigint references tarefa,
	usuario_responsavel_id bigint references usuario,
	descricao VARCHAR,
    data_inicio DATE,
    data_fim DATE
);

-- Criando a tabela Projeto Fase Responsável
create table projeto_fase_tarefa_recurso(
	projeto_fase_tarefa_id bigint references projeto_fase_tarefa,
	recurso_id bigint references recurso,
	descricao VARCHAR,
	utilizado boolean,
	quantidade_unidade DOUBLE PRECISION
);
