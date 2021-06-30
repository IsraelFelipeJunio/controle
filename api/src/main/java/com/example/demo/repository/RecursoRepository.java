package com.example.demo.repository;

import com.example.demo.model.Recurso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecursoRepository extends JpaRepository<Recurso,Long> {

    @Query(
    " SELECT r FROM Recurso r                                                                                                       " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(r.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))          " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(r.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY r.id ASC                                                                                                             "
    )
    Page<Recurso> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<Recurso> findByDescricaoContainingIgnoreCase(String descricao);

}
