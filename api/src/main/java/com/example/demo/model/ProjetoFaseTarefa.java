package com.example.demo.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Embeddable
public class ProjetoFaseTarefa {

    @ManyToOne
    @JoinColumn(name = "tarefa_id")
    private Tarefa tarefa;

}
