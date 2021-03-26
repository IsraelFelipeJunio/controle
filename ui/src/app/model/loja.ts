import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoPessoa} from './tipo-pessoa';
import {Validador} from '../core/validador';
import * as moment from 'moment';

export class Loja {

  id: number | undefined;
  nome: string | undefined;
  tipoPessoa: TipoPessoa | undefined;

  cpf: string | undefined;

  cnpj: string | undefined;
  razaoSocial: string | undefined;
  dataFundacao: string | undefined;
  optanteSimplesNacional: boolean | undefined;
  vendeProduto: boolean | undefined;
  vendeServico: boolean | undefined;
  inscricaoMunicipal: string | undefined;
  inscricaoEstadual: string | undefined;
  isentoInscricaoEstadual: boolean | undefined;

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

  constructor() {
    this.tipoPessoa = TipoPessoa.JURIDICA;
    this.vendeProduto = true;
    this.vendeServico = true;
    this.optanteSimplesNacional = true;
    this.isentoInscricaoEstadual = true;
    this.dataFundacao = moment().format('YYYY-MM-DD');
  }

  static criarFormulario(loja: Loja) {

    return new FormGroup({
      id: new FormControl(loja.id),
      tipoPessoa: new FormControl(loja.tipoPessoa),
      nome: new FormControl(loja.nome, Validators.required),
      cpf: new FormControl(loja.cpf, Validador.cpfObrigatorio()),
      cnpj: new FormControl(loja.cnpj, Validador.cnpjObrigatorio()),
      razaoSocial: new FormControl(loja.razaoSocial, [Validators.required]),
      dataFundacao: new FormControl(loja.dataFundacao),
      optanteSimplesNacional: new FormControl(loja.optanteSimplesNacional),
      vendeProduto: new FormControl(loja.vendeProduto),
      vendeServico: new FormControl(loja.vendeServico),
      inscricaoMunicipal: new FormControl(loja.inscricaoMunicipal),
      inscricaoEstadual: new FormControl(loja.inscricaoEstadual),
      isentoInscricaoEstadual: new FormControl(loja.isentoInscricaoEstadual),
      cep: new FormControl(loja.cep),
      endereco: new FormControl(loja.endereco),
      numero: new FormControl(loja.numero),
      complemento: new FormControl(loja.complemento),
      bairro: new FormControl(loja.bairro),
      cidade: new FormControl(loja.cidade),
      uf: new FormControl(loja.uf),
      ibge: new FormControl(loja.ibge),
      gia: new FormControl(loja.gia),
      ddd: new FormControl(loja.ddd),
      siafi: new FormControl(loja.siafi),
      telefoneComercial: new FormControl(loja.telefoneComercial),
      email: new FormControl(loja.email, Validators.email)
    });
  }
}
