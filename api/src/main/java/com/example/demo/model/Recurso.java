package com.example.demo.model;

import com.example.demo.model.enuns.Tipo;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "recurso")
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "custo")
    private BigDecimal custo;

    @ManyToOne
    @JoinColumn(name = "unidade_medida_id")
    private UnidadeMedida unidadeMedida;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private Tipo tipo;

}
