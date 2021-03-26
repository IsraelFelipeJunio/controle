import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoCompra} from './tipo-compra';
import {ProdutoCompra} from './produto-compra';
import {TipoDesconto} from './tipo-desconto';
import {ParcelaCompra} from './parcela-compra';
import {CondicaoPagamento} from './condicao-pagamento';
import * as moment from 'moment';
import {Loja} from './loja';
import {Fornecedor} from './fornecedor';
import {Cnae} from './cnae';

export class Compra {

  id: number | undefined;
  loja: Loja | undefined;
  fornecedor: Fornecedor | undefined;
  dataCompra: string | undefined;
  tipoCompra: TipoCompra | undefined;
  valorTotal: number | undefined;
  valorLiquido: number | undefined;
  condicaoPagamento: CondicaoPagamento | undefined;
  parcelasCompra: ParcelaCompra [] | undefined;

  // Servico
  serieNota: string | undefined;
  numeroNota: string | undefined;
  dataEmissaoNota: string | undefined;
  discriminacaoServico: string | undefined;
  cnae: Cnae | undefined;
  retencaoIss: boolean | undefined;
  valorIss: number | undefined;
  outrosImpostosRetidos: boolean | undefined;
  valorInss: number | undefined;
  valorIrrf: number | undefined;
  valorCsll: number | undefined;
  valorCofins: number | undefined;
  valorPisPasep: number | undefined;

  // Produto
  produtosCompra: ProdutoCompra [] | undefined;
  tipoDesconto: TipoDesconto | undefined;
  desconto: number | undefined;
  frete: number | undefined;
  observacao: string | undefined;

  constructor() {
    this.produtosCompra = [];
    this.parcelasCompra = [];
    this.dataCompra = moment().format('YYYY-MM-DD');
    this.dataEmissaoNota = moment().add(10, 'days').format('YYYY-MM-DD');
    this.tipoDesconto = TipoDesconto.REAL;
    this.frete = 0;
    this.retencaoIss = false;
    this.outrosImpostosRetidos = false;
  }

  criarFormulario(compra: Compra) {

    return new FormGroup({
      id: new FormControl(compra.id),
      loja: new FormControl(compra.loja),
      fornecedor: new FormControl(compra.fornecedor, [Validators.required]),
      dataCompra: new FormControl(compra.dataCompra, [Validators.required]),
      tipoCompra: new FormControl(compra.tipoCompra, [Validators.required]),
      valorTotal: new FormControl(compra.valorTotal, [Validators.required]),
      valorLiquido: new FormControl(compra.valorLiquido, [Validators.required]),
      condicaoPagamento: new FormControl(compra.condicaoPagamento, [Validators.required]),
      parcelasCompra: new FormArray(compra!.parcelasCompra!.map(parcelaCompra => ParcelaCompra.criarFormulario(parcelaCompra))),
      serieNota: new FormControl(compra.serieNota),
      numeroNota: new FormControl(compra.numeroNota,[Validators.required]),
      dataEmissaoNota: new FormControl(compra.dataEmissaoNota,[Validators.required]),
      discriminacaoServico: new FormControl(compra.discriminacaoServico),
      cnae: new FormControl(compra.cnae,[Validators.required]),
      retencaoIss: new FormControl(compra.retencaoIss),
      valorIss: new FormControl(compra.valorIss),
      outrosImpostosRetidos: new FormControl(compra.outrosImpostosRetidos),
      valorInss: new FormControl(compra.valorInss),
      valorIrrf: new FormControl(compra.valorIrrf),
      valorCsll: new FormControl(compra.valorCsll),
      valorCofins: new FormControl(compra.valorCofins),
      valorPisPasep: new FormControl(compra.valorPisPasep),
      produtosCompra: new FormArray(compra!.produtosCompra!.map(produtoCompra => ProdutoCompra.criarFormulario(produtoCompra))),
      tipoDesconto: new FormControl(compra.tipoDesconto),
      desconto: new FormControl(compra.desconto),
      frete: new FormControl(compra.frete),
      observacao: new FormControl(compra.observacao)
    });
  }
}
