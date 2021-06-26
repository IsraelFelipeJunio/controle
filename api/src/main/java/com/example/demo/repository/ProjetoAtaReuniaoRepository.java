package com.example.demo.repository;

import com.example.demo.model.ProjetoAtaReuniao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetoAtaReuniaoRepository extends JpaRepository<ProjetoAtaReuniao,Long> {

    @Query(
    " SELECT p FROM ProjetoAtaReuniao p                                                                                             " +
    " WHERE                                                                                                                         " +
    " ( cast(:descricao as string) IS NULL OR UPPER(p.ata) like UPPER( CONCAT('%',cast(:descricao as string),'%') ))                " +
    " OR                                                                                                                            " +
    " ( cast(:descricao as string) IS NULL OR UPPER(cast(p.id as string)) like UPPER( CONCAT('%',cast(:descricao as string),'%') )) " +
    " ORDER BY p.id ASC                                                                                                             "
    )
    Page<ProjetoAtaReuniao> consultaDataTable(@Param("descricao") String descricao, Pageable pageable);

    List<ProjetoAtaReuniao> findByAtaContainingIgnoreCase(String ata);

    List<ProjetoAtaReuniao> findByAtaContainingIgnoreCaseAndIdNot(String ata, Long projetoId);

    List<ProjetoAtaReuniao> findByProjetoId(Long projetoId);

}
