import { ProjetoFaseRecurso } from './projeto-fase-recurso';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Projeto } from './projeto';
import { ProjetoFaseResponsavel } from './projeto-fase-responsavel';
import { StatusFase } from './status-fase';
import { ProjetoFaseTarefa } from './projeto-fase-tarefa';

export class ProjetoFase {

  id: number | undefined;
  codigo: number | undefined;
  descricao: string | undefined;
  dataInicio: Date | undefined;
  dataFim: Date | undefined;
  projeto: Projeto | undefined;
  andamento: number | 0;
  levantamentoRequisito: string | undefined;
  statusFase: StatusFase | undefined;
  projetoFaseResponsaveis: ProjetoFaseResponsavel [] | undefined;
  projetoFaseRecursos: ProjetoFaseRecurso [] | undefined;
  projetoFaseTarefas: ProjetoFaseTarefa [] | undefined;

  constructor() {
    this.projetoFaseResponsaveis = [];
    this.projetoFaseRecursos = [];
    this.projetoFaseTarefas = [];
  }

  criarFormulario(projetoFase: ProjetoFase) {

    return new FormGroup({
      id: new FormControl(projetoFase.id),
      codigo: new FormControl(projetoFase.codigo, Validators.required),
      descricao: new FormControl(projetoFase.descricao, Validators.required),
      dataInicio: new FormControl(projetoFase.dataInicio, Validators.required),
      dataFim: new FormControl(projetoFase.dataFim, Validators.required),
      projeto: new FormControl(projetoFase.projeto, Validators.required),    
      andamento: new FormControl(projetoFase.andamento),
      levantamentoRequisito: new FormControl(projetoFase.levantamentoRequisito),
      statusFase: new FormControl(projetoFase.statusFase),
      projetoFaseResponsaveis: new FormArray(projetoFase!.projetoFaseResponsaveis!.map(projetoFaseResponsavel => ProjetoFaseResponsavel.criarFormulario(projetoFaseResponsavel))),
      projetoFaseRecursos: new FormArray(projetoFase!.projetoFaseRecursos!.map(projetoFaseRecurso => ProjetoFaseRecurso.criarFormulario(projetoFaseRecurso))),
      projetoFaseTarefas: new FormArray(projetoFase!.projetoFaseTarefas!.map(projetoFaseTarefa => ProjetoFaseTarefa.criarFormulario(projetoFaseTarefa))),
    });
  }
  
}
