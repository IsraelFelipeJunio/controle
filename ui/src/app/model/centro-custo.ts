import {FormControl, FormGroup, Validators} from '@angular/forms';

export class CentroCusto {

  id: number | undefined;
  nome: string | undefined;

  criarFormulario(centroCusto: CentroCusto) {

    return new FormGroup({
      id: new FormControl(centroCusto.id),
      nome: new FormControl(centroCusto.nome, Validators.required)
    });
  }
}
