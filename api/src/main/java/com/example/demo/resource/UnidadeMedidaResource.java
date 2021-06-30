package com.example.demo.resource;

import com.example.demo.model.UnidadeMedida;
import com.example.demo.repository.UnidadeMedidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/unidadeMedida")
public class UnidadeMedidaResource {

    @Autowired
    private UnidadeMedidaRepository unidadeMedidaRepository;

    @GetMapping
    public List<UnidadeMedida> listar() {
        return unidadeMedidaRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<UnidadeMedida> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {
        return unidadeMedidaRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<UnidadeMedida>> select(@RequestParam String pesquisa) {
        return !unidadeMedidaRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(unidadeMedidaRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<UnidadeMedida> novo(@RequestBody UnidadeMedida unidadeMedida) {
        return ResponseEntity.ok(unidadeMedidaRepository.save(unidadeMedida));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<UnidadeMedida> alterar(@RequestBody UnidadeMedida unidadeMedida, @PathVariable Long id) {
        unidadeMedida.setId(id);
        return ResponseEntity.ok(unidadeMedidaRepository.save(unidadeMedida));
    }

    @GetMapping(value = "/{id}")
    public Optional<UnidadeMedida> consultarPorId(@PathVariable Long id) {
        return unidadeMedidaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {
        unidadeMedidaRepository.deleteById(id);
    }

}
