package com.example.demo.repository;

import com.example.demo.model.UnidadeMedida;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UnidadeMedidaRepository extends JpaRepository<UnidadeMedida,Long> {

    @Query(
    " SELECT u FROM UnidadeMedida u                                                                                                 " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(u.descricao) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))          " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(u.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY u.id ASC                                                                                                             "
    )
    Page<UnidadeMedida> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<UnidadeMedida> findByDescricaoContainingIgnoreCase(String descricao);

}
