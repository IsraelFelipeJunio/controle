-- Apaga as tabelas Cliente Contato e Cliente
drop table if exists cliente_contato;
drop table if exists cliente;


-- Cria a tabela Projeto
create table projeto(
	id bigserial not null primary key,
	descricao varchar,
	andamento DOUBLE PRECISION,
	status_projeto VARCHAR,
	projeto_pai_id bigint references projeto,
	categoria_id bigint references categoria,
	data_inicio date,
	data_final date
);

create table projeto_responsavel(
	projeto_id bigint references projeto,
	usuario_id bigint references usuario,
	principal boolean
);
