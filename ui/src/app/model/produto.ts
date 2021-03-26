import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Fornecedor} from './fornecedor';
import {CategoriaProduto} from './categoria-produto';
import {Ncm} from './ncm';
import {Cest} from './cest';
import {UnidadeMedida} from './unidade-medida';
import {TipoProduto} from './tipo-produto';
import {OrigemProduto} from './origem-produto';
import {TipoServico} from './tipo-servico';
import {Cnae} from './cnae';
import {LeiComplementar} from './lei-complementar';
import {NaturezaOperacao} from './natureza-operacao';

export class Produto {

  id: number | undefined;
  tipoProduto: TipoProduto | undefined;
  nome: string | undefined;
  valorVenda: number | undefined;

  // SERVICO
  tipoServico: TipoServico | undefined;
  ativo: boolean | undefined;
  cnae: Cnae | undefined;
  servicoMunicipal: Cnae | undefined;
  leiComplementar: LeiComplementar | undefined;
  naturezaOperacao:NaturezaOperacao | undefined;
  retencaoIssCliente: boolean | undefined;
  iss: number | undefined;
  inss: number | undefined;

  // Produto
  codigoBarra: string | undefined;
  categoriaProduto: CategoriaProduto | undefined;
  observacao: string | undefined;
  origemProduto: OrigemProduto | undefined;
  unidadeMedida: UnidadeMedida | undefined;
  ncm: Ncm | undefined;
  cest: Cest | undefined;
  pesoLiquido: number | undefined;
  pesoBruto: number | undefined;
  fornecedores: Fornecedor[] | undefined;

  // Regra Front
  estoqueDisponivel:number | undefined;

  constructor() {

    this.fornecedores = [];
    this.origemProduto = OrigemProduto.NACIONAL_0;
  }

  criarFormulario(produto: Produto) {

    return new FormGroup({
      id: new FormControl(produto.id),
      tipoProduto: new FormControl(produto.tipoProduto),
      nome: new FormControl(produto.nome, Validators.required),
      valorVenda: new FormControl(produto.valorVenda),

      // Servico
      tipoServico: new FormControl(produto.tipoServico),
      ativo: new FormControl(produto.ativo),
      cnae: new FormControl(produto.cnae),
      servicoMunicipal: new FormControl(produto.servicoMunicipal),
      leiComplementar: new FormControl(produto.leiComplementar),
      naturezaOperacao: new FormControl(produto.naturezaOperacao),
      retencaoIssCliente: new FormControl(produto.retencaoIssCliente),
      iss: new FormControl(produto.iss),
      inss: new FormControl(produto.inss),

      // Produto
      codigoBarra: new FormControl(produto.codigoBarra),
      categoriaProduto: new FormControl(produto.categoriaProduto),
      observacao: new FormControl(produto.observacao),
      origemProduto: new FormControl(produto.origemProduto),
      unidadeMedida: new FormControl(produto.unidadeMedida),
      ncm: new FormControl(produto.ncm),
      cest: new FormControl(produto.cest),
      pesoLiquido: new FormControl(produto.pesoLiquido),
      pesoBruto: new FormControl(produto.pesoBruto),
      fornecedores: new FormControl(produto.fornecedores)
    });
  }
}
