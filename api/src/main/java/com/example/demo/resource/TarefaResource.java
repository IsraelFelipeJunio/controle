package com.example.demo.resource;

import com.example.demo.model.Tarefa;
import com.example.demo.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tarefa")
public class TarefaResource {

    @Autowired
    private TarefaRepository tarefaRepository;

    @GetMapping
    public List<Tarefa> listar() {
        return tarefaRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Tarefa> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {
        return tarefaRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Tarefa>> select(@RequestParam String pesquisa) {
        return !tarefaRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(tarefaRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Tarefa> novo(@RequestBody Tarefa tarefa) {
        return ResponseEntity.ok(tarefaRepository.save(tarefa));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Tarefa> alterar(@RequestBody Tarefa tarefa, @PathVariable Long id) {
        tarefa.setId(id);
        return ResponseEntity.ok(tarefaRepository.save(tarefa));
    }

    @GetMapping(value = "/{id}")
    public Optional<Tarefa> consultarPorId(@PathVariable Long id) {
        return tarefaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {
        tarefaRepository.deleteById(id);
    }

}
