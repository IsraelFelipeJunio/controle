import {FormControl, FormGroup, Validators} from '@angular/forms';

export class UnidadeMedida {

  id: number | undefined;
  unidadeMedida: string | undefined;
  simbolo: string | undefined;
  ativo: boolean | undefined;

  constructor() {
    this.ativo = true;
  }

  criarFormulario(unidadeMedida: UnidadeMedida) {

    return new FormGroup({
      id: new FormControl(unidadeMedida.id),
      unidadeMedida: new FormControl(unidadeMedida.unidadeMedida, Validators.required),
      simbolo: new FormControl(unidadeMedida.simbolo, Validators.required),
      ativo: new FormControl(unidadeMedida.ativo)
    });
  }
}
