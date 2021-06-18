package com.example.demo.repository;

import com.example.demo.model.ProjetoFase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetoFaseRepository extends JpaRepository<ProjetoFase,Long> {

    @Query(
    " SELECT p FROM ProjetoFase p                                                                                                       " +
    " WHERE                                                                                                                             " +
    " ( cast(:descricao as string) IS NULL OR UPPER(p.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))              " +
    " OR                                                                                                                                " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(p.codigo as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY p.id ASC                                                                                                                 "
    )
    Page<ProjetoFase> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<ProjetoFase> findByDescricaoContainingIgnoreCase(String nome);

    List<ProjetoFase> findByDescricaoContainingIgnoreCaseAndIdNot(String nome, Long projetoId);

    List<ProjetoFase> findByProjetoId(Long projetoId);

}
