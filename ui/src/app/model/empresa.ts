import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Validador } from '../core/validador';
import { TipoPessoa } from './tipo-pessoa';

export class Empresa {

  id: number | undefined;
  nome: string | undefined;
  tipoPessoa: TipoPessoa | undefined;
  cpf: string | undefined;
  cnpj: string | undefined;
  razaoSocial: string | undefined;
  dataFundacao: string | undefined;
  cep: string | undefined;
  endereco: string | undefined;
  numero: string | undefined;
  complemento: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  uf: string | undefined;
  ibge: string | undefined;
  gia: string | undefined;
  ddd: string | undefined;
  siafi: string | undefined;
  telefoneComercial: string | undefined;
  email: string | undefined;
  empresaPai: Empresa | undefined;

  constructor() {
    this.tipoPessoa = TipoPessoa.JURIDICA;
    this.dataFundacao = moment().format('YYYY-MM-DD');
  }

  static criarFormulario(empresa: Empresa) {

    return new FormGroup({
      id: new FormControl(empresa.id),
      tipoPessoa: new FormControl(empresa.tipoPessoa),
      nome: new FormControl(empresa.nome, Validators.required),
      cpf: new FormControl(empresa.cpf, Validador.cpfObrigatorio()),
      cnpj: new FormControl(empresa.cnpj, Validador.cnpjObrigatorio()),
      razaoSocial: new FormControl(empresa.razaoSocial, [Validators.required]),
      dataFundacao: new FormControl(empresa.dataFundacao),
      cep: new FormControl(empresa.cep),
      endereco: new FormControl(empresa.endereco),
      numero: new FormControl(empresa.numero),
      complemento: new FormControl(empresa.complemento),
      bairro: new FormControl(empresa.bairro),
      cidade: new FormControl(empresa.cidade),
      uf: new FormControl(empresa.uf),
      ibge: new FormControl(empresa.ibge),
      gia: new FormControl(empresa.gia),
      ddd: new FormControl(empresa.ddd),
      siafi: new FormControl(empresa.siafi),
      telefoneComercial: new FormControl(empresa.telefoneComercial),
      email: new FormControl(empresa.email, Validators.email),
      empresaPai: new FormControl(empresa.empresaPai)
    });
  }
}
