import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from './usuario';

export class ProjetoFaseResponsavel {

  usuario: Usuario | undefined;
  principal: boolean | false;

  constructor() {
    this.principal = false;
  }

  static criarFormulario(projetoFaseResponsavel: ProjetoFaseResponsavel) {

    return new FormGroup({
      usuario: new FormControl(projetoFaseResponsavel.usuario, Validators.required),
      principal: new FormControl(projetoFaseResponsavel.principal)
    });
  }

}
