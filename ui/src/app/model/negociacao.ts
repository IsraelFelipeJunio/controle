import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoNegociacao} from './tipo-negociacao';
import {ProdutoNegociacao} from './produto-negociacao';
import {TipoDesconto} from './tipo-desconto';
import {ParcelaNegociacao} from './parcela-negociacao';
import {CondicaoPagamento} from './condicao-pagamento';
import {Cliente} from './cliente';
import * as moment from 'moment';
import {Loja} from './loja';

export class Negociacao {

  id: number | undefined;
  loja: Loja | undefined;
  cliente: Cliente | undefined;
  dataNegociacao: string | undefined;
  tipoNegociacao: TipoNegociacao | undefined;
  produtosNegociacao: ProdutoNegociacao [] | undefined;
  valorTotal: number | undefined;
  tipoDesconto: TipoDesconto | undefined;
  desconto: number | undefined;
  valorLiquido: number | undefined;
  condicaoPagamento: CondicaoPagamento | undefined;
  parcelasNegociacao: ParcelaNegociacao [] | undefined;
  formaPagamento: string | undefined;
  informacaoComplementar: string | undefined;
  introducao:string | undefined;
  validadeOrcamento:string | undefined;
  previsaoEntrega: string | undefined;

  constructor() {
    this.produtosNegociacao = [];
    this.parcelasNegociacao = [];
    this.dataNegociacao = moment().format('YYYY-MM-DD');
    this.validadeOrcamento = moment().add(10,'days').format('YYYY-MM-DD');
    this.tipoDesconto = TipoDesconto.REAL;
  }

  criarFormulario(negociacao: Negociacao) {

    return new FormGroup({
      id: new FormControl(negociacao.id),
      loja: new FormControl(negociacao.loja),
      cliente: new FormControl(negociacao.cliente, [Validators.required]),
      dataNegociacao: new FormControl(negociacao.dataNegociacao, [Validators.required]),
      tipoNegociacao: new FormControl(negociacao.tipoNegociacao, [Validators.required]),
      produtosNegociacao: new FormArray(negociacao!.produtosNegociacao!.map(produtoNegociacao => ProdutoNegociacao.criarFormulario(produtoNegociacao))),
      valorTotal: new FormControl(negociacao.valorTotal, [Validators.required]),
      tipoDesconto: new FormControl(negociacao.tipoDesconto, [Validators.required]),
      desconto: new FormControl(negociacao.desconto),
      valorLiquido: new FormControl(negociacao.valorLiquido, [Validators.required]),
      condicaoPagamento: new FormControl(negociacao.condicaoPagamento, [Validators.required]),
      parcelasNegociacao: new FormArray(negociacao!.parcelasNegociacao!.map(parcelaNegociacao => ParcelaNegociacao.criarFormulario(parcelaNegociacao))),
      formaPagamento: new FormControl(negociacao.formaPagamento),
      informacaoComplementar: new FormControl(negociacao.informacaoComplementar),
      introducao: new FormControl(negociacao.introducao),
      validadeOrcamento: new FormControl(negociacao.validadeOrcamento,[Validators.required]),
      previsaoEntrega: new FormControl(negociacao.previsaoEntrega)
    });
  }
}
