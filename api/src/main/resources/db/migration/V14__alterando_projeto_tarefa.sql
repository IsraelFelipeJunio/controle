ALTER TABLE projeto_fase_tarefa ADD COLUMN IF NOT EXISTS projeto_fase_tarefa_dependente_id bigint references projeto_fase_tarefa;
