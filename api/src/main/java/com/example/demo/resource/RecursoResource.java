package com.example.demo.resource;

import com.example.demo.model.Recurso;
import com.example.demo.repository.RecursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recurso")
public class RecursoResource {

    @Autowired
    private RecursoRepository recursoRepository;

    @GetMapping
    public List<Recurso> listar() {
        return recursoRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Recurso> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {
        return recursoRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Recurso>> select(@RequestParam String pesquisa) {
        return !recursoRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(recursoRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Recurso> novo(@RequestBody Recurso recurso) {
        return ResponseEntity.ok(recursoRepository.save(recurso));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Recurso> alterar(@RequestBody Recurso recurso, @PathVariable Long id) {
        recurso.setId(id);
        return ResponseEntity.ok(recursoRepository.save(recurso));
    }

    @GetMapping(value = "/{id}")
    public Optional<Recurso> consultarPorId(@PathVariable Long id) {
        return recursoRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {
        recursoRepository.deleteById(id);
    }

}
