package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
public class Loja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @Column(name = "nome")
    private String nome;

    // FISICA
    @Column(name = "cpf")
    private String cpf;

    // JURIDICA
    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "data_fundacao")
    private LocalDate dataFundacao;

    @Column(name = "optante_simples_nacional")
    private boolean optanteSimplesNacional;

    @Column(name = "vende_produto")
    private boolean vendeProduto;

    @Column(name = "vende_servico")
    private boolean vendeServico;

    @Column(name = "inscricao_municipal")
    private String inscricaoMunicipal;

    @Column(name = "inscricao_estadual")
    private String inscricaoEstadual;

    @Column(name = "isento_inscricao_estadual")
    private boolean isentoInscricaoEstadual;

    // ENDERECO E CONTATOS
    @Column(name = "cep")
    private String cep;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "numero")
    private String numero;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "uf")
    private String uf;

    @Column(name = "ibge")
    private String ibge;

    @Column(name = "gia")
    private String gia;

    @Column(name = "ddd")
    private String ddd;

    @Column(name = "siafi")
    private String siafi;

    @Column(name = "telefone_comercial")
    private String telefoneComercial;

    @Column(name = "email")
    private String email;
}
