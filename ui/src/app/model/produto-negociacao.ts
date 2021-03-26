import {FormControl, FormGroup} from '@angular/forms';
import {Produto} from './produto';

export class ProdutoNegociacao {

  produto: Produto | undefined;
  detalheItem: string | undefined;
  quantidade: number | undefined;
  valor: number | undefined;
  subTotal: number | undefined;

  static criarFormulario(produtoNegociacao: ProdutoNegociacao) {

    return new FormGroup({
      produto: new FormControl(produtoNegociacao.produto),
      detalheItem: new FormControl(produtoNegociacao.detalheItem),
      quantidade: new FormControl(produtoNegociacao.quantidade),
      valor: new FormControl(produtoNegociacao.valor),
      subTotal: new FormControl(produtoNegociacao.subTotal)
    });
  }
}
