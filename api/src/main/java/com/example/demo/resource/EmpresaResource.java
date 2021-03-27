package com.example.demo.resource;

import com.example.demo.model.Empresa;
import com.example.demo.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresa")
public class EmpresaResource {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public List<Empresa> listar() {

        return empresaRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Empresa> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return empresaRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Empresa>> select(@RequestParam String pesquisa) {

        return !empresaRepository.findByNomeContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(empresaRepository.findByNomeContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Empresa> novo(@RequestBody Empresa empresa) {

        return ResponseEntity.ok(empresaRepository.save(empresa));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Empresa> alterar(@RequestBody Empresa empresa, @PathVariable Long id) {

        empresa.setId(id);
        return ResponseEntity.ok(empresaRepository.save(empresa));
    }

    @GetMapping(value = "/{id}")
    public Optional<Empresa> consultarPorId(@PathVariable Long id) {

        return empresaRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        empresaRepository.deleteById(id);
    }
}
