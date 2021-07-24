package com.example.demo.repository;

import com.example.demo.model.ProjetoAtaReuniao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetoAtaReuniaoRepository extends JpaRepository<ProjetoAtaReuniao,Long> {

    List<ProjetoAtaReuniao> findByAtaContainingIgnoreCase(String ata);

    List<ProjetoAtaReuniao> findByAtaContainingIgnoreCaseAndIdNot(String ata, Long projetoId);

    List<ProjetoAtaReuniao> findByProjetoId(Long projetoId);

}
