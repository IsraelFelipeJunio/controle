import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IndicadorEscricaoEstadual} from './indicador-escricao-estadual';
import {Validador} from '../core/validador';

export class Transportadora {

  id: number | undefined;
  nome: string | undefined;
  cnpj: string | undefined;
  inscricaoEstadual: string | undefined;
  inscricaoMunicipal: string | undefined;
  indicadorInscricaoEstadual: IndicadorEscricaoEstadual | undefined;

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
  telefoneCelular: string | undefined;
  email: string | undefined;
  contato: string | undefined;

  valorFrete: number | undefined;

  constructor() {
    this.indicadorInscricaoEstadual = IndicadorEscricaoEstadual.NAO_CONTRIBUIENTE;
  }

  static criarFormulario(transportadora: Transportadora) {

    return new FormGroup({
      id: new FormControl(transportadora.id),
      nome: new FormControl(transportadora.nome , Validators.required),
      cnpj: new FormControl(transportadora.cnpj,Validador.cnpj()),
      inscricaoEstadual: new FormControl(transportadora.inscricaoEstadual),
      inscricaoMunicipal: new FormControl(transportadora.inscricaoMunicipal),
      indicadorInscricaoEstadual: new FormControl(transportadora.indicadorInscricaoEstadual),

      cep: new FormControl(transportadora.cep),
      endereco: new FormControl(transportadora.endereco),
      numero: new FormControl(transportadora.numero),
      complemento: new FormControl(transportadora.complemento),
      bairro: new FormControl(transportadora.bairro),
      cidade: new FormControl(transportadora.cidade),
      uf: new FormControl(transportadora.uf),
      ibge: new FormControl(transportadora.ibge),
      gia: new FormControl(transportadora.gia),
      ddd: new FormControl(transportadora.ddd),
      siafi: new FormControl(transportadora.siafi),

      telefoneComercial: new FormControl(transportadora.telefoneComercial),
      telefoneCelular: new FormControl(transportadora.telefoneCelular),
      email: new FormControl(transportadora.email,Validators.email),
      contato: new FormControl(transportadora.contato),

      valorFrete: new FormControl(transportadora.valorFrete)
    });
  }
}
