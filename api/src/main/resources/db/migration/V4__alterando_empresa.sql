-- Apaga a FK
alter table usuario drop constraint usuario_loja_logada_id_fkey;
alter table usuario drop column loja_logada_id;

-- Apaga a tabela Loja
drop table if exists loja;

-- Cria a tabela Empresa
create table empresa(
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

-- Popula a tabela empresa
INSERT INTO empresa (id, tipo_pessoa, nome, cpf, cnpj, razao_social, data_fundacao, optante_simples_nacional, vende_produto, vende_servico, inscricao_municipal, inscricao_estadual, isento_inscricao_estadual, cep, endereco, numero, complemento, bairro, cidade, uf, ibge, gia, ddd, siafi, telefone_comercial, email) VALUES (1, 'JURIDICA', 'Loja 1', '43023137811', '91975378000166', 'aaaaaaaaa', null, false, true, true, 'true', null, true, 'true', '16013800', 'Rua Gaspar de Lemos', '232', 'p34', 'Panorama', 'Araçatuba', 'SP', '3502804', '1776', '18', '6155', '12312312313');
INSERT INTO empresa (id, tipo_pessoa, nome, cpf, cnpj, razao_social, data_fundacao, optante_simples_nacional, vende_produto, vende_servico, inscricao_municipal, inscricao_estadual, isento_inscricao_estadual, cep, endereco, numero, complemento, bairro, cidade, uf, ibge, gia, ddd, siafi, telefone_comercial, email) VALUES (2, 'JURIDICA', 'Loja 2', null, '91975378000166', 'LOJA 2', null, false, true, true, 'true', null, true, 'true', null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO empresa (id, tipo_pessoa, nome, cpf, cnpj, razao_social, data_fundacao, optante_simples_nacional, vende_produto, vende_servico, inscricao_municipal, inscricao_estadual, isento_inscricao_estadual, cep, endereco, numero, complemento, bairro, cidade, uf, ibge, gia, ddd, siafi, telefone_comercial, email) VALUES (3, 'JURIDICA', 'Loja 3', null, '91975378000166', 'LOJA 3', null, false, true, true, 'true', null, true, 'true', null, null, null, null, null, null, null, null, null, null, null, null);

-- Inserindo FK de Empresa no usuário
ALTER TABLE usuario ADD COLUMN IF NOT EXISTS empresa_logada_id bigint references empresa;
