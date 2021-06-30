-- Criando tabela Tarefa
create table tarefa(
	id bigserial not null primary key,
	descricao varchar
);

-- Criando a tabela Projeto Fase Tarefa
create table projeto_fase_tarefa(
	projeto_fase_id bigint references projeto_fase,
	tarefa_id bigint references tarefa
);
