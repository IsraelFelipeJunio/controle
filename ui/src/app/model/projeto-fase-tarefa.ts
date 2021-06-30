import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Tarefa } from './tarefa';

export class ProjetoFaseTarefa {

  tarefa: Tarefa | undefined;

  constructor() { }

  static criarFormulario(projetoFaseTarefa: ProjetoFaseTarefa) {

    return new FormGroup({
      tarefa: new FormControl(projetoFaseTarefa.tarefa, Validators.required)
    });
  }

}
