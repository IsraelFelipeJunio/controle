import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../service/categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent {

  categoriaFormGroup: FormGroup = new Categoria().criarFormulario(new Categoria());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private categoriaService: CategoriaService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.categoriaService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(categoria => {

        this.categoriaFormGroup = new Categoria().criarFormulario(categoria);
      });
    }

  }

  salvar() {

    if (this.categoriaFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.categoriaService.salvar(this.categoriaFormGroup.value).subscribe(c => {

      this.toastrService.success('Categoria Salvo');
      this.router.navigate(['/categoria']);
    });

  }

  excluir() {

    this.categoriaService.excluir(this.categoriaFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Categoria Excluído');
      this.router.navigate(['/categoria']);
    });
  }

}
