package com.example.demo.repository;

import com.example.demo.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {

    @Query(
    " SELECT c FROM Cliente c                                                                                              " +
    " WHERE                                                                                                                " +
    " ( cast(:nome as string) IS NULL OR UPPER(c.nome) like UPPER( CONCAT('%',cast(:nome as string),'%') ))                " +
    " OR                                                                                                                   " +
    " ( cast(:nome as string) IS NULL OR UPPER(cast(c.id as string)) like UPPER( CONCAT('%',cast(:nome as string),'%') ))  " +
    " ORDER BY c.id ASC                                                                                                    "
    )
    Page<Cliente> consultaDataTable(@Param("nome") String nome,Pageable pageable);

    List<Cliente> findByNomeContainingIgnoreCase(String nome);
}
