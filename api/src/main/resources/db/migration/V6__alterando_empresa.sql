-- Apaga os campos da Empresa
alter table empresa drop column optante_simples_nacional;
alter table empresa drop column vende_produto;
alter table empresa drop column vende_servico;
alter table empresa drop column inscricao_municipal;
alter table empresa drop column inscricao_estadual;
alter table empresa drop column isento_inscricao_estadual;


-- Inserindo FK de Empresa na Empresa
ALTER TABLE empresa ADD COLUMN IF NOT EXISTS empresa_pai_id bigint references empresa;
