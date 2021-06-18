package com.example.demo.model;

import com.example.demo.model.enuns.StatusProjeto;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "projeto")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "andamento")
    private Double andamento;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_projeto")
    private StatusProjeto statusProjeto;

    @ManyToOne
    @JoinColumn(name = "projeto_pai_id")
    private Projeto projetoPai;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @ElementCollection
    @CollectionTable(name = "projeto_responsavel", joinColumns = {@JoinColumn(name = "projeto_id")})
    private List<ProjetoResponsavel> projetoResponsaveis = new ArrayList<>();

}
