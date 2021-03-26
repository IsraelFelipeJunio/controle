import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contato} from './contato';
import {TipoPessoa} from './tipo-pessoa';
import {IndicadorEscricaoEstadual} from './indicador-escricao-estadual';
import {Validador} from '../core/validador';

export class Cliente {

  id: number | undefined;
  nome: string | undefined;
  tipoPessoa: TipoPessoa | undefined;
  ativo: boolean | undefined;
  cnpj: string | undefined;
  razaoSocial: string | undefined;
  indicadorInscricaoEstadual: IndicadorEscricaoEstadual | undefined;
  inscricaoEstadual: string | undefined;
  inscricaoMunicipal: string | undefined;
  inscricaoSUFRAMA: string | undefined;
  optanteSIMPLES: boolean | undefined;

  cpf: string | undefined;
  rg: string | undefined;
  dataAniversario: string | undefined;

  email: string | undefined;
  telefoneComercial: string | undefined;
  telefoneCelular: string | undefined;
  dataFundacao: string | undefined;

  observacao: string | undefined;
  dataCadastro: string | undefined;

  contatos: Contato [] | undefined;

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
    this.ativo = true;
    this.contatos = [];
    this.tipoPessoa = TipoPessoa.JURIDICA;
    this.indicadorInscricaoEstadual = IndicadorEscricaoEstadual.NAO_CONTRIBUIENTE;
    this.optanteSIMPLES = false;
  }

  criarFormulario(cliente: Cliente) {

    return new FormGroup({
      id: new FormControl(cliente.id),
      ativo: new FormControl(cliente.ativo),
      nome: new FormControl(cliente.nome , Validators.required),
      tipoPessoa: new FormControl(cliente.tipoPessoa),
      cnpj: new FormControl(cliente.cnpj,Validador.cnpj()),
      razaoSocial: new FormControl(cliente.razaoSocial),
      indicadorInscricaoEstadual: new FormControl(cliente.indicadorInscricaoEstadual),
      inscricaoEstadual: new FormControl(cliente.inscricaoEstadual),
      inscricaoMunicipal: new FormControl(cliente.inscricaoMunicipal),
      inscricaoSUFRAMA: new FormControl(cliente.inscricaoSUFRAMA),
      optanteSIMPLES: new FormControl(cliente.optanteSIMPLES),
      cpf: new FormControl(cliente.cpf,Validador.cpf()),
      rg: new FormControl(cliente.rg),
      dataAniversario: new FormControl(cliente.dataAniversario),
      email: new FormControl(cliente.email, Validators.email),
      telefoneComercial: new FormControl(cliente.telefoneComercial),
      telefoneCelular: new FormControl(cliente.telefoneCelular),
      dataFundacao: new FormControl(cliente.dataFundacao),
      observacao: new FormControl(cliente.observacao),
      dataCadastro: new FormControl(cliente.dataCadastro),
      cep: new FormControl(cliente.cep),
      endereco: new FormControl(cliente.endereco),
      numero: new FormControl(cliente.numero),
      complemento: new FormControl(cliente.complemento),
      bairro: new FormControl(cliente.bairro),
      cidade: new FormControl(cliente.cidade),
      uf: new FormControl(cliente.uf),
      ibge: new FormControl(cliente.ibge),
      gia: new FormControl(cliente.gia),
      ddd: new FormControl(cliente.ddd),
      siafi: new FormControl(cliente.siafi),
      contatos: new FormArray(cliente!.contatos!.map(contato => Contato.criarFormulario(contato)))
    });
  }
}
