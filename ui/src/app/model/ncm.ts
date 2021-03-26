import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Ncm {

  id: number | undefined;
  codigo: string | undefined;
  descricao: string | undefined;

  criarFormulario(ncm: Ncm) {

    return new FormGroup({
      id: new FormControl(ncm.id),
      codigo: new FormControl(ncm.codigo, [Validators.required]),
      descricao: new FormControl(ncm.descricao, [Validators.required])
    });
  }
}
