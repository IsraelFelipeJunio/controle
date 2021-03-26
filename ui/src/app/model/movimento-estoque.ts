import {Loja} from './loja';
import {TipoMovimentoEstoque} from './tipo-movimento-estoque';
import {Compra} from './compra';
import {Negociacao} from './negociacao';
import {Estoque} from './estoque';

export class MovimentoEstoque {

  id: number | undefined;
  data: string | undefined;
  hora: string | undefined;
  estoque: Estoque | undefined;
  tipoMovimentoEstoque: TipoMovimentoEstoque | undefined;
  negociacao: Negociacao | undefined;
  compra: Compra | undefined;
  loja: Loja | undefined;
  quantidadeMovimentada: number | undefined;
  estoqueDisponivel: number | undefined;
}
