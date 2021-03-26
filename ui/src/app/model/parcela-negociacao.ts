import {FormControl, FormGroup, Validators} from '@angular/forms';

export class ParcelaNegociacao {

  numeroParcela: number | undefined;
  numeroTotalParcela: number | undefined;
  vencimento: string | undefined;
  valor: number | undefined;
  observacao: string | undefined;

  static criarFormulario(parcelaNegociacao: ParcelaNegociacao) {

    return new FormGroup({
      numeroParcela: new FormControl(parcelaNegociacao.numeroParcela, [Validators.required]),
      numeroTotalParcela: new FormControl(parcelaNegociacao.numeroTotalParcela, [Validators.required]),
      vencimento: new FormControl(parcelaNegociacao.vencimento, [Validators.required]),
      valor: new FormControl(parcelaNegociacao.valor, [Validators.required]),
      observacao: new FormControl(parcelaNegociacao.observacao)
    });
  }
}
