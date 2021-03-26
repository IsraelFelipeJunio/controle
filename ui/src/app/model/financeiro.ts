import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Conta} from './conta';
import {Fornecedor} from './fornecedor';
import {CentroCusto} from './centro-custo';
import {Cliente} from './cliente';
import {TipoFinanceiro} from './tipo-financeiro';
import {OrigemFinanceiro} from './origem-financeiro';
import {Negociacao} from './negociacao';
import {Loja} from './loja';
import {Compra} from './compra';

export class Financeiro {

  id: number | undefined;
  loja: Loja | undefined;
  descricao: string | undefined;
  competencia: string | undefined;
  vencimento: string | undefined;
  valor: number | undefined;
  numeroParcela: number | undefined;
  numeroTotalParcela: number | undefined;
  pagoRecebido: boolean | undefined;
  pagamentoRecebimento: string | undefined;
  descontoTaxa: number | undefined;
  jurosMulta: number | undefined;
  valorPagoRecebido: number | undefined;
  conta: Conta | undefined;
  fornecedor: Fornecedor | undefined;
  cliente: Cliente | undefined;
  centroCusto: CentroCusto | undefined;
  tipoFinanceiro: TipoFinanceiro | undefined;
  origemFinanceiro: OrigemFinanceiro | undefined;
  negociacao: Negociacao | undefined;
  compra: Compra | undefined;

  criarFormulario(financeiro: Financeiro) {

    return new FormGroup({
      id: new FormControl(financeiro.id),
      loja: new FormControl(financeiro.loja),
      descricao: new FormControl(financeiro.descricao, [Validators.required]),
      competencia: new FormControl(financeiro.competencia, [Validators.required]),
      vencimento: new FormControl(financeiro.vencimento, [Validators.required]),
      valor: new FormControl(financeiro.valor, [Validators.required]),
      pagoRecebido: new FormControl(financeiro.pagoRecebido),
      pagamentoRecebimento: new FormControl(financeiro.pagamentoRecebimento, [Validators.required]),
      descontoTaxa: new FormControl(financeiro.descontoTaxa),
      jurosMulta: new FormControl(financeiro.jurosMulta),
      valorPagoRecebido: new FormControl(financeiro.valorPagoRecebido),
      conta: new FormControl(financeiro.conta, [Validators.required]),
      fornecedor: new FormControl(financeiro.fornecedor),
      cliente: new FormControl(financeiro.cliente),
      centroCusto: new FormControl(financeiro.centroCusto),
      tipoFinanceiro: new FormControl(financeiro.tipoFinanceiro),
      origemFinanceiro: new FormControl(financeiro.origemFinanceiro),
      negociacao: new FormControl(financeiro.negociacao),
      compra: new FormControl(financeiro.compra),
      numeroParcela: new FormControl(financeiro.numeroParcela),
      numeroTotalParcela: new FormControl(financeiro.numeroTotalParcela)
    });
  }
}
