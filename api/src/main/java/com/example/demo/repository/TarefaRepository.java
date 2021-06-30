package com.example.demo.repository;

import com.example.demo.model.Tarefa;
import com.example.demo.model.UnidadeMedida;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa,Long> {

    @Query(
    " SELECT t FROM Tarefa t                                                                                                        " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(t.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))          " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(t.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY t.id ASC                                                                                                             "
    )
    Page<Tarefa> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<Tarefa> findByDescricaoContainingIgnoreCase(String descricao);

}
