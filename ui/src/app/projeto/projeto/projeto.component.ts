import { CategoriaService } from './../../service/categoria.service';
import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Projeto } from '../../model/projeto';
import { ProjetoResponsavel } from '../../model/projeto-responsavel';
import { ProjetoService } from '../../service/projeto.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Categoria } from '../../model/categoria';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html'
})
export class ProjetoComponent {

  // NG SELECT PROJETO PAI
  subjectProjeto: Subject<string> = new Subject<string>();
  projetos: Projeto[] = [];

  // NG SELECT CATEGORIA
  subjectCategoria: Subject<string> = new Subject<string>();
  categorias: Categoria[] = [];

  // NG SELECT USUÁRIO
  subjectUsuario: Subject<string> = new Subject<string>();
  usuarios: Usuario[] = [];
  
  projetoFormGroup: FormGroup = new Projeto().criarFormulario(new Projeto());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private projetoService: ProjetoService,
              private categoriaService: CategoriaService,
              private usuarioService: UsuarioService
  ) {

    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.projetoService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(projeto => {

        this.projetoFormGroup = new Projeto().criarFormulario(projeto);

        if (projeto!.projetoResponsaveis!.length == 0) {
          this.adicionarProjetoResponsavel();
        }
      });

    } else {
      this.adicionarProjetoResponsavel();
    }

    // NG SELECT PROJETO PAI
    this.subjectProjeto.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.projetoService.consultarProjetoPai(ret, this.projetoFormGroup!.get('id')!.value);
      }),
    ).subscribe(dados => {
      this.projetos = dados;
    });
    this.subjectProjeto.next('');

    // NG SELECT CATEGORIA
    this.subjectCategoria.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.categoriaService.consultarSelect(ret);
      }),
    ).subscribe(dados => {
      this.categorias = dados;
    });
    this.subjectCategoria.next('');

    // NG SELECT USUÁRIO
    this.subjectUsuario.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.usuarioService.consultarSelect(ret);
      }),
    ).subscribe(dados => {
      this.usuarios = dados;
    });
    this.subjectUsuario.next('');

  }

  salvar() {

    // if (this.projetoFormGroup.invalid) {
    //   this.toastrService.error('Favor preencher todos os campos obrigatórios.');
    //   return;
    // }

    // this.excluirProjetoResponsaveisEmBranco();

    this.projetoService.salvar(this.projetoFormGroup.value).subscribe(c => {

      this.toastrService.success('Projeto Salvo');
      this.router.navigate(['/projeto']);
    });

  }

  excluir() {

    this.projetoService.excluir(this.projetoFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Projeto Excluído');
      this.router.navigate(['/projeto']);
    });
  }

  // projetoResponsaveis(): FormArray {

  //   return this.projetoFormGroup.get('projetoResponsaveis') as FormArray;
  // }

  // novoProjetoResponsavel() {

  //   const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];
  //   control.push(ProjetoResponsavel.criarFormulario(new ProjetoResponsavel()));
  // }

  // excluirProjetoResponsaveisEmBranco() {

  //   const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];

  //   let listExcluir: Array<any> = [];

  //   control.controls.forEach((value, index) => {

  //     if (value.value.descricao == null || value.value.descricao == '') {

  //       listExcluir.push(value);
  //     }
  //   });

  //   listExcluir.forEach(value => {

  //     control.controls.forEach((item, index) => {

  //       if (item === value) {
  //         control.removeAt(index);
  //       }
  //     });

  //   });
  //   control.updateValueAndValidity();
  // }

  consultarProjetos(term: any) {
    this.subjectProjeto.next(term.term);
  }

  consultarCategorias(term: any) {
    this.subjectCategoria.next(term.term);
  }

  consultarUsuarios(term: any) {

    this.subjectUsuario.next(term.term);
  }

  projetoResponsaveisFormArray(): FormArray {

    return this.projetoFormGroup.get('projetoResponsaveis') as FormArray;
  }

  adicionarProjetoResponsavel() {

    const control = (<FormArray>this.projetoFormGroup.controls['projetoResponsaveis']).push(ProjetoResponsavel.criarFormulario(new ProjetoResponsavel()));
    console.log(control);
  }

  excluirProjetoResponsavel(index: any) {

    const control = (<FormArray>this.projetoFormGroup.controls['projetoResponsaveis']).removeAt(index);
  }
  
}
