package com.example.demo.service;

import com.example.demo.model.ProjetoFase;
import com.example.demo.model.ProjetoFaseTarefa;
import com.example.demo.model.ProjetoFaseTarefaRecurso;
import com.example.demo.repository.ProjetoFaseRepository;
import com.example.demo.repository.ProjetoFaseTarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjetoFaseService {

    @Autowired
    private ProjetoFaseRepository projetoFaseRepository;

    @Autowired
    private ProjetoService projetoService;

    @Autowired
    private ProjetoFaseTarefaRepository projetoFaseTarefaRepository;


    public ProjetoFase salvar(ProjetoFase projetoFase) {

        // Salvar
        projetoFaseRepository.save(projetoFase);

        // Pega Tarefas
        List<ProjetoFaseTarefa> projetoFaseTarefas = this.retornaTarefas(projetoFase.getId());

        // Verifica se deve gerar a previsão de custo
        if (projetoFase.getProjeto().isGerarPrevisaoCusto() && !projetoFaseTarefas.isEmpty()) {
            this.atualizarPrevisaoCusto(projetoFase, projetoFaseTarefas);
        }

        return projetoFase;
    }

    public void excluir(Long id) {

        // Pega o ProjetoFase
        ProjetoFase projetoFase = projetoFaseRepository.findById(id).get();

        // Exclui o ProjetoFase
        projetoFaseRepository.deleteById(id);

        // Pega Tarefas
        List<ProjetoFaseTarefa> projetoFaseTarefas = this.retornaTarefas(projetoFase.getId());

        // Atualiza custo Projeto
        if (projetoFase.getProjeto().isGerarPrevisaoCusto() && !projetoFaseTarefas.isEmpty()) {
            projetoService.atualizarPrevisaoCusto(projetoFase.getProjeto());
        }
    }

    private void atualizarPrevisaoCusto(ProjetoFase projetoFase, List<ProjetoFaseTarefa> tarefas) {

        BigDecimal custoPrevisto = BigDecimal.ZERO;
        BigDecimal custoExecutado = BigDecimal.ZERO;
        for (ProjetoFaseTarefa tarefa : tarefas) {
            for (ProjetoFaseTarefaRecurso recurso : tarefa.getRecursos()) {
                BigDecimal quantidadeBD = new BigDecimal(recurso.getQuantidadeUnidade());
                custoPrevisto = custoPrevisto.add(recurso.getRecurso().getCusto().multiply(quantidadeBD));

                if (recurso.isUtilizado()) {
                    custoExecutado = custoExecutado.add(recurso.getRecurso().getCusto().multiply(quantidadeBD));
                }
            }
        }

        // Atualiza custo Projeto Fase
        projetoFase.setCustoPrevisto(custoPrevisto);
        projetoFase.setCustoExecutado(custoExecutado);
        projetoFaseRepository.save(projetoFase);

        // Atualiza custo Projeto
        projetoService.atualizarPrevisaoCusto(projetoFase.getProjeto());
    }

    private List<ProjetoFaseTarefa> retornaTarefas(Long projetoFaseId) {
        List<ProjetoFaseTarefa> projetoFaseTarefas = projetoFaseTarefaRepository.findByProjetoFaseId(projetoFaseId);
        return !projetoFaseTarefas.isEmpty() ? projetoFaseTarefas : new ArrayList<>();
//        return projetoFaseTarefaRepository.findByProjetoFaseId(projetoFaseId);
    }

}
