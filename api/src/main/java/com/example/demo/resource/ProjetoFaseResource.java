package com.example.demo.resource;

import com.example.demo.model.ProjetoFase;
import com.example.demo.model.enuns.StatusFase;
import com.example.demo.repository.ProjetoFaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projetoFase")
public class ProjetoFaseResource {

    @Autowired
    private ProjetoFaseRepository projetoFaseRepository;

    @GetMapping
    public List<ProjetoFase> listar() {

        return projetoFaseRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<ProjetoFase> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return projetoFaseRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<ProjetoFase>> select(@RequestParam String pesquisa) {

        return !projetoFaseRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(projetoFaseRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @GetMapping("/consultarFasePorProjeto")
    private ResponseEntity<List<ProjetoFase>> select(@RequestParam String pesquisa,
                                                     @RequestParam Long projetoId) {

        return !projetoFaseRepository.findByDescricaoContainingIgnoreCaseAndProjetoIdOrderByCodigo(pesquisa, projetoId).isEmpty() ?
                ResponseEntity.ok(projetoFaseRepository.findByDescricaoContainingIgnoreCaseAndProjetoIdOrderByCodigo(pesquisa, projetoId)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<ProjetoFase> novo(@RequestBody ProjetoFase projetoFase) {
        projetoFase.setStatusFase(StatusFase.AGUARDANDO_INICIO);
        return ResponseEntity.ok(projetoFaseRepository.save(projetoFase));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<ProjetoFase> alterar(@RequestBody ProjetoFase projetoFase, @PathVariable Long id) {
        projetoFase.setId(id);
        if (projetoFase.getStatusFase() == null) projetoFase.setStatusFase(StatusFase.AGUARDANDO_INICIO);
        return ResponseEntity.ok(projetoFaseRepository.save(projetoFase));
    }

    @GetMapping(value = "/{id}")
    public Optional<ProjetoFase> consultarPorId(@PathVariable Long id) {

        return projetoFaseRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        projetoFaseRepository.deleteById(id);
    }

    @GetMapping(value = "/consultarPorProjeto/{projetoId}")
    public List<ProjetoFase> consultarPorProjeto(@PathVariable Long projetoId) {

        return projetoFaseRepository.findByProjetoId(projetoId);
    }

}
