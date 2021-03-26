package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Embeddable
public class Contato {

    @Column(name = "nome")
    private String nome;

    @Column(name = "email")
    private String email;

    @Column(name = "fone")
    private String fone;

    @Column(name = "cargo")
    private String cargo;
}
