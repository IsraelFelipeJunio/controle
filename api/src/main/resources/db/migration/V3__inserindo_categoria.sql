-- Apagando Tabela
drop table centro_custo;

-- Criando tabela Categoria
create table categoria(
	id bigserial not null primary key,
	descricao varchar
);
