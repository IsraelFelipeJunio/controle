import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Categoria } from './categoria';
import { ProjetoResponsavel } from './projeto-responsavel';
import { StatusProjeto } from './status-projeto';

export class Projeto {

  id: number | undefined;
  descricao: string | undefined;
  andamento: number | 0;
  statusProjeto: StatusProjeto | undefined;
  projetoPai: Projeto | undefined;
  categoria: Categoria | undefined;
  dataInicio: Date | undefined;
  dataFim: Date | undefined;
  gerarPrevisaoCusto: boolean | false;
  custoPrevisto: number | undefined;
  custoExecutado: number | undefined;
  projetoResponsaveis: ProjetoResponsavel [] | undefined;

  constructor() {
    this.statusProjeto = StatusProjeto.PROBLEMA;
    this.projetoResponsaveis = [];
    this.andamento = 0;
    this.custoExecutado = 0;
    this.custoPrevisto = 0;
  }

  criarFormulario(projeto: Projeto) {

    return new FormGroup({
      id: new FormControl(projeto.id),
      descricao: new FormControl(projeto.descricao , Validators.required),
      andamento: new FormControl(projeto.andamento),
      statusProjeto: new FormControl(projeto.statusProjeto),
      projetoPai: new FormControl(projeto.projetoPai),
      categoria: new FormControl(projeto.categoria, Validators.required),
      dataInicio: new FormControl(projeto.dataInicio, Validators.required),
      dataFim: new FormControl(projeto.dataFim, Validators.required),
      gerarPrevisaoCusto: new FormControl(projeto.gerarPrevisaoCusto),
      custoPrevisto: new FormControl(projeto.custoPrevisto),
      custoExecutado: new FormControl(projeto.custoExecutado),
      projetoResponsaveis: new FormArray(projeto!.projetoResponsaveis!.map(projetoResponsavel => ProjetoResponsavel.criarFormulario(projetoResponsavel)))
    });
  }
  
}
