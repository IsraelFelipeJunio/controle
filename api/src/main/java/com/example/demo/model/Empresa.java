package com.example.demo.model;

import com.example.demo.model.enuns.TipoPessoa;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "empresa")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pessoa")
    private TipoPessoa tipoPessoa;

    @Column(name = "nome")
    private String nome;

    @ManyToOne
    @JoinColumn(name = "empresa_pai_id")
    private Empresa empresaPai;

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
