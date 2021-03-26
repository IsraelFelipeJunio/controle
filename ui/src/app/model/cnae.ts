import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Cnae {

  id: number | undefined;
  codigo: string | undefined;
  descricao: string | undefined;

  criarFormulario(cnae: Cnae) {

    return new FormGroup({
      id: new FormControl(cnae.id),
      codigo: new FormControl(cnae.codigo, [Validators.required]),
      descricao: new FormControl(cnae.descricao, [Validators.required])
    });
  }
}
