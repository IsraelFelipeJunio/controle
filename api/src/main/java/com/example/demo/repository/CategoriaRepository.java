package com.example.demo.repository;

import com.example.demo.model.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoriaRepository extends JpaRepository<Categoria,Long> {

    @Query(
    " SELECT c FROM Categoria c                                                                                                     " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(c.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))          " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(c.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY c.id ASC                                                                                                             "
    )
    Page<Categoria> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<Categoria> findByDescricaoContainingIgnoreCase(String descricao);

}
