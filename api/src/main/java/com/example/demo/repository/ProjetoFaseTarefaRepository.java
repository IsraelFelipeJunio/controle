package com.example.demo.repository;

import com.example.demo.model.ProjetoFaseTarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetoFaseTarefaRepository extends JpaRepository<ProjetoFaseTarefa,Long> {

    List<ProjetoFaseTarefa> findByDescricaoContainingIgnoreCase(String nome);

    List<ProjetoFaseTarefa> findByDescricaoContainingIgnoreCaseAndProjetoFaseIdOrderByCodigo(String nome, Long projetoFaseId);

    List<ProjetoFaseTarefa> findByDescricaoContainingIgnoreCaseAndIdNotOrderByCodigo(String nome, Long id);

    List<ProjetoFaseTarefa> findByProjetoFaseId(Long projetoFaseId);

}
