package com.example.demo.service;

import com.example.demo.model.ProjetoFaseTarefa;
import com.example.demo.model.ProjetoFaseTarefaRecurso;
import com.example.demo.repository.ProjetoFaseTarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetoFaseTarefaService {

    @Autowired
    private ProjetoFaseTarefaRepository projetoFaseTarefaRepository;

    @Autowired
    private ProjetoFaseService projetoFaseService;


    public ProjetoFaseTarefa salvar(ProjetoFaseTarefa projetoFaseTarefa) {

        // Salvar
        projetoFaseTarefaRepository.save(projetoFaseTarefa);

        // Pega Tarefas
        List<ProjetoFaseTarefa> projetoFaseTarefas = projetoFaseService.retornaTarefas(projetoFaseTarefa.getProjetoFase().getId());

        // Atualiza
        projetoFaseService.atualizarPrevisaoCusto(projetoFaseTarefa.getProjetoFase(), projetoFaseTarefas);

        // Atualiza Andamento
        if (projetoFaseTarefa.getRecursos().size() > 0) {
            Double utilizado = 0.0;
            for (ProjetoFaseTarefaRecurso recurso : projetoFaseTarefa.getRecursos()) {
                if (recurso.isUtilizado()) utilizado = utilizado + 1;
            }

            Double andamento = (100 * utilizado) / projetoFaseTarefa.getRecursos().size();
            double andamentoArredondado = Math.round(andamento * 100.0) / 100.0;
            projetoFaseTarefa.setAndamento(andamentoArredondado);
            projetoFaseTarefaRepository.save(projetoFaseTarefa);
        }

        return projetoFaseTarefa;
    }

}
