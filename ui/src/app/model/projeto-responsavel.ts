import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from './usuario';

export class ProjetoResponsavel {

  usuario: Usuario | undefined;
  principal: boolean | false;

  constructor() {
    this.principal = false;
  }

  static criarFormulario(projetoResponsavel: ProjetoResponsavel) {

    return new FormGroup({
      usuario: new FormControl(projetoResponsavel.usuario, Validators.required),
      principal: new FormControl(projetoResponsavel.principal)
    });
  }

}
