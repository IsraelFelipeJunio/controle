package com.example.demo.resource;

import com.example.demo.model.ProjetoFaseTarefa;
import com.example.demo.repository.ProjetoFaseTarefaRepository;
import com.example.demo.service.ProjetoFaseTarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/projetoFaseTarefa")
public class ProjetoFaseTarefaResource {

    @Autowired
    private ProjetoFaseTarefaRepository projetoFaseTarefaRepository;

    @Autowired
    private ProjetoFaseTarefaService projetoFaseTarefaService;


    @GetMapping
    public List<ProjetoFaseTarefa> listar() {
        return projetoFaseTarefaRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<ProjetoFaseTarefa>> select(@RequestParam String pesquisa) {

        List<ProjetoFaseTarefa> tarefas = projetoFaseTarefaRepository.findByDescricaoContainingIgnoreCase(pesquisa);

        return !tarefas.isEmpty() ?
                ResponseEntity.ok(tarefas) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @GetMapping("/consultarFasePorProjetoFase")
    private ResponseEntity<List<ProjetoFaseTarefa>> select(@RequestParam String pesquisa, @RequestParam Long projetoFaseId) {

        List<ProjetoFaseTarefa> tarefas = projetoFaseTarefaRepository.
                findByDescricaoContainingIgnoreCaseAndProjetoFaseIdOrderByCodigo(pesquisa, projetoFaseId);

        return !tarefas.isEmpty() ?
                ResponseEntity.ok(tarefas) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @GetMapping("/consultarProjetoFaseTarefaPai")
    private ResponseEntity<List<ProjetoFaseTarefa>> selectPai(@RequestParam String pesquisa, @RequestParam Long projetoFaseId) {

        List<ProjetoFaseTarefa> tarefas = projetoFaseTarefaRepository.
                findByDescricaoContainingIgnoreCaseAndIdNotOrderByCodigo(pesquisa, projetoFaseId);

        return !tarefas.isEmpty() ?
                ResponseEntity.ok(tarefas) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<ProjetoFaseTarefa> novo(@RequestBody ProjetoFaseTarefa projetoFaseTarefa) {
        projetoFaseTarefa.setDescricao(projetoFaseTarefa.getDescricao().toUpperCase());
        projetoFaseTarefa.getRecursos().stream().forEach(tar -> tar.setDescricao(tar.getDescricao().toUpperCase()));
        return ResponseEntity.ok(projetoFaseTarefaService.salvar(projetoFaseTarefa));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<ProjetoFaseTarefa> alterar(@RequestBody ProjetoFaseTarefa projetoFaseTarefa, @PathVariable Long id) {
        projetoFaseTarefa.setId(id);
        return ResponseEntity.ok(projetoFaseTarefaService.salvar(projetoFaseTarefa));
    }

    @GetMapping(value = "/{id}")
    public Optional<ProjetoFaseTarefa> consultarPorId(@PathVariable Long id) {

        return projetoFaseTarefaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {
        projetoFaseTarefaRepository.deleteById(id);
    }

    @GetMapping(value = "/consultarPorProjetoFase/{projetoFaseId}")
    public List<ProjetoFaseTarefa> consultarPorProjeto(@PathVariable Long projetoFaseId) {

        return projetoFaseTarefaRepository.findByProjetoFaseId(projetoFaseId);
    }

}
