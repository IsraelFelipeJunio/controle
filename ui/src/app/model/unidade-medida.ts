import { FormControl, FormGroup, Validators } from '@angular/forms';

export class UnidadeMedida {

  id: number | undefined;
  descricao: string | undefined;

  constructor() { }

  criarFormulario(unidadeMedida: UnidadeMedida) {

    return new FormGroup({
      id: new FormControl(unidadeMedida.id),
      descricao: new FormControl(unidadeMedida.descricao, Validators.required)
    });
  }
  
}
