import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Tarefa {

  id: number | undefined;
  descricao: string | undefined;

  constructor() { }

  criarFormulario(tarefa: Tarefa) {

    return new FormGroup({
      id: new FormControl(tarefa.id),
      descricao: new FormControl(tarefa.descricao, Validators.required)
    });
  }
  
}
