import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {CentroCusto} from '../../model/centro-custo';
import {ToastrService} from 'ngx-toastr';
import {CentroCustoService} from '../../service/centro-custo.service';


@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html'
})
export class CentroCustoComponent {

  centroCustoFormGroup: FormGroup = new CentroCusto().criarFormulario(new CentroCusto());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private centroCustoService: CentroCustoService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.centroCustoService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(centroCusto => {

        this.centroCustoFormGroup = new CentroCusto().criarFormulario(centroCusto);
      });
    }

  }

  salvar() {

    if (this.centroCustoFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.centroCustoService.salvar(this.centroCustoFormGroup.value).subscribe(c => {

      this.toastrService.success('Centro de Custo Salvo');
      this.router.navigate(['/centro-custo']);
    });

  }

  excluir() {

    this.centroCustoService.excluir(this.centroCustoFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Centro de Custo Excluído');
      this.router.navigate(['/centro-custo']);
    });
  }

}
