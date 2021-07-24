import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Recurso } from './recurso';

export class ProjetoFaseTarefaRecurso {

  recurso: Recurso | undefined;
  descricao: string | undefined;
  utilizado: boolean | false;
  quantidadeUnidade: number | 0;

  constructor() {
    this.utilizado = false;
  }

  static criarFormulario(projetoFaseTarefaRecurso: ProjetoFaseTarefaRecurso) {
    return new FormGroup({
      recurso: new FormControl(projetoFaseTarefaRecurso.recurso, Validators.required),
      descricao: new FormControl(projetoFaseTarefaRecurso.descricao),
      utilizado: new FormControl(projetoFaseTarefaRecurso.utilizado),
      quantidadeUnidade: new FormControl(projetoFaseTarefaRecurso.quantidadeUnidade),
    });
  }

}
