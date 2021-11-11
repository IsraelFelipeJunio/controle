import { FormControl, FormGroup } from '@angular/forms';

export class DashboardProjetoDTO {

  projeto: string | undefined;
  responsavel: string | undefined;
  status: string | undefined;
  andamento: number | undefined;

  constructor() { }

  static criarFormulario(dashboardProjetoDTO: DashboardProjetoDTO) {
    return new FormGroup({
      projeto: new FormControl(dashboardProjetoDTO.projeto),
      responsavel: new FormControl(dashboardProjetoDTO.responsavel),
      status: new FormControl(dashboardProjetoDTO.status),
      andamento: new FormControl(dashboardProjetoDTO.andamento)
    });
  }

}
