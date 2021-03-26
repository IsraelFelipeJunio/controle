import {FormControl, FormGroup, Validators} from '@angular/forms';

export class Contato {

  nome: string | undefined;
  email: string | undefined;
  fone: string | undefined;
  cargo: string | undefined;

  static criarFormulario(contato: Contato) {

    return new FormGroup({
      nome: new FormControl(contato.nome),
      email: new FormControl(contato.email,Validators.email),
      fone: new FormControl(contato.fone),
      cargo: new FormControl(contato.cargo)
    });
  }
}
