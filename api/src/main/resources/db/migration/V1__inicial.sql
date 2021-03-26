create table usuario(
	id bigserial not null primary key,
	nome varchar,
	email varchar,
	senha varchar
);

create table cliente(
	id bigserial not null primary key,
	nome varchar,
	tipo_pessoa VARCHAR,
	ativo BOOLEAN,
	cnpj VARCHAR,
	razao_social VARCHAR,
	indicador_inscricao_estadual VARCHAR,
	inscricao_estadual VARCHAR,
	inscricao_municipal VARCHAR,
	inscricao_suframa VARCHAR,
	optante_simples  BOOLEAN,
	cpf VARCHAR,
	rg VARCHAR,
	data_aniversario DATE,
	email VARCHAR,
	telefone_comercial VARCHAR,
	telefone_celular VARCHAR,
	data_fundacao DATE,
	observacao VARCHAR,
	data_cadastro DATE,
	cep VARCHAR,
	endereco VARCHAR,
	numero VARCHAR,
	complemento VARCHAR,
	bairro VARCHAR,
	cidade VARCHAR,
	uf VARCHAR,
	ibge VARCHAR,
	gia VARCHAR,
	ddd VARCHAR,
	siafi VARCHAR
);

create table cliente_contato(
	cliente_id bigint references cliente,
	nome varchar,
	email varchar,
	fone varchar,
	cargo varchar
);

create table centro_custo(
	id bigserial not null primary key,
	nome varchar
);

create table loja(
    id    						bigserial not null primary key,
    tipo_pessoa					varchar,
    nome                        varchar,
    cpf                         varchar,
    cnpj                        varchar,
    razao_social                varchar,
    data_fundacao               DATE,
    optante_simples_nacional    boolean,
    vende_produto               boolean,
    vende_servico               boolean,
    inscricao_municipal         varchar,
    inscricao_estadual          varchar,
    isento_inscricao_estadual   boolean,
    cep                         varchar,
    endereco                    varchar,
    numero                      varchar,
    complemento                 varchar,
    bairro                      varchar,
    cidade                      varchar,
    uf                          varchar,
    ibge                        varchar,
    gia                         varchar,
    ddd                         varchar,
    siafi                       varchar,
    telefone_comercial          varchar,
    email                       varchar
);

ALTER TABLE usuario ADD COLUMN IF NOT EXISTS loja_logada_id bigint references loja;
