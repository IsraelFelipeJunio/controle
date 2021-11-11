package com.example.demo.service;

import com.example.demo.model.Projeto;
import com.example.demo.model.ProjetoFase;
import com.example.demo.model.ProjetoFaseTarefa;
import com.example.demo.model.ProjetoFaseTarefaRecurso;
import com.example.demo.repository.ProjetoFaseRepository;
import com.example.demo.repository.ProjetoFaseTarefaRepository;
import com.example.demo.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private ProjetoFaseRepository projetoFaseRepository;

    @Autowired
    private ProjetoFaseTarefaRepository projetoFaseTarefaRepository;


    public void atualizarPrevisaoCusto(Projeto projeto) {

        BigDecimal custoPrevisto = BigDecimal.ZERO;
        BigDecimal custoExecutado = BigDecimal.ZERO;
        List<ProjetoFase> projetoFases = projetoFaseRepository.findByProjetoId(projeto.getId());

        for (ProjetoFase projetoFase : projetoFases) {

            // Pega Tarefas
            List<ProjetoFaseTarefa> tarefas = projetoFaseTarefaRepository.findByProjetoFaseId(projetoFase.getId());
            for (ProjetoFaseTarefa tarefa : tarefas) {
                for (ProjetoFaseTarefaRecurso recurso : tarefa.getRecursos()) {
                    BigDecimal quantidadeBD = new BigDecimal(recurso.getQuantidadeUnidade());
                    custoPrevisto = custoPrevisto.add(recurso.getRecurso().getCusto().multiply(quantidadeBD));

                    if (recurso.isUtilizado()) {
                        custoExecutado = custoExecutado.add(recurso.getRecurso().getCusto().multiply(quantidadeBD));
                    }
                }
            }
        }

        // Atualiza custo Projeto
        projeto.setCustoPrevisto(custoPrevisto);
        projeto.setCustoExecutado(custoExecutado);
        projetoRepository.save(projeto);
    }

    public Projeto salvar(Projeto projeto) {

        List<ProjetoFase> projetoFases = projetoFaseRepository.findByProjetoId(projeto.getId());

        // Atualiza Andamento
        if (projetoFases.size() > 0) {
            Double somaFases = 0.0;
            for (ProjetoFase projetoFase : projetoFases) {
                somaFases = somaFases + projetoFase.getAndamento();
            }
            Double andamento = somaFases / projetoFases.size();
            double andamentoArredondado = Math.round(andamento * 100.0) / 100.0;
            projeto.setAndamento(andamentoArredondado);
            projetoRepository.save(projeto);
        }
        return projeto;
    }

}
