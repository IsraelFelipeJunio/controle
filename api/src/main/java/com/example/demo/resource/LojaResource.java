package com.example.demo.resource;

import com.example.demo.model.Loja;
import com.example.demo.repository.LojaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/loja")
public class LojaResource {

    @Autowired
    private LojaRepository lojaRepository;

    @GetMapping
    public List<Loja> listar() {

        return lojaRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Loja> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return lojaRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Loja>> select(@RequestParam String pesquisa) {

        return !lojaRepository.findByNomeContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(lojaRepository.findByNomeContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Loja> novo(@RequestBody Loja loja) {

        return ResponseEntity.ok(lojaRepository.save(loja));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Loja> alterar(@RequestBody Loja loja, @PathVariable Long id) {

        loja.setId(id);
        return ResponseEntity.ok(lojaRepository.save(loja));
    }

    @GetMapping(value = "/{id}")
    public Optional<Loja> consultarPorId(@PathVariable Long id) {

        return lojaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        lojaRepository.deleteById(id);
    }
}
