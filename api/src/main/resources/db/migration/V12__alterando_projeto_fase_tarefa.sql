-- Inserindo campos Projeto
ALTER TABLE projeto ADD COLUMN IF NOT EXISTS gerar_previsao_custo boolean;
ALTER TABLE projeto ADD COLUMN IF NOT EXISTS custo_previsto numeric(19,2);
ALTER TABLE projeto ADD COLUMN IF NOT EXISTS custo_executado numeric(19,2);

-- Inserindo campos Projeto Fase
ALTER TABLE projeto_fase ADD COLUMN IF NOT EXISTS custo_previsto numeric(19,2);
ALTER TABLE projeto_fase ADD COLUMN IF NOT EXISTS custo_executado numeric(19,2);

update projeto set gerar_previsao_custo = false;
