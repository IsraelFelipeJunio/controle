import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Tarefa } from '../../model/tarefa';
import { TarefaService } from '../../service/tarefa.service';


@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html'
})
export class TarefaComponent {

  tarefaFormGroup: FormGroup = new Tarefa().criarFormulario(new Tarefa());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private tarefaService: TarefaService) {


    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.tarefaService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(tarefa => {

        this.tarefaFormGroup = new Tarefa().criarFormulario(tarefa);
      });
    }

  }

  salvar() {

    if (this.tarefaFormGroup.invalid) {
      this.toastrService.error('Favor preencher todos os campos obrigatórios.');
      return;
    }

    this.tarefaService.salvar(this.tarefaFormGroup.value).subscribe(c => {

      this.toastrService.success('Tarefa salva');
      this.router.navigate(['/tarefa']);
    });

  }

  excluir() {

    this.tarefaService.excluir(this.tarefaFormGroup.value.id).subscribe(c => {

      this.toastrService.success('Tarefa excluída');
      this.router.navigate(['/tarefa']);
    });
  }

}
