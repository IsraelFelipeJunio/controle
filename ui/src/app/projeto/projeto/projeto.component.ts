import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Projeto } from '../../model/projeto';
import { ProjetoResponsavel } from '../../model/projeto-responsavel';
import { ProjetoService } from '../../service/projeto.service';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html'
})
export class ProjetoComponent {

  projetoFormGroup: FormGroup = new Projeto().criarFormulario(new Projeto());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private projetoService: ProjetoService
  ) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.projetoService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(projeto => {

        this.projetoFormGroup = new Projeto().criarFormulario(projeto);

        // if (projeto!.projetoResponsaveis!.length == 0) {
        //   this.novoProjetoResponsavel();
        // }
      });

    } else {

      // const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];
      // control.push(ProjetoResponsavel.criarFormulario(new ProjetoResponsavel()));
    }

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

  projetoResponsaveis(): FormArray {

    return this.projetoFormGroup.get('projetoResponsaveis') as FormArray;
  }

  novoProjetoResponsavel() {

    const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];
    control.push(ProjetoResponsavel.criarFormulario(new ProjetoResponsavel()));
  }

  excluirProjetoResponsavel(index: any) {

    const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];
    control.removeAt(index);
  }

  excluirProjetoResponsaveisEmBranco() {

    const control = <FormArray>this.projetoFormGroup.controls['projetoResponsaveis'];

    let listExcluir: Array<any> = [];

    control.controls.forEach((value, index) => {

      if (value.value.descricao == null || value.value.descricao == '') {

        listExcluir.push(value);
      }
    });

    listExcluir.forEach(value => {

      control.controls.forEach((item, index) => {

        if (item === value) {
          control.removeAt(index);
        }
      });

    });
    control.updateValueAndValidity();
  }


}
