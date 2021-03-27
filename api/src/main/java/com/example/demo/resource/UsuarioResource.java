package com.example.demo.resource;

import com.example.demo.model.Empresa;
import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioResource {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin
    @PostMapping
    private ResponseEntity<Usuario> novo(@RequestBody Usuario usuario) throws Exception {

        if (usuario.getId() != null) {
            if (usuarioRepository.existsByIdNotAndEmail(usuario.getId(), usuario.getEmail())) {
//                throw new ExceptionGeral("E-mail já cadastrado.");
            }
        } else {
            if (usuarioRepository.existsByEmail(usuario.getEmail())) {
//                throw new ExceptionGeral("E-mail já cadastrado.");
            }

            // Criptografar a senha
            usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        }
        if (usuario.getEmail() == null) {
            usuario.setNome(usuario.getEmail());
        }

//        usuarioService.validacoes(usuario);

        usuario.setEmpresaLogada(usuarioService.usuarioLogado().getEmpresaLogada());
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    private ResponseEntity<Usuario> alterar(@RequestBody Usuario usuario, @PathVariable Long id) throws Exception {

        if (usuarioRepository.existsByIdNotAndEmail(usuario.getId(), usuario.getEmail())) {
//            throw new ExceptionGeral("E-mail já cadastrado.");
        }

        if (!usuarioRepository.findById(id).get().getSenha().equals(usuario.getSenha())) {

            // Criptografar a senha
            usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getPassword()));
        }

        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}/empresa")
    private ResponseEntity<Usuario> alterarEmpresa(@RequestBody Empresa empresa, @PathVariable Long id) {

        Usuario usuario = usuarioRepository.findById(id).get();
        usuario.setEmpresaLogada(empresa);
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @CrossOrigin
    @PutMapping(value = "/{id}/senha")
    private ResponseEntity<Usuario> alterarSenha(@RequestBody String senha, @PathVariable Long id) {

        Usuario usuario = usuarioRepository.findById(id).get();
        usuario.setSenha(new BCryptPasswordEncoder().encode(senha));
        return ResponseEntity.ok(usuarioRepository.save(usuario));
    }

    @GetMapping(value = "/dataTable")
    public Page<Usuario> dataTable(@RequestParam(required = false) String nome,
                                   @RequestParam(required = false) String email,
                                   @RequestParam int page, @RequestParam int pageSize) {

        return usuarioRepository.consultaDataTable(nome, email, PageRequest.of(page, pageSize));
    }

    @GetMapping(value = "/dataTable2")
    public Page<Usuario> dataTable2(@RequestParam(required = false) String pesquisa,
                                   @RequestParam int page, @RequestParam int pageSize) {

        return usuarioRepository.consultaDataTable2(pesquisa, PageRequest.of(page, pageSize));
    }

    @GetMapping(value = "/{id}")
    public Optional<Usuario> consultarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    @DeleteMapping(path = {"/{id}"})
    public void excluir(@PathVariable("id") Long id) throws Exception {
        usuarioRepository.deleteById(id);
    }

}
