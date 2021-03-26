import {FormControl, FormGroup, Validators} from '@angular/forms';

export class LeiComplementar {

  id: number | undefined;
  codigo: string | undefined;
  descricao: string | undefined;

  criarFormulario(leiComplementar: LeiComplementar) {

    return new FormGroup({
      id: new FormControl(leiComplementar.id),
      codigo: new FormControl(leiComplementar.codigo, [Validators.required]),
      descricao: new FormControl(leiComplementar.descricao, [Validators.required])
    });
  }
}
