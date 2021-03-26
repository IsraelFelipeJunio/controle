import {FormControl, FormGroup, Validators} from '@angular/forms';

export class ParcelaCompra {

  numeroParcela: number | undefined;
  numeroTotalParcela: number | undefined;
  vencimento: string | undefined;
  valor: number | undefined;
  observacao: string | undefined;

  static criarFormulario(parcelaCompra: ParcelaCompra) {

    return new FormGroup({
      numeroParcela: new FormControl(parcelaCompra.numeroParcela, [Validators.required]),
      numeroTotalParcela: new FormControl(parcelaCompra.numeroTotalParcela, [Validators.required]),
      vencimento: new FormControl(parcelaCompra.vencimento, [Validators.required]),
      valor: new FormControl(parcelaCompra.valor, [Validators.required]),
      observacao: new FormControl(parcelaCompra.observacao)
    });
  }
}
