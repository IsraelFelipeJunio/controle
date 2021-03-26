import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Produto} from './produto';

export class Inventario {

  produto: Produto | undefined;
  estoqueDisponivel: number | undefined;

  static criarFormularioInventario(inventario: Inventario): FormGroup {

    return new FormGroup({
      produto: new FormControl(inventario.produto),
      estoqueDisponivel: new FormControl(inventario.estoqueDisponivel)
    });
  }

  static criarFormularioInventarios(inventarios: Inventario[]) {

    return new FormGroup({
      inventarios: new FormArray(inventarios.map(inventario => this.criarFormularioInventario(inventario)))
    });
  }

}
