package com.example.demo.resource;

import com.example.demo.model.Projeto;
import com.example.demo.repository.ProjetoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/projeto")
public class ProjetoResource {

    @Autowired
    private ProjetoRepository projetoRepository;


    @GetMapping
    public List<Projeto> listar() {

        return projetoRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Projeto> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return projetoRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Projeto>> select(@RequestParam String pesquisa) {

        return !projetoRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(projetoRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @GetMapping("/consultarProjetoPai")
    private ResponseEntity<List<Projeto>> select(@RequestParam String pesquisa,
                                                 @RequestParam Long projetoId) {

        return !projetoRepository.findByDescricaoContainingIgnoreCaseAndIdNot(pesquisa, projetoId).isEmpty() ?
                ResponseEntity.ok(projetoRepository.findByDescricaoContainingIgnoreCaseAndIdNot(pesquisa, projetoId)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Projeto> novo(@RequestBody Projeto projeto) {
        if (projeto.isGerarPrevisaoCusto()) {
            projeto.setCustoPrevisto(BigDecimal.ZERO);
            projeto.setCustoExecutado(BigDecimal.ZERO);
        }
        projeto.setAndamento(0.0);
        return ResponseEntity.ok(projetoRepository.save(projeto));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Projeto> alterar(@RequestBody Projeto projeto, @PathVariable Long id) {

        projeto.setId(id);
        return ResponseEntity.ok(projetoRepository.save(projeto));
    }

    @GetMapping(value = "/{id}")
    public Projeto consultarPorId(@PathVariable Long id) {

        return projetoRepository.findByIdOrderByIdDesc(id);
    }

    @GetMapping(value = "/consultaProjetoCadastrado")
    public Projeto consultaProjetoCadastrado() {

        return projetoRepository.findFirstByOrderByIdDesc();
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        projetoRepository.deleteById(id);
    }

}
