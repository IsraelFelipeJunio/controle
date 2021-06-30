import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Recurso } from '../../model/recurso';
import { RecursoService } from '../../service/recurso.service';
import { Subject } from 'rxjs';
import { UnidadeMedida } from '../../model/unidade-medida';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UnidadeMedidaService } from '../../service/unidade-medida.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html'
})
export class RecursoComponent {

  // NG SELECT CATEGORIA
  subjectUnidadeMedida: Subject<string> = new Subject<string>();
  unidadeMedidas: UnidadeMedida[] = [];

  recursoFormGroup: FormGroup = new Recurso().criarFormulario(new Recurso());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private recursoService: RecursoService,
              private unidadeMedidaService: UnidadeMedidaService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.recursoService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(recurso => {

        this.recursoFormGroup = new Recurso().criarFormulario(recurso);
      });
    }

    // NG SELECT UNIDADE MEDIDA
    this.subjectUnidadeMedida.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.unidadeMedidaService.consultarSelect(ret);
      }),
    ).subscribe(dados => {
      this.unidadeMedidas = dados;
    });
    this.subjectUnidadeMedida.next('');

  }

  salvar() {

    if (this.recursoFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.recursoService.salvar(this.recursoFormGroup.value).subscribe(c => {

      this.toastrService.success('Recurso salva');
      this.router.navigate(['/recurso']);
    });

  }

  excluir() {

    this.recursoService.excluir(this.recursoFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Recurso excluída');
      this.router.navigate(['/recurso']);
    });
  }

  consultarUnidadeMedidas(term: any) {
    this.subjectUnidadeMedida.next(term.term);
  }

}
