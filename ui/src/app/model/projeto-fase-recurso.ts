import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Recurso } from './recurso';

export class ProjetoFaseRecurso {

  recurso: Recurso | undefined;
  descricao: string | undefined;
  utilizado: boolean | false;
  quantidadeUnidade: number | 0;

  constructor() {
    this.utilizado = false;
  }

  static criarFormulario(projetoFaseRecurso: ProjetoFaseRecurso) {

    return new FormGroup({
      recurso: new FormControl(projetoFaseRecurso.recurso, Validators.required),
      descricao: new FormControl(projetoFaseRecurso.descricao),
      utilizado: new FormControl(projetoFaseRecurso.utilizado),
      quantidadeUnidade: new FormControl(projetoFaseRecurso.quantidadeUnidade),
    });
  }

}
