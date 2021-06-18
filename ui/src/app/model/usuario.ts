import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Empresa } from './empresa';

export class Usuario {

    id: number | undefined;
    email: string | undefined;
    senha: string | undefined;
    nome: string | undefined;
    empresaLogada: Empresa | undefined;

    constructor() {

    }

  static criarFormulario(usuario: Usuario) {

    return new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome, Validators.required),
      email: new FormControl(usuario.email, [Validators.required,Validators.email]),
      senha: new FormControl(usuario.senha, Validators.required),
      senhaRepetida: new FormControl(usuario.senha, Validators.required),
      empresaLogada: new FormControl(usuario.empresaLogada)
    });
  }
}
