package com.example.demo.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Embeddable
public class ProjetoFaseRecurso {

    @ManyToOne
    @JoinColumn(name = "recurso_id")
    private Recurso recurso;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "utilizado")
    private boolean utilizado;

    @Column(name = "quantidade_unidade")
    private Double quantidadeUnidade;

}
