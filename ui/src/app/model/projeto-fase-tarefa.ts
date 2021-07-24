import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { Tarefa } from './tarefa';
import { ProjetoFase } from './projeto-fase';
import { Usuario } from './usuario';
import { ProjetoFaseTarefaRecurso } from './projeto-fase-tarefa-recurso';

export class ProjetoFaseTarefa {

  id: number | undefined;
  codigo: string | undefined;
  projetoFase: ProjetoFase | undefined;
  tarefa: Tarefa | undefined;
  usuarioResponsavel: Usuario | undefined;
  descricao: string | undefined;
  andamento: number | undefined;
  dataInicio: Date | undefined;
  dataFim: Date | undefined;
  projetoFaseTarefaDependente: ProjetoFaseTarefa | undefined;
  recursos: ProjetoFaseTarefaRecurso [] | undefined;

  constructor() {
    this.recursos = [];
    this.andamento = 0;
   }

   criarFormulario(projetoFaseTarefa: ProjetoFaseTarefa) {
    return new FormGroup({
      id: new FormControl(projetoFaseTarefa.id),
      codigo: new FormControl(projetoFaseTarefa.codigo, Validators.required),
      projetoFase: new FormControl(projetoFaseTarefa.projetoFase, Validators.required),
      tarefa: new FormControl(projetoFaseTarefa.tarefa, Validators.required),
      usuarioResponsavel: new FormControl(projetoFaseTarefa.usuarioResponsavel, Validators.required),
      descricao: new FormControl(projetoFaseTarefa.descricao, Validators.required),
      andamento: new FormControl(projetoFaseTarefa.andamento),
      dataInicio: new FormControl(projetoFaseTarefa.dataInicio, Validators.required),
      dataFim: new FormControl(projetoFaseTarefa.dataFim, Validators.required),
      projetoFaseTarefaDependente: new FormControl(projetoFaseTarefa.projetoFaseTarefaDependente),
      recursos: new FormArray(projetoFaseTarefa!.recursos!.map(recurso => ProjetoFaseTarefaRecurso.criarFormulario(recurso)))
    });
  }

}
