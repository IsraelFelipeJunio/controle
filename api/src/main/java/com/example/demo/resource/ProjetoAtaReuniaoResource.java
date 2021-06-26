package com.example.demo.resource;

import com.example.demo.model.ProjetoAtaReuniao;
import com.example.demo.repository.ProjetoAtaReuniaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projetoAtaReuniao")
public class ProjetoAtaReuniaoResource {

    @Autowired
    private ProjetoAtaReuniaoRepository projetoFaseRepository;

    @GetMapping
    public List<ProjetoAtaReuniao> listar() {
        return projetoFaseRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<ProjetoAtaReuniao> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return projetoFaseRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<ProjetoAtaReuniao>> select(@RequestParam String pesquisa) {

        return !projetoFaseRepository.findByAtaContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(projetoFaseRepository.findByAtaContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @GetMapping("/consultarProjetoPai")
    private ResponseEntity<List<ProjetoAtaReuniao>> select(@RequestParam String pesquisa, @RequestParam Long projetoId) {

        return !projetoFaseRepository.findByAtaContainingIgnoreCaseAndIdNot(pesquisa, projetoId).isEmpty() ?
                ResponseEntity.ok(projetoFaseRepository.findByAtaContainingIgnoreCaseAndIdNot(pesquisa, projetoId)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<ProjetoAtaReuniao> novo(@RequestBody ProjetoAtaReuniao projetoAtaReuniao) {
        return ResponseEntity.ok(projetoFaseRepository.save(projetoAtaReuniao));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<ProjetoAtaReuniao> alterar(@RequestBody ProjetoAtaReuniao projetoAtaReuniao, @PathVariable Long id) {
        projetoAtaReuniao.setId(id);
        return ResponseEntity.ok(projetoFaseRepository.save(projetoAtaReuniao));
    }

    @GetMapping(value = "/{id}")
    public Optional<ProjetoAtaReuniao> consultarPorId(@PathVariable Long id) {
        return projetoFaseRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {
        projetoFaseRepository.deleteById(id);
    }

    @GetMapping(value = "/consultarPorProjeto/{projetoId}")
    public List<ProjetoAtaReuniao> consultarPorProjeto(@PathVariable Long projetoId) {
        return projetoFaseRepository.findByProjetoId(projetoId);
    }

}
