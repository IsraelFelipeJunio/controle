import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Categoria } from './categoria';
import { StatusProjeto } from './status-projeto';
import { ProjetoResponsavel } from './projeto-responsavel';

export class Projeto {

  id: number | undefined;
  descricao: string | undefined;
  andamento: number | 0; // Disabled
  statusProjeto: StatusProjeto | undefined;
  projetoPai: Projeto | undefined;
  categoria: Categoria | undefined;
  dataInicio: Date | undefined;
  dataFinal: Date | undefined;
  projetoResponsaveis: ProjetoResponsavel [] | undefined;

  constructor() {
    this.statusProjeto = StatusProjeto.PROBLEMA;
    this.projetoResponsaveis = [];
  }

  criarFormulario(projeto: Projeto) {

    return new FormGroup({
      id: new FormControl(projeto.id),
      descricao: new FormControl(projeto.descricao , Validators.required),
      andamento: new FormControl(projeto.andamento),
      statusProjeto: new FormControl(projeto.statusProjeto),
      projetoPai: new FormControl(projeto.projetoPai),
      categoria: new FormControl(projeto.categoria),
      // categoria: new FormControl(projeto.categoria, Validators.required),
      dataInicio: new FormControl(projeto.dataInicio, Validators.required),
      dataFinal: new FormControl(projeto.dataFinal, Validators.required),
      // projetoResponsaveis: new FormArray(projeto!.projetoResponsaveis!.map(projetoResponsavel => ProjetoResponsavel.criarFormulario(projetoResponsavel)))
    });
  }
  
}
