import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UnidadeMedida } from '../../model/unidade-medida';
import { UnidadeMedidaService } from '../../service/unidade-medida.service';


@Component({
  selector: 'app-unidade-medida',
  templateUrl: './unidade-medida.component.html'
})
export class UnidadeMedidaComponent {

  unidadeMedidaFormGroup: FormGroup = new UnidadeMedida().criarFormulario(new UnidadeMedida());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private unidadeMedidaService: UnidadeMedidaService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.unidadeMedidaService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(unidadeMedida => {

        this.unidadeMedidaFormGroup = new UnidadeMedida().criarFormulario(unidadeMedida);
      });
    }

  }

  salvar() {

    if (this.unidadeMedidaFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.unidadeMedidaService.salvar(this.unidadeMedidaFormGroup.value).subscribe(c => {

      this.toastrService.success('Unidade de Medida salva');
      this.router.navigate(['/unidade-medida']);
    });

  }

  excluir() {

    this.unidadeMedidaService.excluir(this.unidadeMedidaFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Unidade de Medida excluída');
      this.router.navigate(['/unidade-medida']);
    });
  }

}
