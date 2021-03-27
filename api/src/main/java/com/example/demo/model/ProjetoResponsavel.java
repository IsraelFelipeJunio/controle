package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Embeddable
public class ProjetoResponsavel {

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "principal")
    private boolean principal;

}
