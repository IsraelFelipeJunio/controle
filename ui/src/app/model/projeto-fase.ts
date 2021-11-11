import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Projeto } from './projeto';
import { ProjetoFaseResponsavel } from './projeto-fase-responsavel';
import { StatusFase } from './status-fase';

export class ProjetoFase {

  id: number | undefined;
  codigo: number | undefined;
  descricao: string | undefined;
  dataInicio: Date | undefined;
  dataFim: Date | undefined;
  projeto: Projeto | undefined;
  andamento: number | undefined;
  levantamentoRequisito: string | undefined;
  statusFase: StatusFase | undefined;
  custoPrevisto: number | undefined;
  custoExecutado: number | undefined;
  projetoFaseResponsaveis: ProjetoFaseResponsavel [] | undefined;

  constructor() {
    this.projetoFaseResponsaveis = [];
    this.andamento = 0;
    this.custoExecutado = 0;
    this.custoPrevisto = 0;
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
      custoPrevisto: new FormControl(projetoFase.custoPrevisto),
      custoExecutado: new FormControl(projetoFase.custoExecutado),
      projetoFaseResponsaveis: new FormArray(projetoFase!.projetoFaseResponsaveis!.map(responsavel => ProjetoFaseResponsavel.criarFormulario(responsavel)))
    });
  }
  
}
