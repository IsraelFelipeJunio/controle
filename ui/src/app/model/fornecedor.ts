import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TipoPessoa} from './tipo-pessoa';
import {IndicadorEscricaoEstadual} from './indicador-escricao-estadual';
import {Validador} from '../core/validador';

export class Fornecedor {

  id: number | undefined;
  nome: string | undefined;
  tipoPessoa: TipoPessoa | undefined;
  cnpj: string | undefined;
  razaoSocial: string | undefined;
  indicadorInscricaoEstadual: IndicadorEscricaoEstadual | undefined;
  inscricaoEstadual: string | undefined;
  inscricaoMunicipal: string | undefined;
  identificadorEstrangeiro: string | undefined;

  cpf: string | undefined;
  rg: string | undefined;
  dataAniversario: string | undefined;

  telefoneComercial: string | undefined;
  email: string | undefined;
  telefoneResidencial: string | undefined;
  contato: string | undefined;
  telefoneCelular: string | undefined;
  dataFundacao: string | undefined;

  observacao: string | undefined;

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

  constructor() {
    this.tipoPessoa = TipoPessoa.JURIDICA;
    this.indicadorInscricaoEstadual = IndicadorEscricaoEstadual.NAO_CONTRIBUIENTE;
  }

  static criarFormulario(fornecedor: Fornecedor) {

    return new FormGroup({
      id: new FormControl(fornecedor.id),
      nome: new FormControl(fornecedor.nome , Validators.required),
      tipoPessoa: new FormControl(fornecedor.tipoPessoa),
      cnpj: new FormControl(fornecedor.cnpj,Validador.cnpj()),
      razaoSocial: new FormControl(fornecedor.razaoSocial),
      indicadorInscricaoEstadual: new FormControl(fornecedor.indicadorInscricaoEstadual),
      inscricaoEstadual: new FormControl(fornecedor.inscricaoEstadual),
      inscricaoMunicipal: new FormControl(fornecedor.inscricaoMunicipal),
      identificadorEstrangeiro: new FormControl(fornecedor.identificadorEstrangeiro),
      cpf: new FormControl(fornecedor.cpf, Validador.cpf()),
      rg: new FormControl(fornecedor.rg),
      dataAniversario: new FormControl(fornecedor.dataAniversario),
      email: new FormControl(fornecedor.email,Validators.email),
      telefoneComercial: new FormControl(fornecedor.telefoneComercial),
      telefoneCelular: new FormControl(fornecedor.telefoneCelular),
      telefoneResidencial: new FormControl(fornecedor.telefoneResidencial),
      contato: new FormControl(fornecedor.contato),
      dataFundacao: new FormControl(fornecedor.dataFundacao),
      observacao: new FormControl(fornecedor.observacao),
      cep: new FormControl(fornecedor.cep),
      endereco: new FormControl(fornecedor.endereco),
      numero: new FormControl(fornecedor.numero),
      complemento: new FormControl(fornecedor.complemento),
      bairro: new FormControl(fornecedor.bairro),
      cidade: new FormControl(fornecedor.cidade),
      uf: new FormControl(fornecedor.uf),
      ibge: new FormControl(fornecedor.ibge),
      gia: new FormControl(fornecedor.gia),
      ddd: new FormControl(fornecedor.ddd),
      siafi: new FormControl(fornecedor.siafi)
    });
  }
}
