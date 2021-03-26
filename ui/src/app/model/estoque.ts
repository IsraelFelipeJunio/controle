import {FormControl, FormGroup} from '@angular/forms';
import {Loja} from './loja';
import {Produto} from './produto';

export class Estoque {

  id: number | undefined;
  loja: Loja | undefined;
  produto: Produto | undefined;
  estoqueDisponível: string | undefined;


  constructor() {

  }

  criarFormulario(estoque: Estoque) {

    return new FormGroup({
      id: new FormControl(estoque.id),
      loja: new FormControl(estoque.loja),
      produto: new FormControl(estoque.produto),
      estoqueDisponível: new FormControl(estoque.estoqueDisponível)
    });
  }
}
