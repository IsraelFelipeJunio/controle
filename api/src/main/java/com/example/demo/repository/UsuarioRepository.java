package com.example.demo.repository;

import com.example.demo.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Usuario findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByIdNotAndEmail(Long id, String email);

    @Query(
    " SELECT u FROM Usuario u                                                                                   " +
    " WHERE                                                                                                     " +
    " ( cast(:nome as string) IS NULL OR UPPER(u.nome) like UPPER( CONCAT('%',cast(:nome as string),'%') ))     " +
    " AND                                                                                                       " +
    " ( cast(:email as string) IS NULL OR UPPER(u.email) like UPPER( CONCAT('%',cast(:email as string),'%') ))  " +
    " ORDER BY u.nome ASC                                                                                       "
    )
    Page<Usuario> consultaDataTable(@Param("nome") String nome,@Param("email") String email,Pageable pageable);

    @Query(
    " SELECT u FROM Usuario u                                                                                           " +
    " WHERE                                                                                                             " +
    " ( cast(:pesquisa as string) IS NULL OR UPPER(u.nome) like UPPER( CONCAT('%',cast(:pesquisa as string),'%') ))     " +
    " OR                                                                                                                " +
    " ( cast(:pesquisa as string) IS NULL OR UPPER(u.email) like UPPER( CONCAT('%',cast(:pesquisa as string),'%') ))    " +
    " ORDER BY u.nome ASC                                                                                               "
    )
    Page<Usuario> consultaDataTable2(@Param("pesquisa") String pesquisa,Pageable pageable);

    List<Usuario> findByNomeContainingIgnoreCase(String nome);

}
