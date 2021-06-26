import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Usuario } from './usuario';

export class ProjetoAtaReuniaoParticipante {

  usuario: Usuario | undefined;
  organizador: boolean | false;

  constructor() {
    this.organizador = false;
  }

  static criarFormulario(projetoAtaReuniaoParticipante: ProjetoAtaReuniaoParticipante) {

    return new FormGroup({
      usuario: new FormControl(projetoAtaReuniaoParticipante.usuario, Validators.required),
      organizador: new FormControl(projetoAtaReuniaoParticipante.organizador)
    });
  }

}
