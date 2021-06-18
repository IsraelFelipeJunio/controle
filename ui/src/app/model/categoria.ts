import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Categoria {

  id: number | undefined;
  descricao: string | undefined;

  criarFormulario(categoria: Categoria) {

    return new FormGroup({
      id: new FormControl(categoria.id),
      descricao: new FormControl(categoria.descricao, Validators.required)
    });
  }
}
