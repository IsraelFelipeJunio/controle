package com.example.demo.service;

import com.example.demo.model.DashboardDTO;
import com.example.demo.model.DashboardProjetoDTO;
import com.example.demo.model.Projeto;
import com.example.demo.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private ProjetoRepository projetoRepository;


    public DashboardDTO carregaDashboard() {

        // Salvar
        List<Projeto> projetos = projetoRepository.findAll();

        // Cria Variáveis
        List<DashboardProjetoDTO> projetosDTO = new ArrayList<>();
        BigDecimal custoPrevisto = BigDecimal.ZERO;
        BigDecimal custoExecutado = BigDecimal.ZERO;

        for (Projeto projeto : projetos) {
            // Popula Projeto
            DashboardProjetoDTO projetoDTO = new DashboardProjetoDTO();
            projetoDTO.setProjeto(projeto.getDescricao());
            projeto.getProjetoResponsaveis().stream().forEach(projetoResponsavel -> {
                if (projetoResponsavel.isPrincipal()) {
                    projetoDTO.setResponsavel(projetoResponsavel.getUsuario().getNome());
                    return;
                } else {
                    projetoDTO.setResponsavel(projetoResponsavel.getUsuario().getNome());
                    return;
                }
            });
            projetoDTO.setAndamento(projeto.getAndamento());
            if (projeto.getAndamento() == 100.0) {
                projetoDTO.setStatus("VERDE");
            } else if (projeto.getAndamento() >= 50.0) {
                projetoDTO.setStatus("LARANJA");
            } else {
                projetoDTO.setStatus("VERMELHO");
            }

            // Insere na Lista
            projetosDTO.add(projetoDTO);

            // Soma Custos
            custoPrevisto = custoPrevisto.add(projeto.getCustoPrevisto());
            custoExecutado = custoExecutado.add(projeto.getCustoExecutado());
        }

        // Calcula média Projetos
        Double andamentoSoma = 0.0;
        Double andamentoMedia = 0.0;
        for (DashboardProjetoDTO dashboardProjetoDTO : projetosDTO) {
            andamentoSoma = andamentoSoma + dashboardProjetoDTO.getAndamento();
        }
        if (projetosDTO.size() > 0) {
            andamentoMedia = andamentoSoma / projetosDTO.size();
        }

        // Popula Dashboard
        DashboardDTO dashboardDTO = new DashboardDTO();
        dashboardDTO.setCustoPrevisto(custoPrevisto);
        dashboardDTO.setCustoExecutado(custoExecutado);
        dashboardDTO.setProjetos(projetosDTO);
        dashboardDTO.setAndamentoMediaGeral(andamentoMedia);

        return dashboardDTO;
    }

}
