package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @Column(name = "ativo")
    private boolean ativo;

    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Enumerated(EnumType.STRING)
    @Column(name = "indicador_inscricao_estadual")
    private IndicadorInscricaoEstadual indicadorInscricaoEstadual;

    @Column(name = "inscricao_estadual")
    private String inscricaoEstadual;

    @Column(name = "inscricao_municipal")
    private String inscricaoMunicipal;

    @Column(name = "inscricao_suframa")
    private String inscricaoSUFRAMA;

    @Column(name = "optante_simples")
    private boolean optanteSIMPLES;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "rg")
    private String rg;

    @Column(name = "data_aniversario")
    private LocalDate dataAniversario;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone_comercial")
    private String telefoneComercial;

    @Column(name = "telefone_celular")
    private String telefoneCelular;

    @Column(name = "data_fundacao")
    private LocalDate dataFundacao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

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

    @ElementCollection
    @CollectionTable(name = "cliente_contato", joinColumns = {@JoinColumn(name = "cliente_id")})
    private List<Contato> contatos = new ArrayList<>();
}
