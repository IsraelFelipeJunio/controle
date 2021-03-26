package com.example.demo.resource;

import com.example.demo.model.Cliente;
import com.example.demo.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cliente")
public class ClienteResource {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping
    public List<Cliente> listar() {

        return clienteRepository.findAll();
    }

    @GetMapping(value = "/dataTable")
    public Page<Cliente> dataTable(@RequestParam(required = false) String pesquisa, @RequestParam int page, @RequestParam int pageSize) {

        return clienteRepository.consultaDataTable(pesquisa, PageRequest.of(page, pageSize));
    }

    @CrossOrigin
    @GetMapping("/select")
    private ResponseEntity<List<Cliente>> select(@RequestParam String pesquisa) {

        return !clienteRepository.findByNomeContainingIgnoreCase(pesquisa).isEmpty() ?
                ResponseEntity.ok(clienteRepository.findByNomeContainingIgnoreCase(pesquisa)) :
                ResponseEntity.ok(new ArrayList<>());
    }

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Cliente> novo(@RequestBody Cliente cliente) {

        cliente.setDataCadastro(LocalDate.now());

        return ResponseEntity.ok(clienteRepository.save(cliente));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Cliente> alterar(@RequestBody Cliente cliente, @PathVariable Long id) {

        cliente.setId(id);
        return ResponseEntity.ok(clienteRepository.save(cliente));
    }

    @GetMapping(value = "/{id}")
    public Optional<Cliente> consultarPorId(@PathVariable Long id) {

        return clienteRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) {

        clienteRepository.deleteById(id);
    }
}
