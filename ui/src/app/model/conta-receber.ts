import {FormControl, FormGroup} from '@angular/forms';
import {Conta} from './conta';
import {Cliente} from './cliente';
import {CentroCusto} from './centro-custo';

export class ContaReceber {

  id: number | undefined;
  descricao: string | undefined;
  competencia: string | undefined;
  vencimento: string | undefined;
  valor: number | undefined;
  recebido: boolean | undefined;
  recebimento: string | undefined;
  descontoTaxa: number | undefined;
  jurosMulta: number | undefined;
  valorRecebido: number | undefined;
  conta: Conta | undefined;
  cliente: Cliente | undefined;
  centroCusto: CentroCusto | undefined;

  criarFormulario(contaReceber: ContaReceber) {

    return new FormGroup({
      id: new FormControl(contaReceber.id),
      descricao: new FormControl(contaReceber.descricao),
      competencia: new FormControl(contaReceber.competencia),
      vencimento: new FormControl(contaReceber.vencimento),
      valor: new FormControl(contaReceber.valor),
      recebido: new FormControl(contaReceber.recebido),
      recebimento: new FormControl(contaReceber.recebimento),
      descontoTaxa: new FormControl(contaReceber.descontoTaxa),
      jurosMulta: new FormControl(contaReceber.jurosMulta),
      valorRecebido: new FormControl(contaReceber.valorRecebido),
      conta: new FormControl(contaReceber.conta),
      cliente: new FormControl(contaReceber.cliente),
      centroCusto: new FormControl(contaReceber.centroCusto)
    });
  }
}
