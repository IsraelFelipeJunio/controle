import {FormControl, FormGroup} from '@angular/forms';
import {Produto} from './produto';

export class ProdutoCompra {

  produto: Produto | undefined;
  detalheItem: string | undefined;
  quantidade: number | undefined;
  custo: number | undefined;
  subTotal: number | undefined;

  static criarFormulario(produtoCompra: ProdutoCompra) {

    return new FormGroup({
      produto: new FormControl(produtoCompra.produto),
      detalheItem: new FormControl(produtoCompra.detalheItem),
      quantidade: new FormControl(produtoCompra.quantidade),
      custo: new FormControl(produtoCompra.custo),
      subTotal: new FormControl(produtoCompra.subTotal)
    });
  }
}
