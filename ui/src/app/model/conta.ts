import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Loja} from './loja';

export class Conta {

  id: number | undefined;
  loja: Loja | undefined;
  nome: string | undefined;
  saldoInicial: number | undefined;
  dataSaldo: string | undefined;
  saldoAtual: number | undefined;

  criarFormulario(conta: Conta) {

    return new FormGroup({
      id: new FormControl(conta.id),
      loja: new FormControl(conta.loja),
      nome: new FormControl(conta.nome, [Validators.required]),
      saldoInicial: new FormControl(conta.saldoInicial, [Validators.required]),
      dataSaldo: new FormControl(conta.dataSaldo, [Validators.required]),
      saldoAtual: new FormControl(conta.saldoAtual)
    });
  }
}
