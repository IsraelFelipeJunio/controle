import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Cest {

  id: number | undefined;
  codigo: string | undefined;
  descricao: string | undefined;

  criarFormulario(cest: Cest) {

    return new FormGroup({
      id: new FormControl(cest.id),
      codigo: new FormControl(cest.codigo, [Validators.required]),
      descricao: new FormControl(cest.descricao, [Validators.required])
    });
  }
}
