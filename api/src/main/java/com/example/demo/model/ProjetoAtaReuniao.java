package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "projeto_ata_reuniao")
public class ProjetoAtaReuniao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo")
    private Integer codigo;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @ManyToOne
    @JoinColumn(name = "projeto_fase_id")
    private ProjetoFase projetoFase;

    @Column(name = "data_hora")
    private LocalDateTime dataHora;

    @Column(name = "ata")
    private String ata;

    @Column(name = "envia_email")
    private boolean enviaEmail;

    @Column(name = "titulo_email")
    private String tituloEmail;

    @Column(name = "corpo_email")
    private String corpoEmail;

    @ElementCollection
    @CollectionTable(name = "projeto_ata_reuniao_participante", joinColumns = {@JoinColumn(name = "projeto_ata_reuniao_id")})
    private List<ProjetoAtaReuniaoParticipante> projetoAtaReuniaoParticipantes = new ArrayList<>();

}
