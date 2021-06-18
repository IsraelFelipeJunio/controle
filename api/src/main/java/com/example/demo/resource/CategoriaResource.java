package com.example.demo.resource;

import com.example.demo.model.Categoria;
import com.example.demo.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categoria")
public class CategoriaResource {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public List<Categoria> listar() {

        return categoriaRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Categoria> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return categoriaRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Categoria>> select(@RequestParam String pesquisa) {

        return !categoriaRepository.findByDescricaoContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(categoriaRepository.findByDescricaoContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Categoria> novo(@RequestBody Categoria categoria) {

        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Categoria> alterar(@RequestBody Categoria categoria, @PathVariable Long id) {

        categoria.setId(id);
        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }

    @GetMapping(value = "/{id}")
    public Optional<Categoria> consultarPorId(@PathVariable Long id) {

        return categoriaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        categoriaRepository.deleteById(id);
    }

}
