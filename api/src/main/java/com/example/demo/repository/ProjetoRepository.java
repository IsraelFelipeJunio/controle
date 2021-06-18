package com.example.demo.repository;

import com.example.demo.model.Projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetoRepository extends JpaRepository<Projeto,Long> {

    @Query(
    " SELECT p FROM Projeto p                                                                                                       " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(p.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))          " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(p.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY p.id ASC                                                                                                             "
    )
    Page<Projeto> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<Projeto> findByDescricaoContainingIgnoreCase(String nome);

    List<Projeto> findByDescricaoContainingIgnoreCaseAndIdNot(String nome, Long projetoId);

    Projeto findByIdOrderByIdDesc(Long id);

}
