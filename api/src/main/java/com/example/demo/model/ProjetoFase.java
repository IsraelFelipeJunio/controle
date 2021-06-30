package com.example.demo.model;

import com.example.demo.model.enuns.StatusFase;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "projeto_fase")
public class ProjetoFase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @Column(name = "andamento")
    private Double andamento;

    @Column(name = "levantamento_requisito")
    private String levantamentoRequisito;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_fase")
    private StatusFase statusFase;

    @ElementCollection
    @CollectionTable(name = "projeto_fase_responsavel", joinColumns = {@JoinColumn(name = "projeto_fase_id")})
    private List<ProjetoFaseResponsavel> projetoFaseResponsaveis = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "projeto_fase_recurso", joinColumns = {@JoinColumn(name = "projeto_fase_id")})
    private List<ProjetoFaseRecurso> projetoFaseRecursos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "projeto_fase_tarefa", joinColumns = {@JoinColumn(name = "projeto_fase_id")})
    private List<ProjetoFaseTarefa> projetoFaseTarefas = new ArrayList<>();

}
