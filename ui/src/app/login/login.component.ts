import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {AutenticacaoService} from '../service/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private autenticacaoService: AutenticacaoService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      empresa: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

  }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  ngOnInit() {

    // this.autenticacaoService.deslogar();
  }

  logar() {

    console.log(this.loginForm.controls);

    // localStorage.setItem('inquilino', JSON.stringify(this.loginForm.controls.empresa.value));

    this.autenticacaoService.logar(this.loginForm.controls.email.value, this.loginForm.controls.senha.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Bem Vindo ao Cloud ERP');
          this.router.navigate(['/dashboard/classic']);
        },
        error => {
          console.log(error);
          this.toastr.error('E-mail ou Senha inválidos.', 'Erro');
          // this.toastr.error(error.error.mensagemUsuario, 'Erro');
        });
  }
}
