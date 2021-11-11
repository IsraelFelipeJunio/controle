import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { DashboardProjetoDTO } from './dashboard-projeto-dto';

export class DashboardDTO {

  custoPrevisto: number | undefined;
  custoExecutado: number | undefined;
  andamentoMediaGeral: number | undefined;
  projetos: DashboardProjetoDTO [] | undefined;

  constructor() { 
    this.projetos = [];
  }

  static criarFormulario(dashboardDTO: DashboardDTO) {
    return new FormGroup({
      custoPrevisto: new FormControl(dashboardDTO.custoPrevisto),
      custoExecutado: new FormControl(dashboardDTO.custoExecutado),
      andamentoMediaGeral: new FormControl(dashboardDTO.andamentoMediaGeral),
      projetos: new FormArray(dashboardDTO!.projetos!.map(parcelaCompra => DashboardProjetoDTO.criarFormulario(parcelaCompra)))
    });
  }
}
