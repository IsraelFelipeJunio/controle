import {FormControl, FormGroup, Validators} from '@angular/forms';

export class CategoriaProduto {

  id: number | undefined;
  categoria: string | undefined;

  criarFormulario(categoriaProduto: CategoriaProduto) {

    return new FormGroup({
      id: new FormControl(categoriaProduto.id),
      categoria: new FormControl(categoriaProduto.categoria, Validators.required)
    });
  }
}
