package com.example.demo.resource;

import com.example.demo.model.CentroCusto;
import com.example.demo.repository.CentroCustoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/centroCusto")
public class CentroCustoResource {

    @Autowired
    private CentroCustoRepository centroCustoRepository;

    @GetMapping
    public List<CentroCusto> listar() {

        return centroCustoRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<CentroCusto> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return centroCustoRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<CentroCusto>> select(@RequestParam String pesquisa) {

        return !centroCustoRepository.findByNomeContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(centroCustoRepository.findByNomeContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<CentroCusto> novo(@RequestBody CentroCusto centroCusto) {

        return ResponseEntity.ok(centroCustoRepository.save(centroCusto));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<CentroCusto> alterar(@RequestBody CentroCusto centroCusto, @PathVariable Long id) {

        centroCusto.setId(id);
        return ResponseEntity.ok(centroCustoRepository.save(centroCusto));
    }

    @GetMapping(value = "/{id}")
    public Optional<CentroCusto> consultarPorId(@PathVariable Long id) {

        return centroCustoRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        centroCustoRepository.deleteById(id);
    }
}
