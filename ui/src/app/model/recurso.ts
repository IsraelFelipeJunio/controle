import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Tipo } from './tipo';
import { UnidadeMedida } from './unidade-medida';

export class Recurso {

  id: number | undefined;
  descricao: string | undefined;
  custo: number | 0;
  unidadeMedida: UnidadeMedida | undefined;
  tipo: Tipo | undefined;

  constructor() { }

  criarFormulario(recurso: Recurso) {

    return new FormGroup({
      id: new FormControl(recurso.id),
      descricao: new FormControl(recurso.descricao , Validators.required),
      custo: new FormControl(recurso.custo),
      unidadeMedida: new FormControl(recurso.unidadeMedida, Validators.required),
      tipo: new FormControl(recurso.tipo)
    });
  }
  
}
