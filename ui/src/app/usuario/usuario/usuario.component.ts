import {Component} from '@angular/core';
import {UsuarioService} from '../../service/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../model/usuario';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {

  usuarioFormGroup: FormGroup = Usuario.criarFormulario(new Usuario());

  trocarSenhaFormGroup = new FormGroup({
    senha: new FormControl(null, Validators.required),
    senhaRepetida: new FormControl(null, Validators.required)
  });

  public modalTrocaSenha;

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private modalService: NgbModal,
              private usuarioService: UsuarioService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.usuarioService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(usuario => {

        this.usuarioFormGroup = Usuario.criarFormulario(usuario);
      });
    }

  }

  abrirModalTrocarSenha(content1: string) {

    this.modalTrocaSenha = this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title', centered: true});
  }

  salvar() {

    if (this.usuarioFormGroup.get('id').value) {
      this.usuarioFormGroup.get('senhaRepetida').clearValidators();
      this.usuarioFormGroup.get('senhaRepetida').updateValueAndValidity();
    }

    if (this.usuarioFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    if (!this.usuarioFormGroup.get('id').value) {
      if (this.usuarioFormGroup.get('senha').value !== this.usuarioFormGroup.get('senhaRepetida').value) {
        this.toastrService.error('As senhas digitas não se conferem.');
        return;
      }
    }

    this.usuarioService.salvar(this.usuarioFormGroup.value).subscribe(c => {

      this.toastrService.success('Usuário Salvo');
      this.router.navigate(['/usuario']);
    });

  }

  excluir() {

    this.usuarioService.excluir(this.usuarioFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Usuário Excluído');
      this.router.navigate(['/usuario']);
    });
  }

  trocarSenha() {

    if (this.trocarSenhaFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    if (this.trocarSenhaFormGroup.get('senha').value !== this.trocarSenhaFormGroup.get('senhaRepetida').value) {
      this.toastrService.error('As senhas digitas não se conferem.');
      return;
    }

    this.usuarioService.alterarSenha(this.trocarSenhaFormGroup.get('senha').value, this.usuarioFormGroup.value).subscribe(c => {

      this.modalTrocaSenha.close();

      this.toastrService.success('Senha alterada');
      // this.router.navigate(['/usuario/'+this.usuarioFormGroup.value.id]);

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/usuario/'+this.usuarioFormGroup.value.id]);
      });

    });
  }

}
