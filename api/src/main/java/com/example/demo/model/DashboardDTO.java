package com.example.demo.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class DashboardDTO {

    private BigDecimal custoPrevisto;
    private BigDecimal custoExecutado;
    private Double andamentoMediaGeral;
    private List<DashboardProjetoDTO> projetos;

}
