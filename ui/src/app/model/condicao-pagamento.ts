import {FormControl, FormGroup, Validators} from '@angular/forms';

export class CondicaoPagamento {

  id: number | undefined;
  descricao: string | undefined;
  avista: boolean | undefined;
  quantidadeParcela: number | undefined;

  criarFormulario(condicaoPagamento: CondicaoPagamento) {

    return new FormGroup({
      id: new FormControl(condicaoPagamento.id),
      descricao: new FormControl(condicaoPagamento.descricao, [Validators.required]),
      avista: new FormControl(condicaoPagamento.avista, [Validators.required]),
      quantidadeParcela: new FormControl(condicaoPagamento.quantidadeParcela, [Validators.required])
    });
  }
}
