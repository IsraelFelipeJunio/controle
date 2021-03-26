import {FormControl, FormGroup} from '@angular/forms';
import {Conta} from './conta';
import {Fornecedor} from './fornecedor';
import {CentroCusto} from './centro-custo';

export class ContaPagar {

  id: number | undefined;
  descricao: string | undefined;
  competencia: string | undefined;
  vencimento: string | undefined;
  valor: number | undefined;
  pago: boolean | undefined;
  pagamento: string | undefined;
  descontoTaxa: number | undefined;
  jurosMulta: number | undefined;
  valorPago: number | undefined;
  conta: Conta | undefined;
  fornecedor: Fornecedor | undefined;
  centroCusto: CentroCusto | undefined;

  criarFormulario(contaPagar: ContaPagar) {

    return new FormGroup({
      id: new FormControl(contaPagar.id),
      descricao: new FormControl(contaPagar.descricao),
      competencia: new FormControl(contaPagar.competencia),
      vencimento: new FormControl(contaPagar.vencimento),
      valor: new FormControl(contaPagar.valor),
      pago: new FormControl(contaPagar.pago),
      pagamento: new FormControl(contaPagar.pagamento),
      descontoTaxa: new FormControl(contaPagar.descontoTaxa),
      jurosMulta: new FormControl(contaPagar.jurosMulta),
      valorPago: new FormControl(contaPagar.valorPago),
      conta: new FormControl(contaPagar.conta),
      fornecedor: new FormControl(contaPagar.fornecedor),
      centroCusto: new FormControl(contaPagar.centroCusto)
    });
  }
}
