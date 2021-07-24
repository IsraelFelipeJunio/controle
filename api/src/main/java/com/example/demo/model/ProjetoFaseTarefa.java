package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "projeto_fase_tarefa")
public class ProjetoFaseTarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @ManyToOne
    @JoinColumn(name = "projeto_fase_id")
    private ProjetoFase projetoFase;

    @Column(name = "andamento")
    private Double andamento;

    @ManyToOne
    @JoinColumn(name = "tarefa_id")
    private Tarefa tarefa;

    @ManyToOne
    @JoinColumn(name = "usuario_responsavel_id")
    private Usuario usuarioResponsavel;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @ManyToOne
    @JoinColumn(name = "projeto_fase_tarefa_dependente_id")
    @JsonIgnoreProperties(value = {"recursos", "tarefa", "usuarioResponsavel", "projetoFase", "projetoFaseTarefaDependente"})
    private ProjetoFaseTarefa projetoFaseTarefaDependente;

    @ElementCollection
    @CollectionTable(name = "projeto_fase_tarefa_recurso", joinColumns = {@JoinColumn(name = "projeto_fase_tarefa_id")})
    private List<ProjetoFaseTarefaRecurso> recursos = new ArrayList<>();

}
