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
import { ProjetoFaseService } from '../../service/projeto-fase.service';
import { ProjetoFase } from 'src/app/model/projeto-fase';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjetoFaseResponsavel } from '../../model/projeto-fase-responsavel';
import { ProjetoAtaReuniao } from '../../model/projeto-ata-reuniao';
import { ProjetoAtaReuniaoService } from '../../service/projeto-ata-reuniao.service';
import { ProjetoAtaReuniaoParticipante } from '../../model/projeto-ata-reuniao-participante';

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
  
  // PROJETO FASE
  projetoFases: ProjetoFase[] = [];
  projetoFase: ProjetoFase = new ProjetoFase();

  // PROJETO ATA REUNIÃO
  projetoAtaReunioes: ProjetoAtaReuniao[] = [];
  projetoAtaReuniao: ProjetoAtaReuniao = new ProjetoAtaReuniao();

  // NG SELECT PROJETO FASE
  subjectProjetoFase: Subject<string> = new Subject<string>();
  projetoFasesConsulta: ProjetoFase[] = [];

  closeResult: string = '';
  projetoFormGroup: FormGroup = new Projeto().criarFormulario(new Projeto());
  projetoFaseFormGroup: FormGroup = new ProjetoFase().criarFormulario(new ProjetoFase());
  projetoAtaReuniaoFormGroup: FormGroup = new ProjetoAtaReuniao().criarFormulario(new ProjetoAtaReuniao());

  constructor(private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private projetoService: ProjetoService,
              private projetoFaseService: ProjetoFaseService,
              private projetoAtaReuniaoService: ProjetoAtaReuniaoService,
              private categoriaService: CategoriaService,
              private usuarioService: UsuarioService,
              private modalService: NgbModal
  ) {

    if (this.activatedRoute.snapshot.paramMap.get('id') !== 'novo') {

      this.projetoService.consultarPorId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(projeto => {

        this.projetoFormGroup = new Projeto().criarFormulario(projeto);

        if (projeto!.projetoResponsaveis!.length == 0) {
          this.adicionarProjetoResponsavel();
        }

        // Lista Fases
        this.listarFases();

        // Lista Atas de Reunião
        this.listarAtaReunioes();
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

    // NG SELECT PROJETO Fase
    this.subjectProjetoFase.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(ret => {
        return this.projetoFaseService.consultarSelectPorProjeto(ret, this.projetoFormGroup!.get('id')!.value);
      }),
    ).subscribe(dados => {
      this.projetoFasesConsulta = dados;
    });
    this.subjectProjetoFase.next('');
  }

  salvar() {
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

  consultarProjetos(term: any) {
    this.subjectProjeto.next(term.term);
  }

  consultarCategorias(term: any) {
    this.subjectCategoria.next(term.term);
  }

  consultarUsuarios(term: any) {
    this.subjectUsuario.next(term.term);
  }

  consultarProjetoFases(term: any) {
    this.subjectProjetoFase.next(term.term);
  }

  projetoResponsaveisFormArray(): FormArray {
    return this.projetoFormGroup.get('projetoResponsaveis') as FormArray;
  }

  adicionarProjetoResponsavel() {
    (<FormArray>this.projetoFormGroup.controls['projetoResponsaveis']).push(ProjetoResponsavel.criarFormulario(new ProjetoResponsavel()));
  }

  excluirProjetoResponsavel(index: any) {
    (<FormArray>this.projetoFormGroup.controls['projetoResponsaveis']).removeAt(index);
  }

  private getDismissReason(reason: ModalDismissReasons): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

  /* ------------------------------------------------- FASES DO PROJETO -------------------------------------------------- */
  editarFaseProjeto(projetoFase: ProjetoFase, modalFase: string) {
    this.projetoFaseFormGroup = new ProjetoFase().criarFormulario(projetoFase);
    if (projetoFase!.projetoFaseResponsaveis!.length == 0) {
      this.adicionarFaseProjetoResponsavel();
    }
    
    this.modalService.open(modalFase, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  excluirFaseProjeto(index: any, projetoFase: ProjetoFase) {
    this.projetoFases.splice(index);
    this.projetoFaseService.excluir(projetoFase.id).subscribe(() => {
      this.toastrService.success('Fase do projeto excluída!');
    });
  }
  
  adicionarFaseProjeto(modalFase: string) {
    this.projetoFaseFormGroup = new ProjetoFase().criarFormulario(new ProjetoFase());
    this.projetoFaseFormGroup!.get('codigo').setValue(this.projetoFases.length + 1);
    this.adicionarFaseProjetoResponsavel();

    this.modalService.open(modalFase, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  atualizarFaseProjeto(projetoFaseFormGroup) {
    const projetoFase = projetoFaseFormGroup.value;
    if (projetoFase.id == null) {
      projetoFase.projeto = this.projetoFormGroup.value;
    }

    this.projetoFaseService.salvar(projetoFase)
      .subscribe(() => {
        this.listarFases();
        this.modalService.dismissAll();
      });
  }

  listarFases() {
    this.projetoFaseService.consultarPorProjeto(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(dados => {
        this.projetoFases = dados;
        this.projetoFases.sort((a, b) => a.codigo - b.codigo);
      });
  }

  projetoFaseResponsaveisFormArray(): FormArray {
    return this.projetoFaseFormGroup.get('projetoFaseResponsaveis') as FormArray;
  }

  adicionarFaseProjetoResponsavel() {
    (<FormArray>this.projetoFaseFormGroup.controls['projetoFaseResponsaveis']).push(ProjetoFaseResponsavel.criarFormulario(new ProjetoFaseResponsavel()));
  }

  excluirFaseProjetoResponsavel(index: any) {
    (<FormArray>this.projetoFaseFormGroup.controls['projetoFaseResponsaveis']).removeAt(index);
  }
  /* ------------------------------------------------- FASES DO PROJETO -------------------------------------------------- */


  /* --------------------------------------------- ATAS DE REUNIÃO DO PROJETO -------------------------------------------- */
  editarAtaReuniaoProjeto(projetoAtaReuniao: ProjetoAtaReuniao, modalAtaReuniao: string) {
    this.projetoAtaReuniaoFormGroup = new ProjetoAtaReuniao().criarFormulario(projetoAtaReuniao);
    if (projetoAtaReuniao!.projetoAtaReuniaoParticipantes!.length == 0) {
      this.adicionarAtaReuniaoProjetoParticipante();
    }
    
    this.modalService.open(modalAtaReuniao, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  excluirAtaReuniaoProjeto(index: any, projetoAtaReuniao: ProjetoAtaReuniao) {
    this.projetoAtaReunioes.splice(index);
    this.projetoAtaReuniaoService.excluir(projetoAtaReuniao.id).subscribe(() => {
      this.toastrService.success('Ata de reunião excluída!');
    });
  }
  
  adicionarAtaReuniaoProjeto(modalAtaReuniao: string) {
    this.projetoAtaReuniaoFormGroup = new ProjetoAtaReuniao().criarFormulario(new ProjetoAtaReuniao());
    this.projetoAtaReuniaoFormGroup!.get('codigo').setValue(this.projetoAtaReunioes.length + 1);
    this.adicionarAtaReuniaoProjetoParticipante();

    this.modalService.open(modalAtaReuniao, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
  }

  atualizarAtaReuniaoProjeto(projetoAtaReuniaoFormGroup) {
    const projetoAtaReuniao = projetoAtaReuniaoFormGroup.value;
    if (projetoAtaReuniao.id == null) {
      projetoAtaReuniao.projeto = this.projetoFormGroup.value;
    }

    this.projetoAtaReuniaoService.salvar(projetoAtaReuniao)
      .subscribe(() => {
        this.listarAtaReunioes();
        this.modalService.dismissAll();
      });
  }
  
  listarAtaReunioes() {
    this.projetoAtaReuniaoService.consultarPorProjeto(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(dados => {
        this.projetoAtaReunioes = dados;
        this.projetoAtaReunioes.sort((a, b) => a.codigo - b.codigo);
      });
  }

  projetoAtaReuniaoParticipantesFormArray(): FormArray {
    return this.projetoAtaReuniaoFormGroup.get('projetoAtaReuniaoParticipantes') as FormArray;
  }

  adicionarAtaReuniaoProjetoParticipante() {
    (<FormArray>this.projetoAtaReuniaoFormGroup.controls['projetoAtaReuniaoParticipantes']).push(ProjetoAtaReuniaoParticipante.criarFormulario(new ProjetoAtaReuniaoParticipante()));
  }

  excluirAtaReuniaoProjetoParticipante(index: any) {
    (<FormArray>this.projetoAtaReuniaoFormGroup.controls['projetoAtaReuniaoParticipantes']).removeAt(index);
  }
  /* --------------------------------------------- ATAS DE REUNIÃO DO PROJETO -------------------------------------------- */

}
